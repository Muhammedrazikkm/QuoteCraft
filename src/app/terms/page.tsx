import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/config";
import { FileCheck, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | QuoteCraft",
  description:
    "QuoteCraft terms of service: user responsibilities, local execution, compliance with tax regulations, and disclaimer of warranties.",
  openGraph: {
    title: "Terms of Service | QuoteCraft",
    description: "Read QuoteCraft terms of service and commercial document guidelines.",
    url: `${SITE_CONFIG.domain}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: January 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using QuoteCraft (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you should discontinue using the software.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Software Use & Data Responsibility</h2>
          <p>
            QuoteCraft is provided as a client-side document application. You acknowledge that you alone control the information and documents created, edited, and exported through the application.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Commercial & Legal Responsibility</h2>
          <p>
            The quotation templates, financial calculation engines, and default terms provided within QuoteCraft are intended for general commercial utility. You are solely responsible for verifying the accuracy of tax rates (such as GST, VAT, or Sales Tax), trade compliance, Incoterms, and legal terms applicable in your country of operation.
          </p>
          <p className="mt-2">
            QuoteCraft does not provide legal, accounting, or tax advice. For high-stakes contracts, consult a qualified attorney or certified accountant.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Intellectual Property</h2>
          <p>
            You retain 100% full and unencumbered ownership of all commercial content, quotation figures, customer information, trademarks, and logos created or uploaded within QuoteCraft.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">5. Disclaimer of Warranties</h2>
          <p>
            The software is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, whether express or implied. QuoteCraft disclaims all warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </section>
      </div>
    </div>
  );
}

