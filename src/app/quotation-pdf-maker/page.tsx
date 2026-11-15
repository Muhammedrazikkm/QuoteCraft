import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_CONFIG, generateFaqSchema, generateBreadcrumbSchema } from "@/lib/seo/config";
import {
  FileText,
  Download,
  Printer,
  QrCode,
  PenTool,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quotation PDF Maker – Create & Download Multi-Page PDF Quotes | QuoteCraft",
  description:
    "Generate professional multi-page PDF business quotations directly in your browser. Includes selectable text, corporate logos, signatures, QR codes, and A4/Letter formats.",
  openGraph: {
    title: "Quotation PDF Maker | QuoteCraft",
    description: "Generate high-resolution, printable multi-page PDF quotations without server upload.",
    url: `${SITE_CONFIG.domain}/quotation-pdf-maker`,
  },
};

const faqs = [
  {
    question: "Is the generated PDF high resolution for printing?",
    answer: "Yes, QuoteCraft renders at 2x/3x retina scale, ensuring crisp logos, sharp typography, and vector-grade clarity for professional printing.",
  },
  {
    question: "Does the PDF support multiple pages?",
    answer: "Yes, multi-page pagination handles long item tables, preserves table headers, and avoids clipping totals or signatures.",
  },
  {
    question: "Are signatures and QR codes included in the PDF?",
    answer: "Yes, authorized signatures, corporate stamps, and verification QR codes are rendered directly into the PDF.",
  },
];

export default function QuotationPdfMakerPage() {
  const faqSchema = generateFaqSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Quotation PDF Maker", item: "/quotation-pdf-maker" },
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 mb-4 border border-purple-200">
            <Download className="h-3.5 w-3.5" />
            Client-Side Vector & Image PDF Rendering
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Quotation PDF Maker
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Generate and download publication-ready business quotation PDFs without waiting for server queues.
            Includes multi-page pagination, embedded brand logos, dynamic QR codes, and digital signatures.
          </p>

          <div className="mt-8 flex justify-start gap-4">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition active:scale-95"
            >
              <span>Generate PDF Quotation Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Download className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Instant In-Browser Download</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No server conversion delays. The PDF is assembled right inside your browser window and saved instantly to your computer or phone.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <PenTool className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Authorized Signatures & Stamps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Incorporate executive signature lines, company stamp seals, and customized legal terms for watertight commercial enforceability.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Digital Authentication QR Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Embed dynamic QR codes encoding quotation numbers, issuer details, and total figures for fraud prevention and fast client verification.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6">PDF Generation FAQs</h2>
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

