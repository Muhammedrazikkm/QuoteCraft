import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/config";
import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | QuoteCraft",
  description:
    "QuoteCraft's privacy policy. Learn about confidentiality, user rights, data protection, and document export standards.",
  openGraph: {
    title: "Privacy Policy | QuoteCraft",
    description: "Learn how QuoteCraft protects your business confidentiality and document privacy.",
    url: `${SITE_CONFIG.domain}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: January 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Lock className="h-4 w-4 text-blue-600" />
            <span>Commercial Confidentiality</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            QuoteCraft is committed to protecting the confidentiality of your commercial documents. Your quotations, client lists, line-item pricing, and company information remain entirely under your personal control.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Data Ownership & Protection</h2>
          <p>
            You retain 100% complete ownership of all quotation data, customer contact details, item catalogs, and branding assets you enter into the application. We do not sell, rent, license, or share your commercial information with any external parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Document & PDF Generation</h2>
          <p>
            When you generate and download a quotation in PDF format or send it to print, the document is assembled and produced directly on your computer or device. Your financial figures, customer names, and addresses are processed strictly to render your requested document.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Data Portability</h2>
          <p>
            You have complete freedom to export your quotations and download client-ready PDFs at any time without restrictions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Analytics & Cookies</h2>
          <p>
            QuoteCraft does not use third-party advertising cookies or track personal user behavior. Any website analytics are strictly aggregated and anonymous to monitor basic page performance and availability.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">5. Inquiries & Support</h2>
          <p>
            If you have questions regarding this privacy policy or our document creation platform, please visit our{" "}
            <Link href="/help" className="text-blue-600 underline">
              Help Center
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
