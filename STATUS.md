# 🚀 Portfolio Project — Status & Roadmap

> **Md. Shakhawat Hossain** — Full-Stack Laravel Specialist Portfolio
> Stack: **Next.js 16 (Turbopack) · React 19 · Tailwind CSS · GSAP · Lenis**
> Last updated: September 2026

---

## 📊 Overall Progress: **~96% complete**

```
Foundation & Design    ██████████ 100%
Core Sections          ██████████ 100%
Senior Engineering Labs██████████ 100%
Interactions & UX      ██████████ 100%
Clean Architecture     ██████████ 100%
Polish & Anti-Gimmick  ██████████ 100%
Type Safety & Build    ██████████ 100%
Deployment Ready       █████████░  90%
```

**Health:** ✅ Production build passes clean with Turbopack (`next build` 9.2s, 0 errors) · 4 API routes.

---

## 🎯 The Concept

A **dual-perspective portfolio** tailored for both non-technical recruiters and senior technical leads/CTOs:

| Perspective | Target Audience | Primary Focus |
|-------------|-----------------|---------------|
| 👔 **HR Mode** (Default) | Hiring Managers & Recruiters | Clean summary, credential verification, business impact (Problem ➔ Decision ➔ Implementation ➔ Result), direct CV download |
| 🧑‍💻 **Dev Mode** | Senior Engineers, Tech Leads & CTOs | In-depth request lifecycle, Code Quality (Fat Controller vs Service Class), Database Lab (N+1 query tuning), Testing & RBAC security |

---

## ✅ Recent High-Impact Additions

1. **Engineering Principles & Workflow (`EngineeringPrinciples.tsx`):**
   - 6 Core Principles: Separation of Concerns, Database-First Thinking, API Contract Stability, Secure by Default, ACID Transaction Safety, Measure Before Optimizing.
   - 8-Step Engineering Workflow Pipeline (`Understand` ➔ `Deploy & Monitor`).
   - Continuous Evolution: Docker, Redis distributed queues, event-driven Laravel, and CI/CD pipelines.

2. **Selected Work Overhaul (`Work.tsx`):**
   - 4 Real CV Projects: Construction MIS (Enterprise ERP @ IISBD), Restaurant POS & Recipe Engine, Eduvess LMS, E-Commerce Management System.
   - HR Mode: 4 structured cards per project (`[ 01. The Problem ]`, `[ 02. Engineering Decision ]`, `[ 03. Implementation ]`, `[ 04. Business Result ]`).
   - Dev Mode: 4 compact sub-tabs (~550px height) with real code comparisons, MySQL query diffs, and `php artisan test` verification.

3. **Gimmick Removal & Professional Polish:**
   - Removed film-grain turbulence jitter for a 100% eye-friendly, smooth backdrop.
   - Direct CV download in both modes (no fake payment lock blocking recruiters).
   - Prominent Sandbox Demo label on API Playground endpoints.
   - Consistent water-blue (`#0ea5e9`), sky-blue (`#38bdf8`), and ocean-cyan (`#06b6d4`) branding.
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
