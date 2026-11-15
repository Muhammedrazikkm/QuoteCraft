export interface CategoryLandingInfo {
  slug: string;
  name: string;
  templateId: string;
  title: string;
  metaDescription: string;
  heading: string;
  heroDescription: string;
  industryOverview: string;
  keyFields: string[];
  bestPractices: string[];
  sampleItems: Array<{ name: string; description: string; rate: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const TEMPLATE_CATEGORIES_DATA: Record<string, CategoryLandingInfo> = {
  business: {
    slug: "business",
    name: "Business & Corporate",
    templateId: "corporate-executive",
    title: "Free Business Quotation Template & PDF Maker | QuoteCraft",
    metaDescription:
      "Generate formal business quotations online with corporate headers, itemized pricing tables, tax breakdown, and executive signature blocks. Free instant PDF.",
    heading: "Professional Business Quotation Template",
    heroDescription:
      "Designed for enterprises, commercial suppliers, and corporate service providers requiring structured proposals with compliance and executive sign-off.",
    industryOverview:
      "Corporate business proposals require clear distinction between item deliverables, applicable taxes (such as GST or VAT), payment schedules, and terms of delivery.",
    keyFields: [
      "Company Registration & Tax IDs (CIN, GSTIN, VAT, EIN)",
      "Purchase Order (PO) & Reference Codes",
      "Executive Signatory with Designation",
      "Bank Wire & Routing Remittance Details",
      "Multi-currency & Payment Milestone Breakdown",
    ],
    bestPractices: [
      "Always attach an authorized corporate signatory with designation",
      "State quotation validity period clearly (typically 30 days)",
      "Provide itemized tax schedules rather than lump-sum figures",
    ],
    sampleItems: [
      { name: "Executive Strategic Advisory Retainer", description: "Monthly leadership strategy consultation", rate: "$4,500/mo" },
      { name: "Compliance & Governance Audit", description: "Comprehensive corporate audit & risk assessment", rate: "$6,200" },
    ],
    faqs: [
      { question: "Can I add our corporate logo and stamp?", answer: "Yes, you can upload your corporate logo, digital signature, and official seal directly." },
      { question: "Is this format accepted by banks and enterprise procurement?", answer: "Yes, this template satisfies standard commercial procurement guidelines worldwide." },
    ],
  },
  construction: {
    slug: "construction",
    name: "Construction & Contractors",
    templateId: "construction-contractor",
    title: "Construction Quotation Template & Contractor Bid Maker | QuoteCraft",
    metaDescription:
      "Create professional construction bids and contractor quotations. Granular labor, materials, equipment rental, permits, and OSHA compliance terms.",
    heading: "Construction & Contractor Quotation Template",
    heroDescription:
      "Built for general contractors, civil engineers, builders, and trade specialists requiring phased project budgeting and material breakdowns.",
    industryOverview:
      "Construction projects carry site-specific variables. A clear quote isolates raw materials, labor, scaffolding/equipment hire, and contingency allowances.",
    keyFields: [
      "Project Site Physical Address",
      "Bill of Quantities (BOQ) with Measurement Units (sq ft, cu m, bags)",
      "Mobilization Advance & Retainage Terms",
      "Inclement Weather & Change Order Provisions",
      "OSHA & Site Safety Compliance Clause",
    ],
    bestPractices: [
      "Group line items by project phase (Site Prep, Framing, Finishing)",
      "Specify who bears costs for unexpected site conditions",
      "Include a 10% contingency allocation for material price swings",
    ],
    sampleItems: [
      { name: "Site Excavation & Foundation Pouring", description: "Excavation to 6ft depth, rebar reinforcement, concrete 4000 PSI", rate: "$14,500" },
      { name: "Structural Steel & Framing Package", description: "Grade 50 structural steel beams and installation", rate: "$28,000" },
    ],
    faqs: [
      { question: "Does this support item grouping for materials and labor?", answer: "Yes, QuoteCraft allows you to group items into customizable phases with subtotals." },
    ],
  },
  "it-services": {
    slug: "it-services",
    name: "IT Infrastructure & Cloud",
    templateId: "it-cloud-services",
    title: "IT Services Quotation Template & Tech Proposal Maker | QuoteCraft",
    metaDescription:
      "Draft professional IT service quotations: cloud infrastructure, network deployments, SLA support tiers, cybersecurity packages, and hardware specs.",
    heading: "IT Services & Cloud Infrastructure Quotation Template",
    heroDescription:
      "Tailored for managed service providers (MSPs), IT consultants, cloud architects, and network engineers delivering technical solutions.",
    industryOverview:
      "IT proposals must clearly differentiate between one-time implementation deliverables and ongoing monthly recurring service-level agreements (SLAs).",
    keyFields: [
      "SLA Response & Resolution Time Guarantees",
      "Cloud Server Provisioning Specifications",
      "Cybersecurity & Data Privacy Safeguards",
      "Hardware Licensing vs Engineering Hourly Rates",
      "Backup & Disaster Recovery Protocols",
    ],
    bestPractices: [
      "List hardware specifications and vendor licenses as distinct line items",
      "State uptime SLA percentages (e.g. 99.9% uptime)",
      "Specify post-deployment warranty and support window",
    ],
    sampleItems: [
      { name: "AWS Cloud High-Availability Cluster", description: "Multi-region VPC, auto-scaling ECS cluster, and RDS PostgreSQL", rate: "$5,800" },
      { name: "24/7 Managed NOC & SOC Monitoring", description: "Tier 3 endpoint protection, patch management, 15-min SLA", rate: "$1,450/mo" },
    ],
    faqs: [
      { question: "Can I quote recurring monthly maintenance beside one-time setup?", answer: "Yes, you can specify unit types like 'mo', 'yr', or 'hrs' with clear descriptions." },
    ],
  },
  freelance: {
    slug: "freelance",
    name: "Freelancers & Solopreneurs",
    templateId: "freelance-pro",
    title: "Freelance Quotation Template – Create Professional Quotes | QuoteCraft",
    metaDescription:
      "Clean, modern quotation format for freelancers, designers, copywriters, and consultants. Specify project milestones, hourly rates, revision limits, and kill fees.",
    heading: "Freelance & Creative Quotation Template",
    heroDescription:
      "Empower your freelance business with polished quotations that establish credibility, prevent scope creep, and secure your upfront deposit.",
    industryOverview:
      "Freelancers often suffer from unbilled revisions and delayed client approvals. A sharp quote locks the revision count and ties deadlines to client inputs.",
    keyFields: [
      "Explicit Revision Rounds (e.g. 2 rounds included)",
      "Upfront Deposit Percentage (typically 50%)",
      "Final Deliverable File Formats & IP Transfer",
      "Kill Fee in Case of Project Cancellation",
    ],
    bestPractices: [
      "Never start creative work without at least 30-50% upfront deposit",
      "Define exactly what is out of scope to avoid unpaid extra requests",
      "Set expiration dates so clients don't accept months later at old rates",
    ],
    sampleItems: [
      { name: "Brand Identity Design Package", description: "Primary logo, color palette, typography guidelines, vector assets", rate: "$1,800" },
      { name: "Full Website UI/UX Figma Prototype", description: "Desktop & mobile responsive layouts, design components", rate: "$2,400" },
    ],
    faqs: [
      { question: "How do I prevent clients asking for endless changes?", answer: "Our template includes a clear clause specifying how many revision rounds are included." },
    ],
  },
  "interior-design": {
    slug: "interior-design",
    name: "Interior Design & Architecture",
    templateId: "interior-architecture",
    title: "Interior Design Quotation Template & Estimate Format | QuoteCraft",
    metaDescription:
      "Elegant interior design quotations with room-by-room breakdowns, FF&E specifications, 3D render pricing, material procurement, and installation fees.",
    heading: "Interior Design & FF&E Quotation Template",
    heroDescription:
      "Sophisticated layouts for interior designers, home decorators, and architects specifying custom furniture, lighting, finishes, and design consultations.",
    industryOverview:
      "Interior proposals require high visual elegance and structured organization by room (Living Room, Master Suite, Kitchen) to help clients visualize expenditure.",
    keyFields: [
      "Room-by-Room Breakdown",
      "Furniture, Fixtures & Equipment (FF&E) Allowances",
      "Design Fee vs Procurement Commission",
      "Custom Fabrication & Lead Times",
    ],
    bestPractices: [
      "Group items by space or room for clear client review",
      "Clarify whether freight and customs are included in fixture prices",
      "Include a design copyright retention clause until full payment",
    ],
    sampleItems: [
      { name: "Living Room Conceptualization & 3D Renders", description: "Spatial planning, mood boards, photorealistic 4K renders", rate: "$2,200" },
      { name: "Custom Italian Marble Coffee Table", description: "Calacatta gold marble with brushed brass pedestal base", rate: "$3,100" },
    ],
    faqs: [
      { question: "Can I add product images to the quotation table?", answer: "Yes, you can enable images for line items to showcase furniture and finishes." },
    ],
  },
  "software-development": {
    slug: "software-development",
    name: "Software & Web Development",
    templateId: "software-dev",
    title: "Software Development Quotation Template – Agile Sprints | QuoteCraft",
    metaDescription:
      "Agile software development proposal template. Quote web apps, mobile apps, API integrations, testing sprints, and cloud server provisioning.",
    heading: "Software & Web Development Quotation Template",
    heroDescription:
      "Built for dev agencies, SaaS founders, and full-stack software engineers estimating sprint backlogs, tech stacks, and cloud architectures.",
    industryOverview:
      "Software projects evolve rapidly. High-performing proposals articulate sprint goals, deployment environments, user acceptance testing (UAT), and IP ownership.",
    keyFields: [
      "Sprint Deliverables & Story Points",
      "Technology Stack & Third-party API Dependencies",
      "User Acceptance Testing (UAT) Sign-off Window",
      "IP Assignment upon Final Remittance",
    ],
    bestPractices: [
      "Specify target browsers, operating systems, and device viewports",
      "Clarify who pays for third-party subscriptions (Stripe, Twilio, AWS)",
      "Set a strict 14-day UAT review window",
    ],
    sampleItems: [
      { name: "MVP Frontend Architecture (Next.js & Tailwind)", description: "Responsive web client, state hydration, dynamic forms", rate: "$6,500" },
      { name: "REST / GraphQL Backend Microservices", description: "Node.js API, PostgreSQL database schema, JWT auth, Stripe billing", rate: "$7,200" },
    ],
    faqs: [
      { question: "Is source code ownership covered in the terms?", answer: "Yes, the template includes intellectual property transfer terms upon final payment." },
    ],
  },
  retail: {
    slug: "retail",
    name: "Retail & Wholesale",
    templateId: "retail-wholesale",
    title: "Wholesale & Retail Quotation Template | QuoteCraft",
    metaDescription:
      "High-volume wholesale quotation template with SKU codes, minimum order quantities (MOQ), tiered discounts, packaging, and freight terms.",
    heading: "Wholesale & Bulk Distribution Quotation Template",
    heroDescription:
      "Designed for distributors, wholesalers, manufacturers, and trade suppliers delivering large-volume inventory with tiered pricing structures.",
    industryOverview:
      "Wholesale commerce relies on SKU accuracy, unit measurements (cartons, pallets, gross), freight charges, and tiered volume incentives.",
    keyFields: [
      "SKU and Manufacturer Part Numbers (MPN)",
      "Minimum Order Quantity (MOQ) and Unit Sizing",
      "Volume Discount Schedules",
      "Packaging, Palletizing & Freight Surcharges",
    ],
    bestPractices: [
      "Always state lead times from warehouse receipt to carrier handover",
      "Detail shipping terms (FOB, CIF, Ex-Works)",
      "Specify return policies and restocking fee percentages",
    ],
    sampleItems: [
      { name: "Premium Ergonomic Office Chairs (SKU: CH-880)", description: "Mesh back, 4D armrests, BIFMA certified (Carton of 5)", rate: "$850/ctn" },
      { name: "Dual-Monitor Articulated Gas Arms (SKU: MN-21)", description: "Heavy-duty aluminum mount, VESA compatible", rate: "$420/ctn" },
    ],
    faqs: [
      { question: "Can I handle bulk discounts in this template?", answer: "Yes, you can configure line-level discounts or overall volume discount percentages." },
    ],
  },
  consulting: {
    slug: "consulting",
    name: "Business & Management Consulting",
    templateId: "corporate-executive",
    title: "Management Consulting Quotation Template | QuoteCraft",
    metaDescription:
      "Professional proposal and fee structure quotation template for management consultants, HR specialists, financial advisors, and corporate strategists.",
    heading: "Consulting Proposal & Fee Quotation Template",
    heroDescription:
      "Structured for independent management advisors, strategy firms, and organizational consultants proposing high-value advisory engagements.",
    industryOverview:
      "Consulting proposals succeed when they frame fees in terms of business impact, strategic deliverables, executive stakeholder workshops, and change management.",
    keyFields: [
      "Strategic Scope of Analysis",
      "Stakeholder Interview Milestones",
      "Deliverable Reports & Executive Briefings",
      "Retainer & Out-of-pocket Travel Expense Policies",
    ],
    bestPractices: [
      "Separate advisory fees from billable travel and lodging expenses",
      "Define project completion criteria objectively",
      "Include a strict non-disclosure agreement (NDA) reference",
    ],
    sampleItems: [
      { name: "Digital Transformation Strategic Assessment", description: "Current-state gap analysis, process optimization roadmap", rate: "$12,000" },
      { name: "Executive Leadership Workshop (2 Days)", description: "On-site alignment sessions with C-suite stakeholders", rate: "$5,500" },
    ],
    faqs: [
      { question: "Can I quote monthly advisory retainers?", answer: "Yes, select 'month' or 'retainer' as the unit with recurring payment terms." },
    ],
  },
};

