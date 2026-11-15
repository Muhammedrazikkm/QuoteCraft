import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_CONFIG, generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/config";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HardDrive,
  Download,
  Percent,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Quotation Maker Online – Create PDF Quotes Without Login | QuoteCraft",
  description:
    "Free online quotation maker. Design professional business quotations, calculate taxes and discounts automatically, and export multi-page PDFs with zero account sign-up.",
  openGraph: {
    title: "Free Online Quotation Maker | QuoteCraft",
    description: "Create professional business quotations for free. No credit card or registration required.",
    url: `${SITE_CONFIG.domain}/free-quotation-maker`,
  },
};

const faqs = [
  {
    question: "Is QuoteCraft really 100% free?",
    answer: "Yes, QuoteCraft is completely free to use. There are no paywalls, hidden subscription charges, or watermarked downloads.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer: "No. You can immediately open the editor, design your quotation, and download the PDF without signing up or providing an email.",
  },
  {
    question: "Can I download quotes in PDF format?",
    answer: "Yes. You can export high-resolution, multi-page PDF quotations with verification QR codes and company logos directly.",
  },
];

export default function FreeQuotationMakerPage() {
  const faqSchema = generateFaqSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Free Quotation Maker", item: "/free-quotation-maker" },
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4 border border-blue-200">
            <Sparkles className="h-3.5 w-3.5" />
            100% Free • No Subscription • No Login
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Free Online Quotation Maker
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Create, customize, and download client-ready business quotations in under 3 minutes.
            Equipped with multi-currency math, automatic taxes, and high-resolution PDF generation.
          </p>

          <div className="mt-8 flex justify-start gap-4">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition active:scale-95"
            >
              <span>Create Free Quotation Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Zero Sign-Up Required</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Start creating quotations instantly. We respect your time and confidentiality—no password, credit card, or personal registration needed.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Automated Precision Math</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Powered by decimal.js to eliminate rounding flaws. Effortlessly handles line-item discounts, GST/VAT breakdowns, and deposits.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Download className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Instant PDF Generation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate publication-grade PDF proposals with clean layout breaks, verification QR codes, and digital signatures.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
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

