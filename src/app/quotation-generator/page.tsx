import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_CONFIG, generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/config";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Layers,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online Quotation Generator – Automated Pricing & Tax Engine | QuoteCraft",
  description:
    "Generate business quotations and commercial estimates with automated formulas. Supports multiple currencies, compound taxes (GST, VAT), item groups, and instant PDF download.",
  openGraph: {
    title: "Online Quotation Generator | QuoteCraft",
    description: "Generate professional business quotations and calculate taxes, discounts, and milestones instantly.",
    url: `${SITE_CONFIG.domain}/quotation-generator`,
  },
};

const faqs = [
  {
    question: "Can I quote in different currencies such as INR, USD, EUR, or AED?",
    answer: "Yes, QuoteCraft supports all ISO 4217 currencies with correct localized decimal places and currency symbols.",
  },
  {
    question: "How does the generator calculate taxes?",
    answer: "You can specify line-level tax percentages, select tax-inclusive or tax-exclusive modes, and view detailed tax breakdowns.",
  },
  {
    question: "Can I group items into project phases?",
    answer: "Yes, line items can be grouped into phases or deliverables with automated subheadings.",
  },
];

export default function QuotationGeneratorPage() {
  const faqSchema = generateFaqSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Quotation Generator", item: "/quotation-generator" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-left max-w-3xl mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 mb-4 border border-indigo-200">
            <Calculator className="h-3.5 w-3.5" />
            Dynamic Multi-Currency Calculation Engine
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Online Quotation Generator
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Eliminate spreadsheet errors. Automatically compute item rates, percentage discounts,
            compound taxes, advance deposits, and balances due with Decimal.js precision.
          </p>

          <div className="mt-8 flex justify-start gap-4">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition active:scale-95"
            >
              <span>Launch Quotation Generator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Automated Tax Breakdown</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supports single and multiple taxes, tax inclusive / exclusive modes, and formats appropriate for GST, VAT, and Sales Tax jurisdictions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Amount in Words Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatically renders grand totals into formal commercial prose in both International (Millions/Billions) and Indian (Lakhs/Crores) formats.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Deposit & Balance Due</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Define mobilization advances (e.g. 50% deposit) and calculate remaining balances payable upon project handover.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span>Quotation Generator Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

