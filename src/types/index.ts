export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "AED"
  | "SAR"
  | "QAR"
  | "CAD"
  | "AUD"
  | "SGD"
  | "JPY"
  | "CNY"
  | "ZAR"
  | "BRL"
  | "NZD"
  | string;

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  decimalPlaces: number;
  locale: string;
}

export type QuotationStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired"
  | "archived";

export interface CompanyProfile {
  id: string;
  name: string;
  logo?: string;
  tagline?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  taxRegistrationId?: string; // e.g. GSTIN, VAT, EIN
  businessRegistrationId?: string; // e.g. CIN, CR, ABN
  authorizedPerson?: string;
  authorizedPersonTitle?: string;
  signature?: string; // data URL or image path
  stamp?: string; // data URL or image path
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    routingOrIfsc: string;
    swiftOrBic?: string;
    iban?: string;
    upiId?: string;
  };
  customFields?: Record<string, string>;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  contactPerson?: string;
  billingAddress: string;
  shippingAddress?: string;
  projectAddress?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  taxId?: string;
  referenceNumber?: string;
  notes?: string;
  customFields?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationItem {
  id: string;
  name: string;
  description?: string;
  sku?: string;
  image?: string;
  quantity: number;
  unit: string; // e.g. pcs, hrs, days, sq ft, m, kg
  rate: number;
  discount: number;
  discountType: "percent" | "fixed";
  taxRate: number; // e.g. 18 for 18%
  taxType: "exclusive" | "inclusive" | "exempt";
  amount: number; // calculated line total
  groupName?: string; // for group headings e.g. "Phase 1: Materials"
}

export interface CustomFieldDefinition {
  id: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "currency"
    | "percentage"
    | "date"
    | "select"
    | "checkbox"
    | "image"
    | "url"
    | "email"
    | "phone";
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: string[]; // for select
  isRequired?: boolean;
  isVisible: boolean;
  section: "header" | "customer" | "pricing" | "footer";
  order: number;
}

export interface ReusableSection {
  id: string;
  title: string;
  content: string;
  type:
    | "payment_terms"
    | "delivery"
    | "timeline"
    | "scope"
    | "warranty"
    | "exclusions"
    | "cancellation"
    | "validity"
    | "bank_details"
    | "notes"
    | "signature"
    | "stamp"
    | "legal_disclaimer"
    | "custom";
  isVisible: boolean;
  order: number;
}

export interface AdditionalCharge {
  id: string;
  name: string;
  amount: number;
  isTaxable?: boolean;
}

export interface TaxBreakdown {
  name: string;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

export interface FinancialCalculationResult {
  subtotal: number;
  discountTotal: number;
  taxableAmount: number;
  taxBreakdown: TaxBreakdown[];
  taxTotal: number;
  additionalChargesTotal: number;
  grandTotal: number;
  depositRequired: number;
  balanceDue: number;
  amountInWords: string;
}

export type ItemsDisplayMode =
  | "table"
  | "simple-list"
  | "cards"
  | "milestones"
  | "none";

export interface TableColumnVisibility {
  itemNumber: boolean;
  sku: boolean;
  description: boolean;
  quantity: boolean;
  unit: boolean;
  unitRate: boolean;
  discount: boolean;
  tax: boolean;
  amount: boolean;
}

export interface DocumentFieldVisibility {
  // Document Meta
  quotationNumber: boolean;
  issueDate: boolean;
  expiryDate: boolean;
  projectName: boolean;
  projectReference: boolean;
  poReference: boolean;
  preparedBy: boolean;
  approvedBy: boolean;
  expectedDeliveryDate: boolean;
  currencyBadge: boolean;
  subject: boolean;
  introduction: boolean;

  // Company / Issuer
  companyLogo: boolean;
  companyTagline: boolean;
  companyAddress: boolean;
  companyEmail: boolean;
  companyPhone: boolean;
  companyWhatsapp: boolean;
  companyWebsite: boolean;
  companyTaxId: boolean;
  companyBusinessId: boolean;
  bankDetails: boolean;

  // Customer / Client
  customerCompany: boolean;
  customerContactPerson: boolean;
  customerBillingAddress: boolean;
  customerShippingAddress: boolean;
  customerEmail: boolean;
  customerPhone: boolean;
  customerTaxId: boolean;

  // Table Columns (when in table mode)
  colItemNumber: boolean;
  colSku: boolean;
  colImage: boolean;
  colDescription: boolean;
  colQuantity: boolean;
  colUnit: boolean;
  colUnitRate: boolean;
  colDiscount: boolean;
  colTaxRate: boolean;
  colAmount: boolean;

  // Summary & Totals
  subtotal: boolean;
  documentDiscount: boolean;
  taxBreakdown: boolean;
  additionalCharges: boolean;
  grandTotal: boolean;
  amountInWords: boolean;
  depositRequired: boolean;
  balanceDue: boolean;

  // Sections, Terms & Security
  termsAndConditions: boolean;
  signatureBlock: boolean;
  companyStamp: boolean;
  qrCode: boolean;
  watermark: boolean;
}

export const DEFAULT_FIELD_VISIBILITY: DocumentFieldVisibility = {
  // Document Meta
  quotationNumber: true,
  issueDate: true,
  expiryDate: true,
  projectName: true,
  projectReference: false,
  poReference: false,
  preparedBy: true,
  approvedBy: false,
  expectedDeliveryDate: false,
  currencyBadge: true,
  subject: true,
  introduction: true,

  // Company
  companyLogo: true,
  companyTagline: true,
  companyAddress: true,
  companyEmail: true,
  companyPhone: true,
  companyWhatsapp: false,
  companyWebsite: true,
  companyTaxId: true,
  companyBusinessId: false,
  bankDetails: true,

  // Customer
  customerCompany: true,
  customerContactPerson: true,
  customerBillingAddress: true,
  customerShippingAddress: false,
  customerEmail: true,
  customerPhone: true,
  customerTaxId: false,

  // Table Columns
  colItemNumber: true,
  colSku: false,
  colImage: false,
  colDescription: true,
  colQuantity: true,
  colUnit: true,
  colUnitRate: true,
  colDiscount: true,
  colTaxRate: true,
  colAmount: true,

  // Summary & Totals
  subtotal: true,
  documentDiscount: true,
  taxBreakdown: true,
  additionalCharges: true,
  grandTotal: true,
  amountInWords: true,
  depositRequired: true,
  balanceDue: true,

  // Sections & Security
  termsAndConditions: true,
  signatureBlock: true,
  companyStamp: false,
  qrCode: true,
  watermark: false,
};

export type TemplateCategory =
  | "minimal"
  | "modern"
  | "corporate"
  | "formal"
  | "creative"
  | "it-services"
  | "software"
  | "construction"
  | "interior-design"
  | "retail"
  | "manufacturing"
  | "freelance"
  | "consulting"
  | "event"
  | "international";

export interface TemplateDesignConfig {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: "Inter" | "Roboto" | "Playfair Display" | "Fira Code" | "Merriweather" | "Lato";
  headerLayout: "classic" | "modern-banner" | "split" | "minimal" | "bold-bar" | "clean-centered";
  tableLayout: "striped" | "bordered" | "clean" | "minimal-lines" | "accent-header";
  itemsDisplayMode?: ItemsDisplayMode;
  columnVisibility?: Partial<TableColumnVisibility>;
  fieldVisibility?: Partial<DocumentFieldVisibility>;
  pageSize: "A4" | "Letter" | "A5";
  orientation: "portrait" | "landscape";
  watermarkText?: string;
  showQrCode: boolean;
  showSignatureBlock: boolean;
  showCompanyStamp: boolean;
  isCustom?: boolean;
}

export interface DesignerElement {
  id: string;
  type:
    | "text"
    | "heading"
    | "paragraph"
    | "image"
    | "company_block"
    | "customer_block"
    | "metadata_block"
    | "items_table"
    | "pricing_summary"
    | "signature_block"
    | "stamp_block"
    | "qr_code"
    | "divider"
    | "box"
    | "watermark"
    | "custom_html";
  content?: string;
  bindingKey?: string; // e.g. {{company.name}}, {{grandTotal}}
  x: number; // in mm or px
  y: number;
  width: number;
  height?: number;
  page: number;
  styles: {
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: "normal" | "italic";
    textDecoration?: "none" | "underline";
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    textAlign?: "left" | "center" | "right" | "justify";
    lineHeight?: number;
    letterSpacing?: number;
    padding?: number;
    opacity?: number;
  };
  isLocked?: boolean;
  isVisible: boolean;
  zIndex: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  title: string;
  subtitle?: string;
  subject?: string;
  issueDate: string;
  expiryDate: string;
  status: QuotationStatus;
  
  // Snapshots of company and customer so historical quotation never alters
  company: CompanyProfile;
  customer: Customer;

  // Metadata
  projectName?: string;
  projectReference?: string;
  poReference?: string;
  preparedBy?: string;
  approvedBy?: string;
  expectedDeliveryDate?: string;
  currency: CurrencyCode;
  documentLanguage: string;
  introduction?: string;
  
  // Items & groupings
  items: QuotationItem[];
  itemsDisplayMode?: ItemsDisplayMode;
  columnVisibility?: Partial<TableColumnVisibility>;
  fieldVisibility?: Partial<DocumentFieldVisibility>;
  lumpSumAmount?: number;
  customColumns?: Array<{ id: string; label: string; visible: boolean; width?: string }>;

  // Financial options
  documentDiscount: number;
  documentDiscountType: "percent" | "fixed";
  taxType: "exclusive" | "inclusive"; // overall document tax mode
  additionalCharges: AdditionalCharge[];
  depositAmount: number;
  depositType: "percent" | "fixed";

  // Terms and conditions
  sections: ReusableSection[];

  // Custom fields
  customFields: Record<string, string | number | boolean>;

  // Design config
  templateId: string;
  design: TemplateDesignConfig;

  // Advanced Visual Designer elements (optional hybrid layout)
  designerElements?: DesignerElement[];
  isAdvancedLayout?: boolean;

  // Signatures & Stamp
  clientSignature?: string;
  authorizedSignature?: string;
  companyStamp?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
  revision: number;
}

