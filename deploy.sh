#!/bin/bash
# ─────────────────────────────────────────────────────────────
# ECADEL GROUP — VPS Deploy Script
# Usage: ./deploy.sh
# Run this on the VPS after any git push to rebuild and restart
# ─────────────────────────────────────────────────────────────
set -e

PROJECT_DIR="/var/www/ecadelgroup"
PROCESS_NAME="ecadelgroup"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ECADEL GROUP — Deploying latest from GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd "$PROJECT_DIR"

echo "› Pulling latest from main..."
git pull origin main

echo "› Installing dependencies..."
npm install --production=false

echo "› Building Next.js app..."
npm run build

echo "› Restarting PM2 process..."
pm2 restart "$PROCESS_NAME" || pm2 start npm --name "$PROCESS_NAME" -- start -- --port 3000

echo ""
echo "✓ Deployment complete — ecadelgroup.com is live"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
