# 🖤 NexaFlow AI — The Autonomous AI Operating System

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nexaflow-ai-kappa.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

NexaFlow AI is a world-class **Autonomous AI Operating System & Workflow Automation SaaS Platform**. Designed for engineering teams, startups, and enterprises, NexaFlow AI automates complex business operations using autonomous AI agents instead of manual code or fragile legacy scripts.

🌐 **Live Production Link**: **[https://nexaflow-ai-kappa.vercel.app](https://nexaflow-ai-kappa.vercel.app)**

---

## ✨ 🎭 Key Features & Experiences

### 💎 Monochromatic Luxury Design System
- **Apple VisionOS & Linear-Tier Aesthetic**: Engineered with a deep obsidian black base (`#030303`), dark charcoal surfaces (`#0B0C0E`), and smoked acrylic glass cards (`rgba(18, 20, 23, 0.85)`).
- **Specular Edge Lighting**: Top specular borders (`inset 0 1px 0 rgba(255, 255, 255, 0.15)`) replicating machined glass and brushed black metal.
- **Zero RGB / Neon Noise**: Pure contrast driven by light, shadow, specular reflections, and metallic white typography.

### 🎯 Single Unified Precision Cursor
- **0ms Click Lag**: A single 9px matte white pointer dot centered at the exact mouse coordinates `(x, y)`.
- **Global Reset**: Native browser cursor hidden globally (`*, *::before, *::after { cursor: none !important; }`).
- **Concentric Glass Ring**: 24px thin outer glass ring centered directly over the pointer dot, eliminating dual-cursor confusion.
- **Context Transformations**: Button magnetic pull, link dot compression, card 3D tilt response, text slim I-beam morphing, and drag indicators (`↔`).

### 🎬 8-Scene Camera Travel Story Architecture
1. **Scene 01 // Core Initialization**: WebGL 3D neural dust mesh, developer code terminal (`nexaflow_init.ts`), system initialization badge, and magnetic CTAs.
2. **Scene 02 // Prompt Synthesis**: Live interactive prompt simulator bar with 4-step execution trace timeline and streaming memory logs.
3. **Scene 03 // DAG Automation**: 3D glass bento cards with active specular borders and interactive preview widgets.
4. **Scene 04 & 05 // API Interconnect & Agent Runtime**: 3D visual pipeline architecture (Ingestion Layer → AI Neural Core → Delivery) with traveling data streams.
5. **Scene 06 // Living Telemetry Analytics**: Real-time HUD metrics tracking 12,840+ daily workflows, 99.98% SLA, and sub-15ms execution.
6. **Scene 07 // Zero-Knowledge Security**: SOC 2 Type II security shield matrix contrasting Legacy Automation vs Autonomous NexaFlow AI Agents.
7. **Scene 08 // Production Deploy**: Subscription matrix featuring dynamic multi-currency conversion and billing toggles.

### 💳 Dynamic Multi-Currency Pricing Engine
- **Supported Currencies**: Real-time conversion across **USD ($)**, **EUR (€)**, **GBP (£)**, **INR (₹)**, **JPY (¥)**, **CAD (C$)**, and **AUD (A$)**.
- **Interactive Billing Toggles**: Monthly and Annual plans with automated 20% discount calculations.
- **Strict Logic Boundaries**: 100% clean architecture relying on `pricingMatrix.ts` and `pricingEmitter.ts`.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Library** | React 19 |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Vanilla CSS Variables & Tailwind CSS v4 |
| **Animation Physics** | Framer Motion (useSpring, useMotionValue) & WebGL Canvas |
| **Deployment** | Vercel Serverless Edge Platform |

---

## ⚙️ Setup & Local Development

### 1. Prerequisites
Ensure you have **Node.js (v18.x or higher)** and **npm** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Dhruvinpatel06/NexaFlow_AI.git
cd NexaFlow_AI
npm install --legacy-peer-deps
```

### 3. Start Local Development Server
Launch the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) in your browser.

### 4. Production Build Verification
Verify TypeScript compilation, static page prerendering, and zero-error builds:
```bash
npm run build
```

---

## 📂 Project Structure

```text
NexaFlow_AI/
├── app/
│   ├── layout.tsx         # Global fonts, metadata, JSON-LD schema markup
│   ├── page.tsx           # Main 8-scene landing page component orchestration
│   ├── globals.css        # Luxury dark palette, keyframe physics, cursor reset
│   ├── sitemap.ts         # Dynamic SEO sitemap generator
│   └── robots.ts          # Search engine crawler configuration
├── components/
│   ├── SpotlightCursor.tsx # Single precision pointer with spring physics
│   ├── Hero.tsx           # Scene 1: WebGL Canvas, code box, 3D tilt dashboard
│   ├── InteractiveAIDemo.tsx # Scene 2: Live prompt execution simulator
│   ├── BentoAccordion.tsx # Scene 3: 3D glass bento feature architecture
│   ├── Workflow3D.tsx     # Scene 4 & 5: 3-stage visual pipeline graph
│   ├── WhyNexaFlow.tsx    # Scene 7: Zero-Knowledge security comparison
│   ├── StatsBar.tsx       # Scene 6: Living telemetry HUD counters
│   ├── Pricing.tsx        # Scene 8: Multi-currency subscription matrix
│   ├── Testimonials.tsx   # Verified customer social proof carousel
│   ├── FAQ.tsx            # Technical Q&A accordion
│   ├── Navbar.tsx         # Command menu & live system status badge
│   ├── Footer.tsx         # Constellation graphics & legal links
│   └── NeuralCanvas.tsx   # WebGL 3D white dust particle mesh
├── lib/
│   ├── pricingMatrix.ts   # Core currency conversion rates & subscription tiers
│   ├── pricingEmitter.ts  # Event emitter pattern for currency dispatch
│   └── pricingContext.tsx # React Context provider for pricing state
├── public/                # Favicon, open graph assets, and metadata icons
└── README.md              # Project documentation
```

---

## 📈 Performance & SEO Optimization

- **100% Static Pre-rendering**: Pre-renders static HTML pages for instant First Contentful Paint (FCP).
- **60 FPS GPU Acceleration**: Hardware-accelerated CSS transforms (`translate3d`, `will-change`) preventing layout thrashing.
- **Structured Data (JSON-LD)**: Built-in `SoftwareApplication` schema mapping features, pricing tiers, ratings, and organization metadata.

---

## 📄 License & Attribution

Designed and engineered for the **IIT Bhubaneswar Hackathon** by **Dhruvin Patel**.

- 🌐 **Live Website**: [https://nexaflow-ai-kappa.vercel.app](https://nexaflow-ai-kappa.vercel.app)
- 🐙 **GitHub Repository**: [https://github.com/Dhruvinpatel06/NexaFlow_AI](https://github.com/Dhruvinpatel06/NexaFlow_AI)
