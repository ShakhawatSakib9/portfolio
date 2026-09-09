# 🚀 Portfolio Project — Status & Roadmap

> **Md. Shakhawat Hossain** — Full-Stack Developer Portfolio
> Stack: **Next.js 16 · React 19 · Tailwind v4 · GSAP · Lenis · Three.js**
> Last updated: 2026-07-05

---

## 📊 Overall Progress: **~88% complete**

```
Foundation & Design    ██████████ 100%
Core Sections          ██████████ 100%
Signature Features      █████████░  95%
Interactions / Motion  ██████████ 100%
Real Backend Data       ████░░░░░░  40%   ← mostly simulated (intentional)
Polish & Cleanup        ██████░░░░  60%
SEO / A11y              █████░░░░░  50%
Deployment              ░░░░░░░░░░   0%   ← not deployed yet
```

**Health:** ✅ Production build passes clean (TypeScript OK, 0 errors) · 4,600+ lines · 30+ components · 4 API routes.

---

## 🎯 The Concept (ki banachi)

Ekta **dual-persona interactive portfolio** — visitor 2-ta mode e experience pay:

| Mode | Ke jonno | Ki dekhay |
|------|----------|-----------|
| 👔 **Recruiter (HR)** | Non-technical, HR | Clean summary, quick wins, easy to scan |
| 🧑‍💻 **Engineer (Dev)** | Technical reviewers | Deep architecture, tracers, decision logs, incident sim |

Plus hidden **easter eggs**: Hacker Mode (`sudo su`), God Mode (Konami code), Glitch overlay (rapid clicks), Command Palette (Ctrl+K).

---

## ✅ DONE — ki ki kaj hoye geche

### 🏗️ Foundation & Design System — 100%
- [x] Next.js 16 + React 19 + Tailwind v4 scaffold
- [x] Neon dark design system (cyan + violet, glow, grid, noise)
- [x] Custom fonts (Space Grotesk + JetBrains Mono)
- [x] Lenis smooth scroll
- [x] Custom neon cursor (dot + easing ring + labels + sound)
- [x] Magnetic buttons
- [x] Old HTML site backed up in `legacy/`

### 🧩 Core Sections — 100%
- [x] **Hero** — Interactive 3D tilt tech portrait (background-less cutout, dual photo switcher, cyber rings & aura, glassmorphic badges), typing roles, magnetic CTAs
- [x] **Navbar** — sticky, scroll-spy, mode toggle, mobile menu
- [x] **Marquee** — scrolling tech strip
- [x] **About** — bio, profile, 4 stat cards
- [x] **Skills** — 8 cards with mouse-spotlight hover
- [x] **Work** ⭐ — 4 real case studies (Construction MIS, Eduvess LMS, InnoLearn, Restaurant POS) with recruiter/engineer dual view
- [x] **Contact** — real form → Web3Forms inbox
- [x] **Preloader** — boot-sequence animation

### 🎭 Signature / "Wow" Features — 95%
- [x] **ApiPlayground** — visitor real API hit korte pare (GET/POST, live latency)
- [x] **IncidentSimulator** — "debug the production incident" quiz (3 real incidents)
- [x] **ArchitectureMatrix** — monolith vs micro trade-off explorer
- [x] **TraceSimulator** — distributed trace stepper
- [x] **ChaosLab** — chaos-monkey fault injection sim
- [x] **CommandPalette** — Ctrl+K launcher + easter eggs
- [x] **BkashModal** — 5-step simulated bKash resume-unlock
- [x] **GlitchOverlay** — HTTP 429 → autoscaler recovery animation
- [x] **MatrixRain** — hacker-mode canvas rain
- [x] **PerformanceWidget** + **InterfacePreferences** floating panels
- [x] Dual-mode system + hotkeys + localStorage persist

### 🔌 API Routes — built
- [x] `/api/v1/status` — real memory/uptime/latency (+ mock DB ping)
- [x] `/api/v1/contact` — real Web3Forms delivery
- [x] `/api/v1/metrics` — **mock data**
- [x] `/api/v1/payment/bkash-verify` — **mock data**

---

## 🔧 TODO — ekhono ki ki korte hobe

### 🔴 High Priority (deploy er age)
- [ ] **Deploy to Vercel** — live URL + custom domain (portfoliome.test Apache diye hobe na)
- [ ] **Contact route security fix** — hardcoded Web3Forms key source e commit kora ache → `.env` e move koro; ar "always success" return thik koro (delivery fail hole false dao)
- [ ] **SEO** — proper OG image (banano lagbe), sitemap, robots.txt, per-page meta
- [ ] **Mobile testing** — 3D scene + cursor + panels sob device e test koro
- [ ] **Favicon** — nijer branded favicon (ekhon Next default)

### 🟡 Medium Priority (polish)
- [ ] **`Reveal.tsx` remove** — orphaned dead code (kothao import kora nei)
- [ ] **PerformanceWidget** — fake static 100/100 Web Vitals ache; hoy real measure koro (web-vitals lib) noyto "demo" label dao
- [ ] **`activeConnections`** random number → real ba remove
- [ ] **High-contrast toggle** — reload e persist korche na (localStorage add koro)
- [ ] **Accessibility** — keyboard nav, focus states, `prefers-reduced-motion` sob animation e respect, alt texts, aria labels
- [ ] **Lighthouse audit** — target 95+ (image optimize, lazy-load 3D)

### 🟢 Low Priority (nice-to-have)
- [ ] **GitHub live stats** — real contribution graph pull (planned Phase 4 feature)
- [ ] **Real metrics** — `metrics`/`bkash-verify` route e real data (ba clearly "simulated" label — ekhon partially labeled)
- [ ] **Blog / writing** section (optional)
- [ ] **Analytics** — Vercel Analytics ba Plausible
- [ ] **Loading/error states** — API playground e edge cases
- [ ] **Content proofread** — sob text, links, resume up-to-date kina

---

## 📝 Notes (jana thaka valo)
- Onek "live backend/telemetry" feature actually **scripted simulation** (Preloader logs, ChaosLab, GlitchOverlay, TraceSimulator, bKash). Egulo mostly self-labeled "Simulated/Sandbox" — bug na, intentional demo. Chaile kichu real koraতে pari.
- `Work.tsx` (538 lines) holo centerpiece — real project case studies ache.
- Build **green**, deploy korার জন্য technically ready.

---

## 🗺️ Suggested Next Steps (kon order e)
1. **Contact security fix** (5 min) — sensitive
2. **Cleanup** — Reveal remove, high-contrast persist, activeConnections fix
3. **SEO + favicon + OG image**
4. **Accessibility + Lighthouse polish**
5. **Deploy to Vercel** 🚀
6. (Optional) Real GitHub stats + real metrics

---
*Ei file ta living document — kaj korার sathe sathe checkbox tick koro.*
