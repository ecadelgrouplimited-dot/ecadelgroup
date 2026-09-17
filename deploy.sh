#!/bin/bash
# ─────────────────────────────────────────────────────────────
# ECADEL GROUP — VPS deploy script
#
# Run ON THE VPS as root, after pushing to GitHub:
#     ssh root@72.62.185.212
#     cd /var/www/ecadelgroup && ./deploy.sh
#
# ── Why this does not use pm2 ────────────────────────────────
# The site is supervised by systemd: /etc/systemd/system/ecadelgroup.service
# ("ECADEL Group website (Next.js)"), which runs
#     npm start -- -H 127.0.0.1 -p 3000
# as the unprivileged user `ecadel`, behind nginx.
#
# pm2 is NOT installed on this server. An older version of this script called
# `pm2 restart ecadelgroup` and, on failure, `pm2 start npm ... --port 3000` —
# which would have failed to find pm2, and if pm2 *were* present would have
# started a SECOND server on port 3000 and collided with the systemd service
# and with the 13 other projects sharing this VPS.
#
# ── Why everything runs as `ecadel` ──────────────────────────
# /var/www/ecadelgroup is owned by ecadel. The service runs with
# ProtectSystem=strict and ReadWritePaths=/var/www/ecadelgroup, so if root
# ran the build it would leave root-owned files in .next/ that the service
# could not write to — and the app would fail on the next request.
# ─────────────────────────────────────────────────────────────
set -euo pipefail

PROJECT_DIR="/var/www/ecadelgroup"
SERVICE="ecadelgroup"
APP_USER="ecadel"
PORT=3000
STAMP="$(date -u +%Y%m%d-%H%M%S)"
BACKUP="/root/ecadelgroup-deploy-$STAMP.tgz"

say()  { printf '\n\033[1;33m› %s\033[0m\n' "$*"; }
ok()   { printf '  \033[1;32m✓\033[0m %s\n' "$*"; }
die()  { printf '\n\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "Run this as root (it manages the systemd service)."
[ -d "$PROJECT_DIR/.git" ] || die "$PROJECT_DIR is not a git checkout."

cd "$PROJECT_DIR"

# Run a command as the service user, in the project directory, with HOME set to
# the project — that is where the existing npm cache lives
# (/var/www/ecadelgroup/.npm). Using `runuser` without -l keeps the shell out of
# it, which matters because ecadel's login shell is /usr/sbin/nologin.
as_app() { runuser -u "$APP_USER" -- env HOME="$PROJECT_DIR" "$@"; }

printf '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
printf '  ECADEL GROUP — deploy %s\n' "$STAMP"
printf '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'

# ── 0. Record where we are, so a failure can be rolled back ──────────────────
PREV_COMMIT="$(git rev-parse HEAD)"
say "Current commit: $PREV_COMMIT"

# ── 1. Back up the working tree ─────────────────────────────────────────────
# Excludes node_modules and build output — this is source plus any local edits,
# which is what you would need to reconstruct the previous state.
say "Backing up working tree to $BACKUP"
tar czf "$BACKUP" \
  --exclude='./node_modules' \
  --exclude='./.next' \
  --exclude='./.next.pre-update-*' \
  --exclude='./.npm' \
  . 2>/dev/null || true
ok "backup written ($(du -h "$BACKUP" | cut -f1))"

# ── 2. Discard local modifications to tracked files ─────────────────────────
# On this server the only tracked files that get modified in place are
# auto-generated (next-env.d.ts, package-lock.json) or were overwritten by a
# defacement (public/favicon.ico, public/robots.txt, public/site.webmanifest).
# Git is the source of truth, so reset them.
say "Resetting tracked files to committed state"
# As ecadel: a root-run checkout rewrites public/* and .git/index root-owned,
# which the service user then cannot modify and the next git pull would fail.
as_app git checkout -- . 2>/dev/null || true
ok "tracked files clean"

# ── 3. Purge defacement / junk artefacts ────────────────────────────────────
# Aug 2026: an intruder overwrote the static files in public/ with a calling
# card and scattered pwned.txt markers into every directory that looked like a
# web root. These are not part of the app; remove them so they cannot be served.
say "Purging defacement artefacts and stray build junk"
find "$PROJECT_DIR" -name 'pwned.txt' -not -path '*/node_modules/*' -delete 2>/dev/null || true
rm -rf "$PROJECT_DIR/apps" \
       "$PROJECT_DIR/dist" \
       "$PROJECT_DIR/out" \
       "$PROJECT_DIR/app/public" \
       "$PROJECT_DIR/favicon.ico" \
       "$PROJECT_DIR/fevicon.ico" 2>/dev/null || true
rm -f "$PROJECT_DIR"/public/*.bak "$PROJECT_DIR"/*.bak 2>/dev/null || true
# The rm/find above ran as root; make sure nothing touched stays root-owned.
chown -R "$APP_USER:$APP_USER" "$PROJECT_DIR/.git" "$PROJECT_DIR/public" \
  "$PROJECT_DIR"/package.json "$PROJECT_DIR"/package-lock.json \
  "$PROJECT_DIR"/next-env.d.ts 2>/dev/null || true
ok "markers and junk removed (ownership restored to $APP_USER)"

# ── 4. Pull ─────────────────────────────────────────────────────────────────
say "Pulling origin/main as $APP_USER"
as_app git pull --ff-only origin main
NEW_COMMIT="$(git rev-parse HEAD)"
ok "now at $NEW_COMMIT"

# ── 5. Install + build as the service user ──────────────────────────────────
say "Installing dependencies (as $APP_USER)"
as_app npm install --no-audit --no-fund

say "Building (as $APP_USER)"
# Build IN PLACE. `next start` reads from .next on every request, so moving it
# aside for the length of the build would return 500s for the whole compile
# (~3 minutes on this VPS). Take a copy as a restore point instead — a copy
# costs a second on SSD and keeps the live site serving throughout.
if [ -d "$PROJECT_DIR/.next" ]; then
  as_app cp -a "$PROJECT_DIR/.next" "$PROJECT_DIR/.next.bak-$STAMP"
fi
if ! as_app npm run build; then
  printf '\n\033[1;31mBuild failed.\033[0m Restoring the previous build and restarting it.\n' >&2
  rm -rf "$PROJECT_DIR/.next"
  if [ -d "$PROJECT_DIR/.next.bak-$STAMP" ]; then
    mv "$PROJECT_DIR/.next.bak-$STAMP" "$PROJECT_DIR/.next"
    chown -R "$APP_USER:$APP_USER" "$PROJECT_DIR/.next" 2>/dev/null || true
  fi
  systemctl restart "$SERVICE" || true
  printf 'Roll back the code with:\n  git -C %s reset --hard %s\n\n' "$PROJECT_DIR" "$PREV_COMMIT" >&2
  exit 1
fi
rm -rf "$PROJECT_DIR/.next.bak-$STAMP"
ok "build complete"

# ── 6. Restart the service ──────────────────────────────────────────────────
say "Restarting $SERVICE.service"
systemctl restart "$SERVICE"
for i in $(seq 1 30); do
  systemctl is-active --quiet "$SERVICE" && break
  sleep 1
done
systemctl is-active --quiet "$SERVICE" && ok "service is active" \
  || { journalctl -u "$SERVICE" -n 30 --no-pager; die "$SERVICE failed to start"; }

# ── 7. Health check ─────────────────────────────────────────────────────────
say "Health check on 127.0.0.1:$PORT"
# `next start` takes several seconds to bind. Poll rather than guessing a sleep,
# or a perfectly healthy deploy reports a false failure.
CODE=000
ELAPSED=0
for i in $(seq 1 30); do
  CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/" 2>/dev/null || echo 000)"
  ELAPSED=$i
  [ "$CODE" = "200" ] && break
  sleep 1
done
if [ "$CODE" = "200" ]; then
  ok "app responds 200 (after ${ELAPSED}s)"
else
  journalctl -u "$SERVICE" -n 30 --no-pager
  die "app did not come up: last status $CODE"
fi

# The defacement replaced these with a calling card; assert they are real again.
# Pipe straight into grep rather than through a shell variable: favicon.ico is
# binary and bash warns about the null bytes it cannot store.
for path in /favicon.ico /robots.txt /site.webmanifest; do
  if curl -s "http://127.0.0.1:$PORT$path" | grep -qiE 'Hacked By|AnsBix8|deimm1'; then
    die "$path is still defaced"
  fi
done
ok "static files clean (no defacement strings)"

printf '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
printf '  ✓ Deployed %s\n' "${NEW_COMMIT:0:7}"
printf '  Backup of previous state: %s\n' "$BACKUP"
printf '  Roll back with: git reset --hard %s && npm run build && systemctl restart %s\n' "${PREV_COMMIT:0:7}" "$SERVICE"
printf '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
