import { ReusableSection } from "@/types";

export const DEFAULT_TERMS_AND_SECTIONS: ReusableSection[] = [
  {
    id: "sec-validity",
    title: "Quotation Validity",
    content:
      "This quotation is valid for 30 calendar days from the date of issue. Prices quoted herein reflect current material and labor market rates and may be adjusted thereafter.",
    type: "validity",
    isVisible: true,
    order: 1,
  },
  {
    id: "sec-payment-terms",
    title: "Payment Milestones & Terms",
    content:
      "A 50% mobilization advance is required prior to project kickoff. 30% is payable upon milestone approval, and the remaining 20% balance is due upon final project handover. Invoices are payable net 15 days.",
    type: "payment_terms",
    isVisible: true,
    order: 2,
  },
  {
    id: "sec-delivery-scope",
    title: "Delivery Timeline & Scope",
    content:
      "All services and deliverables specified in this document will be completed in strict accordance with the agreed schedule. Any client-initiated changes to scope or deliverables will be scoped via a formal Change Order.",
    type: "scope",
    isVisible: true,
    order: 3,
  },
  {
    id: "sec-warranty",
    title: "Warranty & Quality Assurance",
    content:
      "We guarantee that all work and deliverables shall be free from defects and conform to professional industry standards for 90 days following final sign-off.",
    type: "warranty",
    isVisible: true,
    order: 4,
  },
  {
    id: "sec-bank",
    title: "Bank Remittance Details",
    content:
      "Direct bank wire or EFT transfers are accepted. Please reference the Quotation Number on all payment remittances to ensure prompt reconciliation.",
    type: "bank_details",
    isVisible: true,
    order: 5,
  },
  {
    id: "sec-legal",
    title: "Confidentiality & Proprietary Rights",
    content:
      "This document and any technical proposals attached hereto contain proprietary commercial information intended exclusively for the named recipient.",
    type: "legal_disclaimer",
    isVisible: false,
    order: 6,
  },
];

