import Dexie, { Table } from "dexie";
import {
  Quotation,
  TemplateDesignConfig,
  CompanyProfile,
  Customer,
  QuotationItem,
  CustomFieldDefinition,
} from "@/types";

export interface AppSetting {
  key: string;
  value: any;
}

export class QuoteCraftDatabase extends Dexie {
  quotations!: Table<Quotation, string>;
  templates!: Table<TemplateDesignConfig, string>;
  companies!: Table<CompanyProfile, string>;
  customers!: Table<Customer, string>;
  items!: Table<QuotationItem, string>;
  customFields!: Table<CustomFieldDefinition, string>;
  settings!: Table<AppSetting, string>;

  constructor() {
    super("QuoteCraftDB");
    this.version(1).stores({
      quotations:
        "id, quotationNumber, status, issueDate, expiryDate, 'customer.name', 'company.name', createdAt, updatedAt",
      templates: "id, name, category, isCustom, createdAt",
      companies: "id, name, isDefault, createdAt, updatedAt",
      customers: "id, name, company, email, phone, createdAt, updatedAt",
      items: "id, name, sku, unit, rate, groupName, createdAt",
      customFields: "id, section, order",
      settings: "key",
    });
  }
}

export const db = new QuoteCraftDatabase();

// Default Company Seed
export const DEFAULT_COMPANY: CompanyProfile = {
  id: "company-default",
  name: "Apex Solutions & Technologies Ltd.",
  tagline: "Innovative Engineering & Digital Enterprise Services",
  address: "42 Business Bay Avenue, Suite 800",
  city: "San Francisco",
  state: "California",
  postalCode: "94107",
  country: "United States",
  email: "sales@apexsolutions.example",
  phone: "+1 (555) 234-5678",
  whatsapp: "+1 (555) 234-5678",
  website: "https://apexsolutions.example",
  taxRegistrationId: "US-EIN-98-7654321",
  businessRegistrationId: "LLC-2024-CA-0091",
  authorizedPerson: "David Miller",
  authorizedPersonTitle: "Managing Director",
  bankDetails: {
    bankName: "Silicon Valley Commerce Bank",
    accountHolder: "Apex Solutions & Technologies Ltd.",
    accountNumber: "987654321098",
    routingOrIfsc: "021000021",
    swiftOrBic: "SVCBUS6S",
    iban: "US98SVCB021000021987654321098",
    upiId: "apexsolutions@upi",
  },
  isDefault: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Default Customer Seed
export const DEFAULT_CUSTOMER: Customer = {
  id: "cust-default",
  name: "user",
  company: "Starlight Media & Innovations",
  contactPerson: "User (Procurement Head)",
  billingAddress: "742 Evergreen Terrace, Floor 4",
  shippingAddress: "742 Evergreen Terrace, Logistics Bay 2",
  city: "Austin",
  state: "Texas",
  postalCode: "78701",
  country: "United States",
  email: "user.j@starlightmedia.example",
  phone: "+1 (555) 876-5432",
  taxId: "TX-ST-99182",
  referenceNumber: "PO-REQ-2026-90",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Default Sample Items
export const DEFAULT_SAMPLE_ITEMS: QuotationItem[] = [
  {
    id: "item-1",
    name: "Enterprise Web Application Architecture & UI/UX",
    description:
      "Full responsive web platform design, design system tokens, interactive Figma prototypes, and component design.",
    sku: "DEV-UIUX-01",
    quantity: 1,
    unit: "package",
    rate: 3500,
    discount: 0,
    discountType: "percent",
    taxRate: 10,
    taxType: "exclusive",
    amount: 3500,
    groupName: "Phase 1: Discovery & Design",
  },
  {
    id: "item-2",
    name: "Full-Stack Next.js & TypeScript Cloud Engineering",
    description:
      "Core application engineering, state management, indexed caching, high-performance static pages, and clean API connectors.",
    sku: "DEV-ENG-02",
    quantity: 80,
    unit: "hrs",
    rate: 85,
    discount: 5,
    discountType: "percent",
    taxRate: 10,
    taxType: "exclusive",
    amount: 6460,
    groupName: "Phase 2: Development & Implementation",
  },
  {
    id: "item-3",
    name: "Quality Assurance, Security Review & Performance Audit",
    description:
      "Cross-browser automated verification, Lighthouse 95+ Core Web Vitals optimization, accessibility audit (WCAG AA).",
    sku: "QA-PERF-03",
    quantity: 20,
    unit: "hrs",
    rate: 75,
    discount: 0,
    discountType: "fixed",
    taxRate: 10,
    taxType: "exclusive",
    amount: 1500,
    groupName: "Phase 3: QA & Testing",
  },
  {
    id: "item-4",
    name: "12-Month Dedicated SLA Maintenance & Priority Support",
    description:
      "Monthly security patching, backup verification, uptime monitoring, and priority technical assistance.",
    sku: "SUP-SLA-12M",
    quantity: 1,
    unit: "yr",
    rate: 1200,
    discount: 200,
    discountType: "fixed",
    taxRate: 10,
    taxType: "exclusive",
    amount: 1000,
    groupName: "Phase 4: Support & Maintenance",
  },
];

