import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_CONFIG, generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/config";
import {
  HelpCircle,
  FileText,
  ShieldCheck,
  Layers,
  Download,
  Sliders,
  DollarSign,
  ArrowRight,
  BookOpen,
  Bug,
  Mail,
  LifeBuoy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center & Knowledge Base | QuoteCraft",
  description:
    "Get assistance with QuoteCraft: learn how to create quotations, configure taxes, export PDFs, and customize templates.",
  openGraph: {
    title: "Help Center & FAQs | QuoteCraft",
    description: "Learn how to use QuoteCraft to design, calculate, and download professional business quotations.",
    url: `${SITE_CONFIG.domain}/help`,
  },
};

const helpFaqs = [
  {
    question: "Is QuoteCraft free to use?",
    answer: "Yes, QuoteCraft is completely free. There are no subscriptions, paywalls, or feature restrictions.",
  },
  {
    question: "Do I need to create an account or sign in?",
    answer: "No registration is required. You can start creating and downloading quotations immediately.",
  },
  {
    question: "Can I edit previously created quotations?",
    answer: "Yes, visit 'My Quotations' anytime to open, edit, duplicate, or re-download any previously created quotation.",
  },
  {
    question: "Does QuoteCraft work offline?",
    answer: "Yes. Once the web application is loaded in your browser, it runs client-side, allowing you to generate quotations and PDFs smoothly even without active internet.",
  },
  {
    question: "How do I calculate taxes like GST or VAT?",
    answer: "In the quotation editor under the 'Tax & Pricing' or 'Items' tabs, enter the tax percentage for each item, or set document-level tax modes (exclusive or inclusive).",
  },
];

export default function HelpPage() {
  const faqSchema = generateFaqSchema(helpFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Help", item: "/help" },
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

      <div className="w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3 border border-blue-200">
            <HelpCircle className="h-3.5 w-3.5" />
            Help Center & Support
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How Can We Help You?
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Find quick answers about quotation creation, financial calculation formulas,
            and document features.
          </p>
        </div>

        {/* Quick Topic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <Sliders className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Editor Modes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learn how to toggle between the guided form editor and the visual document designer.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <DollarSign className="h-6 w-6 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Tax & Financials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configure line-level taxes, document discounts, deposits, and multi-currency formats.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <Layers className="h-6 w-6 text-indigo-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Custom Styling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalize typography, color schemes, brand logos, stamps, and layout structures.
            </p>
          </div>
        </div>

        {/* FAQs Accordion/List */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Answered Inquiries</h2>
          <div className="space-y-4">
            {helpFaqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Bug Reporting Section */}
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/50 p-6 sm:p-8 shadow-xs mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                <Bug className="h-3.5 w-3.5 text-blue-600" />
                <span>Support & Bug Reporting</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Found a Bug or Need Technical Support?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you encounter any glitches, formatting discrepancies, calculation questions, or wish to suggest new features, our team is ready to help. Reach out directly via email anytime.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:nestmategroup@gmail.com?subject=QuoteCraft%20Support%20%2F%20Bug%20Report"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact nestmategroup@gmail.com</span>
                </a>
                <span className="text-xs font-mono text-slate-600 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  nestmategroup@gmail.com
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs text-xs space-y-2.5 lg:max-w-xs w-full">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <LifeBuoy className="h-4 w-4 text-blue-600" />
                <span>What to include in reports:</span>
              </div>
              <p className="text-slate-600 leading-relaxed">• Brief summary of the bug or inquiry</p>
              <p className="text-slate-600 leading-relaxed">• Browser & operating system (Chrome, Edge, etc.)</p>
              <p className="text-slate-600 leading-relaxed">• Screenshots or quotation layout details if applicable</p>
            </div>
          </div>
        </div>

        {/* Guides Link Banner */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Looking for Quotation Guides & Templates?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Explore our comprehensive commercial guides on pricing models, legal terms, and winning proposals.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition active:scale-95 shrink-0"
          >
            <BookOpen className="h-4 w-4" />
            <span>Browse Guides</span>
          </Link>
        </div>
      </div>
    </>
  );
}

