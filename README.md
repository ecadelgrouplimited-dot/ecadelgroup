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

---

## 1. Project Overview

This is the official corporate website for **ECADEL GROUP LIMITED** — a digital infrastructure and systems conglomerate headquartered in Kampala, Uganda.

The site showcases:
- The five subsidiary platforms (SBB, PAME AI, SafeRoad UG, Hapa, Meridian)
- Client-facing services (software dev, mobile/web, hosting, consultancy, AI integration)
- Delivered client projects (Simon Sharp, Einstein Rising Canada, Bunyonyi Resort, Ambrosoli)
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
| Fonts | Inter · Space Grotesk (Google Fonts) |
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
│   │   ├── FlagshipProjects.tsx# 5 subsidiary platforms
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
| Platforms (SBB/PAME etc.) | `FlagshipProjects.tsx` | All 5 platform writeups + mockups |
| ECADEL LABS | `EcadelLabs.tsx` | Labs description, pillars, orbital visual |
| Client Projects | `ClientProjects.tsx` | The 4 delivered client projects |
| Testimonials | `Testimonials.tsx` | The 4 client testimonials |
| Why Africa | `WhyAfrica.tsx` | Africa thesis section |
| Leadership | `Leadership.tsx` | Wilson & Catherine profiles |
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
<PlatformBadge label="03 / 05 — SAFEROAD UG · Awaiting Regulatory Approval" />
```
to:
```tsx
<PlatformBadge label="03 / 05 — SAFEROAD UG · LIVE AT SAFEROAD.UG" />
```
Also update the CTA link from `#contact` to the live URL.

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

Add to the `projects` array and update the index number.

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
cd /var/www/ecadelgroup && pm2 restart ecadelgroup
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
git pull → npm install → npm run build → pm2 restart
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

# Install PM2
npm install -g pm2

# Create project directory and clone
mkdir -p /var/www/ecadelgroup
cd /var/www/ecadelgroup
git clone git@github.com:ecadelgrouplimited-dot/ecadelgroup.git .

# Create credentials file (not in git)
nano .env.local
# Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

# Build and start
npm install
npm run build
pm2 start npm --name "ecadelgroup" -- start -- --port 3000
pm2 save
pm2 startup

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

# Check PM2 status
pm2 status

# View live logs
pm2 logs ecadelgroup

# Restart the app
pm2 restart ecadelgroup

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
2. **Build and start with PM2** on a different port (e.g., 3001):
   ```bash
   pm2 start npm --name "example" -- start -- --port 3001
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

### Site is down / PM2 crashed
```bash
ssh root@72.62.185.212
pm2 status                    # Check if process is online
pm2 logs ecadelgroup          # Read error logs
pm2 restart ecadelgroup       # Restart it
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
cat /var/www/ecadelgroup/.env.local    # Verify credentials are there
pm2 logs ecadelgroup --lines 50        # Look for SMTP errors
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
The Next.js app has crashed. Restart PM2:
```bash
ssh root@72.62.185.212
pm2 restart ecadelgroup
pm2 logs ecadelgroup
```

---

## 15. Platforms & Client Projects

### Group Subsidiaries

| Platform | Status | URL |
|----------|--------|-----|
| Smart Business Book (SBB) | Live | [sbb.finance](https://sbb.finance) |
| PAME AI | Live | [pame.cc](https://pame.cc) |
| SafeRoad UG | Awaiting regulatory approval | — |
| Hapa | Pre-launch (Kampala) | — |
| Meridian | Playbook stage | — |

### Delivered Client Projects

| Project | Client | Type | Status |
|---------|--------|------|--------|
| [simonsharpproducts.com](https://simonsharpproducts.com) | Simon Sharp | Mini e-commerce platform | Live |
| [einsteinrisingcanada.org](https://einsteinrisingcanada.org) | Derek J Lobo | Organisation management system | Live |
| [bunyonyiluxuryresort.com](https://bunyonyiluxuryresort.com) | Precious | Resort website + bookings | Live |
| ambrosolicreations.com | Ambrose | Premium handcraft e-commerce | In development |

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
