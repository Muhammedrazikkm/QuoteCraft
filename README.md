# QuoteCraft — Professional Quotation Builder, Document Designer & PDF Generator

> **QuoteCraft** is a complete, modern, privacy-focused, browser-based quotation creation and custom document design platform. It empowers freelancers, contractors, agencies, and enterprises to draft, calculate, customize, and download publication-ready business quotations without requiring accounts, logins, or cloud database infrastructure.

---

## 🌟 Key Product Highlights

- **100% Free & Account-Free**: No sign-ups, subscriptions, or paywalls. Immediate access to document creation.
- **Local-First Sandboxed Storage**: All quotations, customer contacts, item libraries, and company profiles remain securely stored in your browser's private **IndexedDB** database via **Dexie.js**.
- **Dual Mode Editor**:
  - **Simple Form Editor**: Structured form fields for fast, error-free quote generation.
  - **Advanced Visual Designer**: Multi-panel document workspace with live A4/Letter canvas, zoom controls, layers hierarchy, typography options, and custom palettes.
- **Precision Financial Calculation Engine**:
  - Powered by **Decimal.js** for exact arithmetic without floating-point rounding errors.
  - Quantity × rate, fixed and percentage line discounts, and document-level overall discounts.
  - Multi-tax support (CGST, SGST, IGST, VAT, Sales Tax) with exclusive or inclusive tax modes.
  - Automatic deposit / mobilization advance and balance due calculations.
  - Automatic **Amount in Words** generator supporting both International (Millions/Billions) and Indian (Lakhs/Crores) numbering formats.
- **14+ Curated Industry Templates**:
  - Minimalist Clean, Modern Enterprise, Corporate Executive, Formal Legal & Commercial, Creative Studio & Agency, IT Infrastructure & Cloud, Software & App Development, General Construction & Engineering, Interior Design & Architecture, Wholesale & Bulk Distribution, Industrial & Manufacturing, Freelancer & Consultant, Events & Luxury Hospitality, and Global Trade & Cross-Border.
- **Multi-Page In-Browser PDF Export**:
  - Generates publication-ready PDFs directly in the browser using high-resolution rendering.
  - Digital verification **QR codes**, authorized executive signatures, and corporate official seals.
- **Full Workspace Backup & Restore**:
  - Export full workspace as `.json` or compressed `.zip` with README and metadata.
  - Import with merge (append) or replace (clean slate) conflict strategies.
  - Single quotation portable `.quotecraft.json` export and import.
- **SEO & Discoverability Foundation**:
  - Static HTML rendering for all public routes.
  - Valid `sitemap.xml` and `robots.txt` disallowing private user routes.
  - Rich JSON-LD structured data (`SoftwareApplication`, `Article`, `FAQPage`, `BreadcrumbList`).
  - 10+ comprehensive commercial guides covering quotation best practices, quotation vs invoice, terms & conditions, and contractor bids.

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 App Router | Static site generation and client-side routing |
| **Language** | TypeScript | Strict type safety and complete domain schemas |
| **Styling** | Tailwind CSS & PostCSS | Responsive design system, custom print media CSS |
| **Local Database** | Dexie.js (IndexedDB) | High-performance, schema-indexed browser storage |
| **Financial Engine** | Decimal.js | Arbitrary-precision financial calculations |
| **State Management** | Zustand | Reactive state, debounced autosave, and undo/redo history |
| **PDF Generation** | jsPDF & html2canvas | Vector and image high-res in-browser PDF download |
| **QR Code** | QRCode | Dynamic authentication and quotation verification QR |
| **Backup Archive** | JSZip | Compressed ZIP workspace archive export |
| **Date Management** | date-fns | ISO date parsing, formatting, and expiry calculations |
| **Icons** | Lucide React | Modern, accessible iconography |
| **Automated Testing** | Vitest & jsdom | Unit and calculation regression test suites |

---

## 🗺️ Application Routes

### Public & SEO-Indexable Pages
- `/` — Homepage (Hero, live mockup card, features, template showcase, how it works, FAQs)
- `/free-quotation-maker` — Targeted landing page for free quote maker queries
- `/quotation-generator` — Targeted landing page for dynamic quotation generator queries
- `/quotation-pdf-maker` — Targeted landing page for browser PDF quote maker queries
- `/templates` — Complete template gallery with category filters and search
- `/templates/[category]` — Specialized industry template pages (`business`, `construction`, `it-services`, `freelance`, `interior-design`, `software-development`, `retail`, `consulting`)
- `/guides` — Educational knowledge hub for proposal best practices
- `/guides/[slug]` — 10 detailed guides (Quotation vs Invoice, Quotation vs Estimate, Tax Calculations, Construction Quotes, IT Proposals, Freelance Contracts, etc.)
- `/help` — Knowledge base and FAQ center
- `/privacy` — Local-first transparent privacy policy
- `/terms` — Commercial terms of service
- `/sitemap.xml` — Complete static XML sitemap
- `/robots.txt` — Search engine crawling directives

### Private Workspace Pages (Local Storage Only)
- `/editor` — Quotation Creator & Editor with Simple Form and Advanced Visual Designer
- `/editor?id=...` — Open and edit existing locally saved quotation
- `/editor?template=...` — Create new quotation from specific starter template
- `/my-quotations` — Local quotation management (search, filter, sort, grid/list view, bulk operations)
- `/customers` — Customer address book and billing directory
- `/items` — Product and service catalog with custom SKU rates and tax presets
- `/settings` — Default currency, numbering prefix (e.g. `QT-2026-`), and validity settings
- `/settings/companies` — Multi-brand company profile manager with logos, stamps, and bank details
- `/settings/backup` — Workspace backup download and archive restore

---

## 🚀 Getting Started & Installation

### Prerequisites
- Node.js version 18.x or 20+ (Node v22+ supported)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build Static Production Export
```bash
npm run build
```
This builds an optimized static export in the `out/` directory, ready to deploy to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages, AWS S3).

---

## 🔒 SEO & Privacy Launch Checklist

- [x] All public pages generate static crawlable HTML.
- [x] Canonical URLs, descriptive titles, and meta descriptions for all routes.
- [x] `sitemap.xml` includes all canonical public pages and excludes private user routes (`/editor`, `/my-quotations`, `/settings`).
- [x] `robots.txt` explicitly disallows private application routes.
- [x] Valid Schema.org JSON-LD structured data (`SoftwareApplication`, `Article`, `FAQPage`, `BreadcrumbList`).
- [x] Zero quotation contents, customer details, or business finances are ever submitted to search engines or external APIs.
- [x] Web manifest (`manifest.json`) configured for Progressive Web App (PWA) offline usage.

---

## 📄 License
MIT License. Built for independent businesses, freelancers, and enterprises worldwide.

