# NexaFlow AI — Premium SaaS Landing Page

NexaFlow AI is a high-end, premium SaaS landing page built for maximum visual appeal, micro-interactions, and search engine optimization. 

---

## 🚀 Key Features

### 🎨 Design & Visual Enhancements
*   **Oceanic Noir Theme**: Tailored, deep dark-mode and light-mode interfaces using unified CSS variables.
*   **3D Mouse-Tracking Parallax**: Dynamic 3D tilt effects on cards (Bento features, Pricing layouts, and Stats indicators) that follow the cursor on mouse-over.
*   **Cursor Spotlights**: Shifting radial gradient backgrounds on cards following relative hover coordinates.
*   **Smooth Micro-Animations**: Shimmering button effects, glow pulses, live activity indicators, and gentle background floating elements.
*   **3D Testimonial Swap**: Perspective transitions rotating card blocks along the Y-axis.

### ⚙️ Interactive Functions
*   **Reactive Pricing Model**: Instantly responsive billing toggle (Monthly / Annual) and currency selector (USD / EUR / GBP) updating price rates without page reload.
*   **Smooth Anchored Scrolling**: Unified page navigation mapping menu triggers and CTA buttons to correct section viewport positions.
*   **Fully Functional Modules**: Includes an interactive search panel, a watch demo popup dialogue with custom browser chrome, and contact validation modals.

### 📈 SEO & Performance Optimization
*   **Static Pre-rendering**: Converted core landing page components to Server Components for maximum speed and SEO parser readability.
*   **Robots.txt & Sitemap Generators**: Built-in Next.js configurations (`sitemap.ts` and `robots.ts`) targeting the production canonical domain (`https://nexaflow-ai-kappa.vercel.app`).
*   **JSON-LD Structured Data**: High-fidelity `SoftwareApplication` schema mapping features, pricing tiers, ratings, and creator metadata.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **Library**: React 19
*   **Styling**: Vanilla CSS Variables & Tailwind CSS v4
*   **Language**: TypeScript

---

## ⚙️ Setup & Development

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to inspect.

### 3. Production Build
Verify code compilation, type safety, and static asset generation:
```bash
npm run build
```

---

## 📂 Project Structure

```text
├── app/
│   ├── layout.tsx     # Global wrappers, font mappings, and JSON-LD schema
│   ├── page.tsx       # Server-rendered main landing page structure
│   ├── sitemap.ts     # Dynamic sitemap configuration
│   └── robots.ts      # Search engine robots configuration
├── components/
│   ├── Hero.tsx       # Main header, call-to-actions, and 3D mockup
│   ├── Pricing.tsx    # Interactive subscription plans and billing toggle
│   ├── BentoAccordion.tsx # Feature grid with spotlight and tilt features
│   └── ...
├── lib/
│   ├── pricingContext.tsx # Context management for billing and currency selector
│   └── ...
└── package.json       # Dependencies, configurations, and scripts
```
