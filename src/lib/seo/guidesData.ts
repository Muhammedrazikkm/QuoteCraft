export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedDate: string;
  readTime: string;
  category: string;
  summary: string;
  content: string; // rich markdown or formatted text
  faqs: Array<{ question: string; answer: string }>;
}

export const GUIDES_LIST: GuideArticle[] = [
  {
    slug: "how-to-create-a-professional-quotation",
    title: "How to Create a Professional Business Quotation (Step-by-Step Guide)",
    metaTitle: "How to Create a Professional Quotation – Step-by-Step Guide | QuoteCraft",
    metaDescription: "Learn how to write and format a winning business quotation that converts clients. Includes essential fields, legal clauses, pricing breakdowns, and free PDF templates.",
    publishedDate: "2026-01-15",
    readTime: "7 min read",
    category: "Business Basics",
    summary: "A step-by-step masterclass on structuring, designing, and delivering high-converting business quotations with transparent pricing, terms, and accurate taxes.",
    content: `
A business quotation (or quote) is a formal commercial document provided by a seller to a prospective buyer that specifies the fixed pricing, scope of deliverables, payment milestones, and terms for a project. Unlike an estimate, a signed quotation forms a legally binding commercial agreement.

### Key Components of a Winning Quotation

1. **Company Header & Branding**: High-resolution logo, registered company name, physical address, business registration / tax number (e.g. GSTIN, VAT, EIN), and direct contact details.
2. **Customer Information**: Recipient contact person, purchasing department, official company name, and billing/shipping address.
3. **Quotation Identifiers**: Unique quotation number (e.g. \`QT-2026-001\`), issue date, and strict validity expiry date (usually 14 to 30 days).
4. **Itemized Deliverable Breakdown**: Clear description of items or services, SKU/code, quantity, units (e.g. hours, pieces, packages), rate per unit, item discounts, and subtotal.
5. **Comprehensive Tax & Discount Schedule**: Clear separation between subtotal, discounts, taxable value, and applied taxes (e.g., CGST, SGST, VAT, or Sales Tax).
6. **Commercial Terms & Conditions**: Explicit payment milestones (advance deposit vs final balance), delivery timeline, warranty, cancellation policy, and change-order procedures.
7. **Sign-off / Acceptance Block**: Formal lines for authorized signatures, dates, and official company stamp.

### Best Practices to Improve Quote Acceptance

- **Deliver Promptly**: Research shows quotes submitted within 24 hours of client consultation enjoy an 80% higher acceptance rate.
- **Provide Tiered Options**: Where suitable, include add-on line items or optional deliverables to give clients flexibility without losing the core deal.
- **Specify Validity Explicitly**: Never send open-ended quotations. Specify a 14-day or 30-day validity window to protect against supply price swings.
- **Use Multi-page Formatting**: If your quotation exceeds one page, ensure repeated table headers and clear 'Page X of Y' pagination so no item is obscured.
    `,
    faqs: [
      {
        question: "How long should a quotation remain valid?",
        answer: "Standard business practice is 30 days. In volatile industries (such as construction materials or international freight), 7 to 14 days is common.",
      },
      {
        question: "Is an accepted quotation legally binding?",
        answer: "Yes, in most jurisdictions, once a quotation is formally signed, stamped, or accepted in writing by the client, it constitutes a binding contract.",
      },
    ],
  },
  {
    slug: "quotation-vs-invoice",
    title: "Quotation vs Invoice: Key Differences Every Business Should Know",
    metaTitle: "Quotation vs Invoice: What's the Difference? | QuoteCraft",
    metaDescription: "Understand the vital differences between a quotation and an invoice: timing, legal standing, accounting role, and tax requirements.",
    publishedDate: "2026-01-20",
    readTime: "5 min read",
    category: "Financial Management",
    summary: "Clear breakdown of when to send a quotation versus when to issue an invoice, including tax obligations and accounting treatments.",
    content: `
While both quotations and invoices are essential commercial documents, they serve opposite ends of the sales cycle:

### Quick Comparison Table

| Attribute | Quotation | Invoice |
| :--- | :--- | :--- |
| **Stage** | Pre-sale negotiation | Post-sale / post-delivery |
| **Purpose** | Propose pricing, scope, and terms | Request payment for rendered goods/services |
| **Accounting Entry** | Non-accounting (memorandum only) | Accounts Receivable / Revenue recorded |
| **Legal Effect** | Becomes binding once signed | Formal proof of debt and tax liability |
| **Tax Liability** | Does not trigger tax remittance | Triggers GST/VAT reporting obligation |

### When to Issue a Quotation

A quotation is issued during the discovery or proposal phase. It allows the customer to review rates, negotiate revisions, and budget the expense before committing capital.

### When to Issue an Invoice

An invoice is generated once the quotation has been accepted and either the upfront deposit is due or the work has been completed.
    `,
    faqs: [
      {
        question: "Can an invoice number match the quotation number?",
        answer: "It is best practice to keep separate sequences (e.g. QT-2026-001 for quotation and INV-2026-001 for invoice) to avoid confusion during tax audits.",
      },
    ],
  },
  {
    slug: "quotation-vs-estimate",
    title: "Quotation vs Estimate: Which One Should You Send to Your Client?",
    metaTitle: "Quotation vs Estimate: Which Should You Use? | QuoteCraft",
    metaDescription: "Learn the crucial distinction between a quotation (fixed price) and an estimate (approximate projection) and avoid costly project disputes.",
    publishedDate: "2026-01-28",
    readTime: "6 min read",
    category: "Proposals & Bidding",
    summary: "Find out why issuing a quotation locks your price while an estimate allows adjustments, and when to use each for maximum profit protection.",
    content: `
Clients often use the terms 'estimate' and 'quote' interchangeably, but in business law and project accounting, they have vastly different ramifications.

### The Estimate: An Educated Guess

An **estimate** is an informed projection of what a project might cost based on preliminary or incomplete specifications.
- **Price flexibility**: The final cost may vary higher or lower (typically within +/- 15-20%) depending on unforeseen site conditions or scope changes.
- **Best suited for**: Early discovery meetings, home renovations with hidden variables, exploratory research, and conceptual software projects.

### The Quotation: A Fixed-Price Commitment

A **quotation** is a definitive, legally binding commitment to deliver a specified scope for an exact monetary sum.
- **Price certainty**: Once accepted by the customer, the seller cannot charge more unless the customer signs an official Change Order.
- **Best suited for**: Well-defined service scopes, standard manufacturing orders, IT packages, and turnkey construction contracts.
    `,
    faqs: [
      {
        question: "Can a contractor raise prices after sending a quotation?",
        answer: "Only if the quotation validity has lapsed, or if the client requests modifications outside the agreed scope via a Change Order.",
      },
    ],
  },
  {
    slug: "how-to-calculate-tax-in-quotation",
    title: "How to Calculate Tax (GST, VAT, Sales Tax) Accurately in Quotations",
    metaTitle: "How to Calculate Taxes in Quotations (Inclusive vs Exclusive) | QuoteCraft",
    metaDescription: "Master tax calculations for quotations: learn tax-inclusive vs tax-exclusive formulas, multi-tax splits (CGST/SGST), and decimal precision rules.",
    publishedDate: "2026-02-05",
    readTime: "6 min read",
    category: "Tax & Compliance",
    summary: "A practical guide to tax-exclusive vs. tax-inclusive calculations, decimal rounding rules, and multi-tier taxes like India's GST and GCC VAT.",
    content: `
Calculating taxes correctly on a commercial quote is vital. Underquoting tax causes profit loss, while inaccurate tax calculations trigger regulatory rejection or customer disputes.

### 1. Tax-Exclusive Calculations (Add-on Tax)
In tax-exclusive pricing, the unit rates do not include tax. The tax is added to the subtotal:
\`\`\`
Tax Amount = Net Subtotal * (Tax Rate / 100)
Grand Total = Net Subtotal + Tax Amount
\`\`\`

### 2. Tax-Inclusive Calculations (Tax Embedded in Price)
In consumer-facing retail and certain European/Australian markets, prices are stated inclusive of tax:
\`\`\`
Taxable Base = Gross Total / (1 + (Tax Rate / 100))
Tax Amount = Gross Total - Taxable Base
\`\`\`

### 3. Handling Multiple Taxes (e.g. CGST + SGST in India)
In intra-state sales in India under GST, an 18% total tax is split equally:
- Central GST (CGST) = 9%
- State GST (SGST) = 9%
Both apply to the taxable value after line discounts are deducted.

### Avoiding Decimal Rounding Errors
Always calculate line items with full floating or arbitrary precision (like Decimal.js) and only round to 2 decimal places at the grand total level to prevent discrepancies.
    `,
    faqs: [
      {
        question: "Are discounts applied before or after calculating tax?",
        answer: "Trade and line discounts are virtually always applied BEFORE tax, so tax is levied only on the net taxable consideration.",
      },
    ],
  },
  {
    slug: "how-to-write-quotation-terms-and-conditions",
    title: "How to Write Airtight Quotation Terms and Conditions (With Templates)",
    metaTitle: "Quotation Terms and Conditions Guide & Templates | QuoteCraft",
    metaDescription: "Protect your business with professional quotation terms: payment schedules, project scope, revisions, cancellation terms, and warranty disclaimers.",
    publishedDate: "2026-02-12",
    readTime: "8 min read",
    category: "Contracts & Legal",
    summary: "Essential clauses every business quotation must include to avoid non-payment, scope creep, and unexpected liability.",
    content: `
The terms and conditions attached to your quotation are your first line of defense against scope creep, delayed payments, and legal vulnerability.

### 6 Essential Quotation Clauses

1. **Validity Clause**: "This quotation is valid for thirty (30) days from the issue date. Acceptance beyond this period requires written reconfirmation."
2. **Payment Milestones**: Specify deposit percentages, interim billing trigger events, acceptable payment methods (wire, ACH, UPI), and late payment interest.
3. **Scope of Work & Variations**: Clearly state that any services requested outside the itemized table will be quoted separately on an hourly or fixed-fee basis.
4. **Client Responsibilities**: Outline assets or approvals the client must supply, and how delays on their end affect delivery deadlines.
5. **Warranty & Defect Liability**: Define what is covered, the duration (e.g. 60 or 90 days), and what voids the warranty (unauthorized modifications).
6. **Cancellation & Kill Fee**: If the client cancels the contract after acceptance, state that the non-refundable deposit will be retained alongside payment for work completed.
    `,
    faqs: [
      {
        question: "Should terms and conditions be printed on the quotation or linked?",
        answer: "For maximum enforceability, include the essential terms directly on the quotation document above or adjacent to the signature block.",
      },
    ],
  },
  {
    slug: "construction-quotation-guide",
    title: "How to Prepare a Detailed Construction & Contractor Quotation",
    metaTitle: "Construction Quotation Guide for Contractors | QuoteCraft",
    metaDescription: "Learn how to build detailed construction quotations: breakdown labor, materials, equipment hire, site prep, contingency margins, and OSHA compliance.",
    publishedDate: "2026-02-18",
    readTime: "7 min read",
    category: "Industry Specifics",
    summary: "A practical guide for general contractors, civil engineers, and trade specialists to estimate materials, labor, equipment, and contingencies.",
    content: `
Construction and contracting quotations demand higher granularity than standard retail quotes due to material price fluctuations and site variables.

### Recommended Groupings for Contractor Quotes

- **Group A: Site Mobilization & Demolition** (Safety fencing, permits, debris removal)
- **Group B: Raw Materials & Supply** (Concrete, lumber, rebar, plumbing fixtures, drywalls)
- **Group C: Specialized Labor & Tradecraft** (Carpenters, licensed electricians, welders)
- **Group D: Equipment Rental & Machinery** (Scaffolding, excavators, lifts)
- **Group E: Contingency Allowance** (Usually 5% - 10% for unforeseen ground conditions)
    `,
    faqs: [
      {
        question: "Should a contractor show profit margins on the quote?",
        answer: "No. Build your profit margins and overhead into your unit labor rates and material markups rather than displaying a separate 'profit' line.",
      },
    ],
  },
  {
    slug: "it-service-quotation-guide",
    title: "How to Prepare an IT & Software Development Service Quotation",
    metaTitle: "IT & Software Development Quotation Guide | QuoteCraft",
    metaDescription: "Master software development quotations: agile sprint estimates, cloud hosting line items, SLA tiers, licensing fees, and IP ownership clauses.",
    publishedDate: "2026-02-24",
    readTime: "7 min read",
    category: "Technology",
    summary: "Structure winning proposals for web apps, cloud migrations, managed services, and enterprise software contracts.",
    content: `
IT quotations must address both upfront implementation investment and recurring operational commitments like cloud hosting, third-party APIs, and SLA maintenance.

### Key Sections for Tech Quotations

1. **Sprint & Milestone Roadmap**: Group deliverables by Phase (Phase 1: Architecture, Phase 2: Core Platform, Phase 3: QA & Security).
2. **Third-Party Pass-through Costs**: Transparently isolate cloud infrastructure costs (AWS/GCP/Vercel) from developer engineering rates.
3. **SLA & Maintenance Packages**: Detail monthly hours allocated for bug fixes, security patches, and server uptime monitoring.
4. **Intellectual Property Rights**: Explicitly transfer customized code ownership upon full payment while retaining proprietary internal tooling libraries.
    `,
    faqs: [
      {
        question: "Should IT quotes be fixed-bid or time & materials?",
        answer: "For projects with concrete, immutable specifications, fixed-bid is preferred by clients. For dynamic exploratory apps, quoted milestone sprints work best.",
      },
    ],
  },
  {
    slug: "freelance-quotation-guide",
    title: "How to Create Winning Freelancer Quotations & Proposals",
    metaTitle: "Freelance Quotation Guide: Convert More Clients | QuoteCraft",
    metaDescription: "Freelancer quote tips: project vs hourly pricing, revision limits, kill fees, and clear deliverables that protect your creative time.",
    publishedDate: "2026-03-02",
    readTime: "5 min read",
    category: "Freelance",
    summary: "Win higher-paying clients and eliminate endless revisions by mastering the art of the freelance quote.",
    content: `
As a freelancer, your quotation is also your project agreement. A vague quote invites scope creep and unpaid revisions.

### 4 Golden Rules for Freelancers

1. **State Exact Number of Revision Rounds**: Clearly note: "Includes up to two (2) rounds of revisions. Subsequent revisions will be billed at $75/hr."
2. **Always Require an Upfront Deposit**: Never begin work without at least 30% to 50% paid as a non-refundable mobilization advance.
3. **Define Deliverable Formats**: Specify whether the client receives layered vector source files (.AI, .PSD, .Figma) or finished web assets only (.PNG, .PDF).
4. **Set Clear Turnaround Timelines**: Tie delivery dates to client response windows (e.g. "Delivery within 10 business days of receiving all brand assets").
    `,
    faqs: [
      {
        question: "How do I quote when I don't know the exact project size?",
        answer: "Provide a preliminary quote for a paid 'Discovery & Specification Phase' first, which produces the exact backlog for the larger build.",
      },
    ],
  },
  {
    slug: "how-to-number-business-quotations",
    title: "Quotation Numbering Best Practices & Format Schemes",
    metaTitle: "Quotation Numbering Best Practices & Schemes | QuoteCraft",
    metaDescription: "Discover how to number business quotations systematically. Explore date-based formats, customer codes, and sequential patterns that simplify tracking.",
    publishedDate: "2026-03-08",
    readTime: "4 min read",
    category: "Operations",
    summary: "Organize your proposals with clear numbering schemes like QT-2026-001 or QUO-CLIENT-01 to eliminate duplicate records and streamline audits.",
    content: `
A consistent numbering system prevents confusion, tracks revisions, and portrays corporate professionalism.

### Popular Quotation Numbering Formats

- **Year + Sequential**: \`QT-2026-001\`, \`QT-2026-002\` (Clean, industry standard, resets yearly)
- **Year + Month + Sequential**: \`QUO-2603-01\` (Enables immediate identification of creation month)
- **Client Prefix + Sequential**: \`APEX-Q01\`, \`STAR-Q02\` (Useful for account managers tracking specific enterprise accounts)
- **Revision Tracking**: If a quotation is updated, append \`-R1\` or \`-R2\` (e.g., \`QT-2026-042-R1\`) so historical offers remain preserved.
    `,
    faqs: [
      {
        question: "Should quotation numbers be identical to invoice numbers?",
        answer: "No. Invoices should have a separate chronological sequence to satisfy accounting and tax reporting compliance.",
      },
    ],
  },
];

