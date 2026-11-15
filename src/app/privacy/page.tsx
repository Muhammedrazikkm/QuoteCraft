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
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Third-Party Advertising & Cookies (Google AdSense)</h2>
          <p className="leading-relaxed">
            We use third-party advertising companies, including Google AdSense, to serve advertisements when you visit our website. These companies may use cookies, web beacons, and related tracking technologies to collect non-personally identifiable information about your visits to this and other websites in order to provide targeted advertisements about goods and services of interest to you.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-600">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites on the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites across the web.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google Ads Settings
              </a>{" "}
              or by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                www.aboutads.info
              </a>
              .
            </li>
          </ul>
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
