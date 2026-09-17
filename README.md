# ECADEL GROUP LIMITED — Website

**Live at:** [ecadelgroup.com](https://ecadelgroup.com)  
**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion  
**Hosting:** Hostinger VPS — Ubuntu 24.04 LTS  
**Repository:** `github.com/ecadelgrouplimited-dot/ecadelgroup`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Local Development](#3-local-development)
4. [Project Structure](#4-project-structure)
5. [Page Sections — What Each File Controls](#5-page-sections--what-each-file-controls)
6. [Making Content Changes](#6-making-content-changes)
7. [Adding a New Section](#7-adding-a-new-section)
8. [Contact Form & Email](#8-contact-form--email)
9. [Deployment — GitHub to VPS](#9-deployment--github-to-vps)
10. [Environment Variables](#10-environment-variables)
11. [SEO — How It Works](#11-seo--how-it-works)
12. [SSH Key Management](#12-ssh-key-management)
13. [VPS Server Reference](#13-vps-server-reference)
14. [Troubleshooting](#14-troubleshooting)
15. [Platforms & Client Projects](#15-platforms--client-projects)
16. [Quality Invariants (audited, not assumed)](#16-quality-invariants-audited-not-assumed)

---

## 1. Project Overview

This is the official corporate website for **ECADEL GROUP LIMITED** — a digital infrastructure and systems conglomerate headquartered in Kampala, Uganda.

The site showcases:
- The six group platforms (SBB, PAME AI, SafeRoad UG, Hapa, PROSEQ, Akili Code OS)
- Client-facing services (software dev, mobile/web, hosting, consultancy, AI integration)
- Delivered client projects (FLEETS.HQ, Reberon Investments, 256 Logistics, Einstein Rising Canada, Bunyonyi Resort, Simon Sharp, Ambrosoli)
- ECADEL LABS — the research and innovation engine
- Client testimonials
- Leadership team
- Contact form with real email sending via Hostinger SMTP

The company profile document lives at `docs/ecadel_group_profile.html` — a standalone, print-ready HTML file used for investor and partner presentations.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Email | Nodemailer (Hostinger SMTP) |
| Fonts | Inter (body) · Space Grotesk (display) · Instrument Serif (pull-quotes) |
| Runtime | Node.js 20 LTS |
| Process Manager | PM2 |
| Web Server | Nginx (reverse proxy) |
| SSL | Let's Encrypt (auto-renews) |
| Hosting | Hostinger VPS — Ubuntu 24.04 LTS |

---

## 3. Local Development

### Prerequisites
- Node.js 18+ (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- npm

### Setup

```bash
# 1. Clone the repo
git clone git@github-ecadel:ecadelgrouplimited-dot/ecadelgroup.git
cd ecadelgroup

# 2. Install dependencies
npm install

# 3. Create local environment file
cp .env.example .env.local
# Edit .env.local and add real SMTP credentials

# 4. Start development server
npm run dev
```

The site runs at **http://localhost:3000**

### Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |
| `npm run audit` | Responsive audit — no horizontal overflow, nav fits, form fields labelled (needs `npm run start` running, and Chrome) |
| `npm run audit:scroll` | Scroll audit — asserts vertical scrolling works, horizontal scrolling is impossible, and fixed/scroll-driven behaviour survives the viewport clip |
| `npm run audit:reduced-motion` | Accessibility audit — asserts reduced motion is honoured, the intro is skipped and the native cursor returns |

There is no unit-test suite; `npm run lint` is the automated gate, and the three `npm run
audit*` scripts are how layout, scroll and accessibility regressions get caught (see §16).
Always restart the server after a build before auditing — a running `next start` keeps its
old chunk manifest, the stylesheet 404s, and an unstyled page audits clean.

---

## 4. Project Structure

```
ecadel group/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API — sends emails
│   ├── legal/
│   │   └── page.tsx            # Privacy, Terms, Cookies, DPA
│   ├── globals.css             # Global styles + Tailwind base
│   ├── layout.tsx              # Root layout: metadata, SEO, schema.org
│   ├── not-found.tsx           # 404 page
│   ├── page.tsx                # Homepage — assembles all sections
│   └── sitemap.ts              # Auto-generated sitemap.xml
│
├── components/
│   ├── sections/               # One file per page section
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeStrip.tsx
│   │   ├── CompanyOverview.tsx
│   │   ├── StatsSection.tsx
│   │   ├── StrategicFocus.tsx
│   │   ├── Services.tsx        # Client services offering
│   │   ├── FlagshipProjects.tsx# 6 group platforms
│   │   ├── AkiliOSFeature.tsx  # Akili Code OS — featured product + models
│   │   ├── EcadelLabs.tsx      # ECADEL LABS — The Engine
│   │   ├── ClientProjects.tsx  # Delivered client work
│   │   ├── Testimonials.tsx    # Client testimonials carousel
│   │   ├── WhyAfrica.tsx
│   │   ├── Leadership.tsx
│   │   ├── TechSystems.tsx
│   │   ├── Partnerships.tsx
│   │   ├── FutureVision.tsx
│   │   ├── Contact.tsx         # Contact form
│   │   └── Footer.tsx
│   ├── CookieBanner.tsx
│   ├── CustomCursor.tsx
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx              # Navigation + mobile menu
│   ├── UIExtras.tsx            # Scroll progress + scroll-to-top
│   └── ui/
│       └── cn.ts               # Tailwind class merge utility
│
├── docs/
│   └── ecadel_group_profile.html  # Standalone company profile (v1.2)
│
├── public/
│   ├── assets/
│   │   └── ecadel_logos_icons/ # All logo variants (dark/light/transparent)
│   ├── og-image.png            # Social share image (1200×630)
│   ├── robots.txt
│   └── site.webmanifest
│
├── .env.example                # Template for environment variables
├── .gitignore
├── deploy.sh                   # One-command VPS deployment script
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Page Sections — What Each File Controls

The page is assembled in `app/page.tsx`. Each section is a separate component:

| Section | File | What to edit |
|---------|------|-------------|
| Hero (landing) | `HeroSection.tsx` | Headline, subheadline, animated background |
| Marquee ticker | `MarqueeStrip.tsx` | The scrolling text items |
| Who We Are | `CompanyOverview.tsx` | Mission, vision, philosophy pillars |
| Stats bar | `StatsSection.tsx` | The 5 stat numbers and descriptions |
| Strategic Focus | `StrategicFocus.tsx` | The 8 focus domain cards |
| Services | `Services.tsx` | 5 client service cards + CTA |
| Platforms (SBB/PAME etc.) | `FlagshipProjects.tsx` | All 6 platform writeups + mockups |
| **Akili Code OS (featured)** | `AkiliOSFeature.tsx` | The Akili OS pitch, why-try reasons, terminal mock, the two models (Fundi/Core), and link-outs to akilios.dev. Anchor `#akili-os` |
| ECADEL LABS | `EcadelLabs.tsx` | Labs description, pillars, orbital visual |
| Client Projects | `ClientProjects.tsx` | 7 client projects, sector filter tabs, FLEETS.HQ flagship card |
| Testimonials | `Testimonials.tsx` | 5 attributed client testimonials (sign-off required to add) |
| Why Africa | `WhyAfrica.tsx` | Africa thesis section |
| Leadership | `Leadership.tsx` | Leadership profiles |
| Tech Systems | `TechSystems.tsx` | Technical architecture breakdown |
| Partnerships | `Partnerships.tsx` | Partner categories |
| Future Vision | `FutureVision.tsx` | Roadmap and long-term vision |
| Contact | `Contact.tsx` | Form + email list |
| Footer | `Footer.tsx` | Links, social, copyright |
| Navigation | `Navbar.tsx` | Top nav links |

---

## 6. Making Content Changes

### Update a platform's status (e.g., SafeRoad goes live)
**File:** `components/sections/FlagshipProjects.tsx`

Find the platform section and change:
```tsx
<PlatformBadge label="03 / 06 — SAFEROAD UG™ · Awaiting Regulatory Approval" />
```
to:
```tsx
<PlatformBadge label="03 / 06 — SAFEROAD UG™ · LIVE AT SAFEROAD.UG" />
```
Also update the CTA link from `#contact` to the live URL.

### Add a platform to the portfolio
The portfolio band (`FlagshipProjects.tsx`, `#platforms`) is the source of truth for the
group's platform list. Adding one means touching every place the count is stated, so the
numbers never disagree:

| Where | What to change |
|-------|----------------|
| `components/sections/FlagshipProjects.tsx` | New `<PlatformBadge label="NN / TT — …" />` block + mockup; renumber all `NN / TT` badges and the `Six Platforms.` heading |
| `components/sections/HeroSection.tsx` | `"Six platforms. One mission."` + the `Platforms` stat value |
| `components/sections/StatsSection.tsx` | `Group Platforms` value (a `count-up` number) and its `description` list |
| `components/sections/CompanyOverview.tsx` | The `Our portfolio spans six platforms:` sentence |
| `components/sections/FutureVision.tsx` | The `2026 — Foundation` milestone text, the orbital `PLATFORM_NODES` array, and the section paragraph |
| `components/sections/EcadelLabs.tsx` | The `ORBITAL_NODES` array (evenly spaced angles) and the `Platforms Powered` stat |
| `components/sections/Footer.tsx` | The `Platforms` link list |
| `components/sections/MarqueeStrip.tsx` | Add the name to `rowOne` |
| `app/layout.tsx` | `description`, `keywords`, OpenGraph `description`, and the JSON-LD `sameAs` / `SoftwareApplication` entries |

Platforms are numbered in brand order: `01` Smart Business Book, `02` PAME AI,
`03` SafeRoad UG, `04` Hapa, `05` PROSEQ, `06` Akili Code OS.

### Akili Code OS claims come from its own docs
**File:** `components/sections/AkiliOSFeature.tsx` (anchor `#akili-os`)

Every factual claim in the featured section — the two model names and what each is for,
the 1,000,000-token context, the install command and the CLI flags — is taken from the
product's own documentation. If something changes upstream, change it here to match:

| Claim | Source |
|-------|--------|
| Fundi vs Core, when to use each, 1M context, mid-conversation switching | <https://akilios.dev/docs/models> |
| Install command, `inspect` / `ask` / `edit --apply --verify --revert-on-fail` | <https://akilios.dev/docs/getting-started> |
| Budgets, policy, checkpoints, audit log | <https://akilios.dev/docs/trust> |

**Pricing is deliberately not mirrored here.** Plans, daily allowances and billing live on
[akilios.dev](https://akilios.dev) where they are always current; this page keeps to what
Akili Code OS does and why it matters, and links out for the commercial detail. If you ever
add a price to this section, you have created a second source of truth — don't.

### Add a new client testimonial
**File:** `components/sections/Testimonials.tsx`

Add a new object to the `testimonials` array:
```typescript
{
  quote: "Your testimonial text here...",
  name: "Client Name",
  title: "Their Title",
  org: "Their Organisation",
  project: "Project Type · website.com",
  initials: "CN",
},
```

### Add a new client project
**File:** `components/sections/ClientProjects.tsx`

Add an object to the `projects` array. There is no index number to maintain — the
summary strip and the filter-tab counts are derived from the array itself.

```typescript
{
  id: "unique-slug",              // React key; must be unique
  status: "live",                 // "live" | "upcoming"
  featured: false,                // only one project should be featured
  sector: "Corporate Web",        // "Platforms & Systems" | "Corporate Web" | "E-Commerce"
  icon: Building2,                // any lucide-react icon, imported at the top
  accent: STEEL,                  // alternate STEEL / GOLD_LIGHT; GOLD is reserved for the flagship
  name: "Client Name",
  client: "Contact · Role",
  type: "What was built",
  region: "United Kingdom",       // feeds the "Countries" figure in the summary strip
  description: "…",
  metrics: [{ value: "40+", label: "Fleet Vehicles" }],  // 1–4 items, rendered as a stat strip
  url: "example.com",
  href: "https://example.com",
  tags: ["Corporate Web", "Logistics"],
}
```

Keep the palette disciplined: gold `#C8A96E` marks the flagship only, everything
else alternates light gold `#D4B97E` and steel `#8BA7C7`. Adding a fourth colour
is what makes the grid look scattered.

Also update, in the same change:
- `StatsSection.tsx` → the **Client Projects Delivered** figure
- `HeroSection.tsx` → the **Client Builds** figure in the hero stat bar
- `Footer.tsx` → the `clientWork` array (outbound links)
- `app/layout.tsx` → the `ItemList` in `schemaOrg`, plus brand keywords
- `README.md` → the Delivered Client Projects table below

### Update stats
**File:** `components/sections/StatsSection.tsx`

Each stat has a `value` (number), `suffix` (string like `+` or `%`), `label`, and `description`.

### Update the company profile document
**File:** `docs/ecadel_group_profile.html`

This is a standalone HTML file — open it directly in a browser to preview. The version number is in the footer (`Company Profile v1.2`). Update it when making significant changes.

---

## 7. Adding a New Section

1. **Create the component:**
```bash
# Create the file
touch components/sections/NewSection.tsx
```

2. **Write the component** following the pattern of existing sections:
```tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function NewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="new-section" ref={ref} className="relative py-32 bg-graphite">
      {/* your content */}
    </section>
  );
}
```

3. **Import and add it to `app/page.tsx`:**
```tsx
import NewSection from "@/components/sections/NewSection";
// Add <NewSection /> in the correct position inside <main>
```

4. **Add a nav link in `components/Navbar.tsx`** if it needs one:
```typescript
{ label: "New", href: "#new-section" },
```

5. **Update the sitemap** in `app/sitemap.ts` if it's a significant section.

---

## 8. Contact Form & Email

### How it works
1. User submits the form at `ecadelgroup.com/#contact`
2. The form POSTs to `/api/contact` (server-side Next.js route)
3. Two emails are sent simultaneously via Hostinger SMTP:
   - **Auto-reply** to the person who submitted — branded HTML email
   - **Notification** to `ecadel@ecadelgroup.com` — with full form data and reply-to set to the sender

### Routing by inquiry type
Currently all inquiry types route to `ecadel@ecadelgroup.com`. To route specific types to different addresses, update the `ROUTING` map in `app/api/contact/route.ts`:
```typescript
const ROUTING: Record<string, string> = {
  services:    "ecadel@ecadelgroup.com",
  partnership: "partnerships@ecadelgroup.com", // change when that mailbox is ready
  investment:  "invest@ecadelgroup.com",
  // ...
};
```

### SMTP credentials
Stored **only** on the VPS in `/var/www/ecadelgroup/.env.local` (never committed to git):
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=ecadel@ecadelgroup.com
SMTP_PASS=your_password
```

To update the password on the VPS:
```bash
ssh root@72.62.185.212
nano /var/www/ecadelgroup/.env.local
# Edit, save, then:
systemctl restart ecadelgroup
```

---

## 9. Deployment — GitHub to VPS

### Standard deployment (after any code change)

```bash
# 1. On your local machine — make changes, then:
git add .
git commit -m "Your change description"
git push

# 2. SSH into the VPS
ssh root@72.62.185.212

# 3. Run the deploy script
cd /var/www/ecadelgroup && ./deploy.sh
```

The `deploy.sh` script does this automatically:
```
backup → reset tracked files → purge junk → git pull → npm install → npm run build → systemctl restart ecadelgroup
```

> **Correction — this repo previously documented pm2, and it was wrong.**
> The site is supervised by **systemd**, not pm2:
> `/etc/systemd/system/ecadelgroup.service` runs
> `npm start -- -H 127.0.0.1 -p 3000` as the unprivileged user **`ecadel`**,
> behind nginx. pm2 is not installed on the VPS.
>
> Two things to know before deploying by hand:
>
> 1. **Never start a second server on port 3000.** This VPS runs 13 other
>    projects (3001, 3005, 3300, 4500, 8000, 8787/8788, …). A stray
>    `pm2 start … --port 3000` or a manual `next start` collides with the live
>    site, and nginx may end up proxying to the wrong process.
> 2. **Run the build as `ecadel`, not root.** The unit sets
>    `ProtectSystem=strict` with `ReadWritePaths=/var/www/ecadelgroup`, so a
>    root-owned `.next/` cannot be written by the service and the site breaks on
>    the next request. `deploy.sh` uses `runuser -u ecadel` for this reason.
>
> The script also takes a backup before touching anything, restores tracked
> files to their committed state, and purges defacement artefacts (see §16).

> **Expect `package-lock.json` to show as modified on the server.** The local
> toolchain is newer (node 24 / npm 11) than the VPS (node 22 / npm 10.9.8), and
> npm 11 records `libc` fields on optional platform-specific packages that npm 10
> strips again on install. It is metadata only — the resolved versions are the
> same and the build is unaffected.
>
> Do **not** "fix" this by committing the server's version, and do not upgrade
> node/npm on the VPS to match: thirteen other projects build on that box.
> `deploy.sh` resets the file before every pull, so it self-heals; if you want a
> clean tree by hand, `git checkout -- package-lock.json`.

Day-to-day commands:

```bash
systemctl status ecadelgroup       # is it up?
systemctl restart ecadelgroup      # restart (after a manual build)
journalctl -u ecadelgroup -n 50    # why did it fail?
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/   # local health check

# Never on this server:
#   pm2 restart ecadelgroup        ← pm2 is not installed here
#   next start -p 3000             ← collides with the running service
```

### First-time deploy on a fresh VPS
If you ever need to set up a new VPS from scratch:

```bash
# On VPS as root:
apt-get update -y
apt-get install -y git curl nginx certbot python3-certbot-nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# There is no process manager to install: each project runs as a systemd
# unit (see /etc/systemd/system/ecadelgroup.service on the existing server).

# Create project directory and clone
mkdir -p /var/www/ecadelgroup
cd /var/www/ecadelgroup
git clone git@github.com:ecadelgrouplimited-dot/ecadelgroup.git .

# Create credentials file (not in git)
nano .env.local
# Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

# Build
npm install
npm run build

# Start under systemd, not pm2. The unit must use User=ecadel on
# 127.0.0.1:3000 with ProtectSystem=strict and
# ReadWritePaths=/var/www/ecadelgroup — otherwise the app cannot write its own
# .next/ cache and fails on the first request. Copy the unit from the existing
# server: /etc/systemd/system/ecadelgroup.service
systemctl daemon-reload
systemctl enable --now ecadelgroup

# Configure Nginx (copy from existing /etc/nginx/sites-available/ecadelgroup.com)
# Then enable SSL:
certbot --nginx -d ecadelgroup.com -d www.ecadelgroup.com --non-interactive --agree-tos -m ecadel@ecadelgroup.com --redirect
```

---

## 10. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | Yes | `smtp.hostinger.com` |
| `SMTP_PORT` | Yes | `465` |
| `SMTP_USER` | Yes | `ecadel@ecadelgroup.com` |
| `SMTP_PASS` | Yes | Hostinger email password |

**Local development:** Copy `.env.example` to `.env.local` and fill in real values.  
**VPS production:** File lives at `/var/www/ecadelgroup/.env.local` with `chmod 600` permissions.  
**GitHub:** `.env.local` is in `.gitignore` and must never be committed.

---

## 11. SEO — How It Works

### What's in place
- **`app/layout.tsx`** — Title, description, keywords, Open Graph, Twitter card, canonical URL, `metadataBase`, `robots` directives
- **Schema.org JSON-LD** — Organisation, WebSite, SoftwareApplication (SBB & PAME AI), Services — injected in `<head>`
- **`app/sitemap.ts`** — Generates `/sitemap.xml` automatically at build time
- **`public/robots.txt`** — Allows all crawlers, blocks `/api/` and `/_next/`, points to sitemap

### To update SEO after content changes
1. Update `LAST_UPDATED` in `app/sitemap.ts` to today's date
2. Update keywords/description in `app/layout.tsx` if new content warrants it
3. Add new schema.org entries for new platforms or services

### Submit to search engines
After deploying changes:
- **Google Search Console:** [search.google.com/search-console](https://search.google.com/search-console) → Submit `https://ecadelgroup.com/sitemap.xml`
- **Bing Webmaster Tools:** [bing.com/webmasters](https://www.bing.com/webmasters)

### Check sitemap is working
```
https://ecadelgroup.com/sitemap.xml
https://ecadelgroup.com/robots.txt
```

---

## 12. SSH Key Management

### Dev machine → GitHub
- **Key file:** `~/.ssh/ecadelgroup_github`
- **SSH alias:** `github-ecadel` (configured in `~/.ssh/config`)
- **Remote URL:** `git@github-ecadel:ecadelgrouplimited-dot/ecadelgroup.git`
- **GitHub account:** `ecadelgrouplimited-dot`

To push:
```bash
git push  # Uses github-ecadel alias automatically
```

### VPS → GitHub (deploy key)
- **Key file on VPS:** `/root/.ssh/ecadelgroup_deploy`
- **Type:** Read-only deploy key on the GitHub repository
- **Purpose:** Allows the VPS to `git pull` from GitHub

### If you need to re-add SSH keys to GitHub
```bash
# Dev machine public key:
cat ~/.ssh/ecadelgroup_github.pub

# VPS deploy key:
ssh root@72.62.185.212 "cat /root/.ssh/ecadelgroup_deploy.pub"
```
Add them at: `github.com → Settings → SSH and GPG Keys`  
Add deploy key at: `github.com/ecadelgrouplimited-dot/ecadelgroup → Settings → Deploy Keys`

---

## 13. VPS Server Reference

| Item | Value |
|------|-------|
| IP | `72.62.185.212` |
| OS | Ubuntu 24.04 LTS |
| SSH user | `root` |
| Project path | `/var/www/ecadelgroup/` |
| PM2 process name | `ecadelgroup` |
| Port | `3000` (proxied by Nginx) |
| Nginx config | `/etc/nginx/sites-available/ecadelgroup.com` |
| SSL cert | `/etc/letsencrypt/live/ecadelgroup.com/` |
| SSL auto-renewal | Handled by certbot systemd timer |
| Environment file | `/var/www/ecadelgroup/.env.local` (chmod 600) |

### Useful VPS commands

```bash
# SSH in
ssh root@72.62.185.212

# Is the app running?
systemctl status ecadelgroup

# Live logs (Ctrl+C to stop)
journalctl -u ecadelgroup -f

# Restart the app
systemctl restart ecadelgroup

# Deploy latest from GitHub
cd /var/www/ecadelgroup && ./deploy.sh

# Check Nginx config
nginx -t

# Reload Nginx (after config changes)
systemctl reload nginx

# Check SSL certificate expiry
certbot certificates

# Manually renew SSL (auto-renews, but if needed)
certbot renew

# Check disk space
df -h

# Check memory
free -h
```

### Adding a second project to this VPS

For each new project (e.g., `example.com`):

1. **Clone the repo** into `/var/www/example/`
2. **Build, then start it as a systemd unit** on a different port (e.g., 3001).
   This is how the existing projects are run. Do NOT use `pm2 start … --port 3001`
   or a bare `next start` in a shell — pm2 is not installed here, and a stray
   process on a port that is already taken (3000!) will collide with a live site.

   ```ini
   # /etc/systemd/system/example.service
   [Unit]
   Description=example.com website
   After=network.target

   [Service]
   Type=simple
   User=example
   Group=example
   WorkingDirectory=/var/www/example
   Environment=NODE_ENV=production
   Environment=PORT=3001
   Environment=HOSTNAME=127.0.0.1
   ExecStart=/usr/bin/npm start -- -H 127.0.0.1 -p 3001
   Restart=always
   RestartSec=5
   # Confine the service to its own directory
   NoNewPrivileges=true
   PrivateTmp=true
   ProtectSystem=strict
   ProtectHome=true
   ReadWritePaths=/var/www/example
   RestrictSUIDSGID=true
   LockPersonality=true

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   systemctl daemon-reload
   systemctl enable --now example
   systemctl status example
   ```

   **Check the port is actually free first — this VPS already uses 3000, 3001,
   3005, 3210, 3300, 4500, 8000, 8787 and 8788:**
   ```bash
   ss -tlnp | grep -E ':(3000|3001|3005|3210|3300|4500|8000|8787|8788) '
   ```
3. **Create Nginx config** at `/etc/nginx/sites-available/example.com` — same pattern as `ecadelgroup.com` but with `proxy_pass http://localhost:3001`
4. **Enable and reload:**
   ```bash
   ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   ```
5. **Get SSL:**
   ```bash
   certbot --nginx -d example.com -d www.example.com --non-interactive --agree-tos -m ecadel@ecadelgroup.com --redirect
   ```

Port allocation guide:
- `3000` → ecadelgroup.com (current)
- `3001` → next project
- `3002` → project after that
- etc.

---

## 14. Troubleshooting

### Site is down / the service crashed
```bash
ssh root@72.62.185.212
systemctl status ecadelgroup        # Is it running, and why did it stop?
journalctl -u ecadelgroup -n 50     # Read the error output
systemctl restart ecadelgroup       # Restart it
```

### Build fails on VPS
```bash
cd /var/www/ecadelgroup
npm run build                 # Run manually to see full error output
```
Most common causes:
- TypeScript error in new code → fix locally, push, redeploy
- Missing environment variable → check `.env.local`
- `git pull` blocked by local changes → run `git checkout -- package-lock.json` first

### Contact form not sending emails
```bash
ssh root@72.62.185.212
cat /var/www/ecadelgroup/.env.local        # Verify credentials are there
journalctl -u ecadelgroup -n 50            # Look for SMTP errors
```
Common causes:
- Wrong password in `.env.local`
- Hostinger SMTP port blocked → try port 587 instead of 465
- Email account suspended

### SSL certificate expired
```bash
ssh root@72.62.185.212
certbot renew                 # Manual renewal
systemctl reload nginx
```
Certbot auto-renews, but this runs manually if needed.

### `git push` fails with "Permission denied"
The SSH key might need to be re-added to GitHub:
```bash
cat ~/.ssh/ecadelgroup_github.pub   # Copy this
# Add to github.com → Settings → SSH Keys
```

### Nginx showing 502 Bad Gateway
Nginx is up but the app behind it is not. Check and restart the service:
```bash
ssh root@72.62.185.212
systemctl status ecadelgroup
systemctl restart ecadelgroup
journalctl -u ecadelgroup -n 50
```

Also confirm exactly one process is bound to the port nginx proxies to —
a stray second server on 3000 is the other way this happens:
```bash
ss -tlnp | grep ':3000 '
```

---

## 15. Platforms & Client Projects

### Group Platforms

| Platform | Status | URL |
|----------|--------|-----|
| Smart Business Book (SBB) | Live | [sbb.finance](https://sbb.finance) |
| PAME AI | Live | [pame.cc](https://pame.cc) |
| SafeRoad UG | Awaiting regulatory approval | — |
| Hapa | Pre-launch (Kampala) | — |
| PROSEQ | Playbook stage | — |
| Akili Code OS | Live | [akilios.dev](https://akilios.dev) |

### Delivered Client Projects

Source of truth: the `projects` array in `components/sections/ClientProjects.tsx`.
Each project has a `sector` (drives the filter tabs), an `accent`, and a `metrics`
array rendered as the stat strip on the card.

| Project | Client | Type | Sector | Status |
|---------|--------|------|--------|--------|
| [fleetshq.com](https://fleetshq.com) | 256 Logistics Ltd (operator) | Transport operating platform — 5 domains, 10 role panels | Platforms & Systems | Live · Flagship |
| [reberoninvestments.com](https://reberoninvestments.com) | Denis Mayamba, MD | Construction & investment corporate platform | Corporate Web | Live |
| [256logisticsltd.co.uk](https://256logisticsltd.co.uk) | 256 Logistics Ltd | UK freight & haulage corporate website | Corporate Web | Live |
| [einsteinrisingcanada.org](https://einsteinrisingcanada.org) | Derek J Lobo | Organisation management system | Platforms & Systems | Live |
| [bunyonyiluxuryresort.com](https://bunyonyiluxuryresort.com) | Precious | Resort website + bookings | Platforms & Systems | Live |
| [simonsharpproducts.com](https://simonsharpproducts.com) | Simon Sharp | Mini e-commerce platform | E-Commerce | Live |
| ambrosolicreations.com | Ambrose | Premium handcraft e-commerce | E-Commerce | In development |

**FLEETS.HQ** is the flagship. It began as the *256 Logistics Compliance Hub* at
`256logisticsltd.com/welcome` and has since been rebuilt and rebranded as a
standalone transport SaaS at `fleetshq.com` — developed and managed by ECADEL
GROUP, operated by 256 Logistics Ltd. Any reference to the old name or URL is
stale; the site renders it as the featured card with a live operator-console panel.

> **Note on testimonials.** `components/sections/Testimonials.tsx` carries
> attributed client quotes. Do not add a quote for a named individual without
> written sign-off from that client. Drafts awaiting sign-off live in
> `docs/testimonial-drafts.md` and must not be shipped to the site until approved.

---

## 16. Quality Invariants (audited, not assumed)

This site animates a lot, and it has been attacked once. Four things are easy to break
without noticing, so they are measured or asserted rather than eyeballed. Run the three
audits after any change to a section's layout, entry animations or the nav — and
`deploy.sh` runs its own checks as part of every deploy:

| Command | Asserts |
|---------|---------|
| `npm run audit` | No horizontal overflow at 360–1920px, the nav row fits with at least 16px of slack, no unlabelled form fields, every image has `alt` |
| `npm run audit:scroll` | Vertical scrolling works, horizontal scrolling is impossible, the fixed nav stays pinned, scroll-driven animation is driven |
| `npm run audit:reduced-motion` | `prefers-reduced-motion` is honoured: intro skipped, native cursor restored, marquees frozen |
| `./deploy.sh` (on the VPS) | Static files clean, app responds 200, previous state backed up and rollback printed |

All three need the production server already running (`npm run start`) and launch their own
headless Chrome — set `CHROME_PATH` if Chrome is not on `PATH`.

**1 · The page never scrolls horizontally.** Cards animate in from an `x` offset; until a
card has scrolled into view it sits at that offset, which makes the document wider than the
viewport. Measured at 1280px: with no clipping the viewport can be scrolled **6px** sideways
even though `scrollWidth` reports no overflow — the evidence is invisible to `scrollWidth`,
which is why `npm run audit:scroll` scrolls the page and reads `scrollX` rather than trusting
the layout numbers.

The fix in `app/globals.css` sets `overflow-x: clip` on **both `html` and `body`**. That is
not belt-and-braces — it was measured candidate by candidate, one fresh page load each:

| `overflow-x` set on | `scrollX` after an instant 250px scroll attempt |
|---|---|
| nothing | 6 |
| `html` only | 6 |
| `body` only | 6 |
| **both (`clip`)** | **0** |
| both (`hidden`) | 0, but creates a scroll container |

`clip` rather than `hidden` deliberately: it does not create a scroll container, so
`position: fixed` and `sticky` are unaffected. If you add a big sliding animation, the audit
will tell you if it escapes.

**A trap worth knowing:** if you edit `app/globals.css` and rebuild while `next start` is
still running, the server keeps its old chunk manifest and the stylesheet 404s. The page then
renders *unstyled* — and an unstyled page has no overflow, so the responsive audit will report
a cheerful PASS on a broken page. Both audits now assert the stylesheet actually loaded
(`body` background resolved, no `<link rel=stylesheet>` with a null `.sheet`) and fail loudly
otherwise. **Restart the server after every build before auditing.**

**2 · Reduced motion is honoured.** `prefers-reduced-motion: reduce` must:
- skip the branded intro entirely (`LoadingScreen.tsx`),
- restore the native cursor (`CustomCursor.tsx` + the `@media` gate in `globals.css`),
- freeze the marquees and orbit rings.

CSS alone cannot do the third one — Framer Motion drives transforms from JS and ignores
the media query — so `components/MotionProvider.tsx` wraps the app in
`<MotionConfig reducedMotion="user">`. Put any new global motion policy there.

The custom cursor is also gated on `(hover: hover) and (pointer: fine)`, so a touch or
hybrid device can never end up with the native cursor hidden and nothing drawn in its place.

**3 · The published static files are not defaced.** On 28 August 2026 an
intruder overwrote `public/favicon.ico`, `public/robots.txt` and
`public/site.webmanifest` with a calling card ("Hacked By : AnsBix8" /
Telegram `@deimm1`) and scattered `pwned.txt` markers through every directory
that looked like a web root (`public/`, `out/`, `dist/`, `app/public/`,
`apps/*/public/`, `.next/static/…`). The intruder did not gain SSH access —
no login was recorded in that window, and no key was added to
`authorized_keys` — so the write came through something running as the
`ecadel` user, i.e. the web application.

Consequences to keep in mind:

- `deploy.sh` now deletes `pwned.txt` markers and the stray `apps/`, `dist/`,
  `out/`, `app/public/` directories on every run, and asserts after restarting
  that `/favicon.ico`, `/robots.txt` and `/site.webmanifest` no longer contain
  the defacement strings.
- **The published files are a live, publicly served surface.** Anything that
  can write to `public/` is a defacement vector regardless of how it got there.
  If you re-examine this, start with whatever runs as `ecadel` and can write
  into `/var/www/ecadelgroup`.
- The `next` version on the server was bumped to `15.5.25` on 16 September
  (pm2 was still referenced then). **That version is pinned in `package.json`
  deliberately** — git previously said `15.3.2`, so a naive deploy would have
  silently downgraded production and undone the patch.
- `npm audit` reports 10 advisories (1 low, 2 moderate, 7 high), including
  `nodemailer` — which `app/api/contact/route.ts` uses. Clearing them means
  major bumps (`nodemailer` 8 → 10, `next` 15 → 16 for the bundled `postcss`);
  that is a deliberate piece of work, not a deploy side-effect.

**4 · Forms and images are labelled.** Every enquiry-form field is programmatically
associated with its `<label>` via `htmlFor`/`id` (`Contact.tsx`) — a visual label alone
leaves screen readers announcing "edit text, blank". The audit fails if any
`#contact-*` field has no label, or if an `img` is missing `alt`.

---

## Contacts

| Role | Email |
|------|-------|
| General | ecadel@ecadelgroup.com |
| Website | [ecadelgroup.com](https://ecadelgroup.com) |
| Headquarters | Kampala, Uganda |

---

*Built and maintained by ECADEL GROUP LIMITED.*  
*Company Profile: `docs/ecadel_group_profile.html` (v1.2)*
