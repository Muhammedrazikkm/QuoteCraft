import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates/definitions";
import { SITE_CONFIG, generateFaqSchema } from "@/lib/seo/config";
import {
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calculator,
  Download,
  FolderArchive,
  Palette,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Users,
  Layers,
  Clock,
  Printer,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Quotation Maker – Create Professional PDF Quotes | QuoteCraft",
  description:
    "Create professional business quotations online for free. Customize templates, add products and taxes, design your quotation, and download PDF without registration.",
  openGraph: {
    title: "Free Online Quotation Maker | QuoteCraft",
    description:
      "Design, customize and download beautiful business quotations without complicated software. 100% free, local-first, no account required.",
    url: SITE_CONFIG.domain,
  },
};

const homeFaqs = [
  {
    question: "Is QuoteCraft free to use?",
    answer: "Yes, QuoteCraft is completely free with no hidden charges, mandatory subscriptions, or feature locks.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You never have to create an account, enter an email, or sign in. You can start creating quotations immediately.",
  },
  {
    question: "Can I edit quotations later?",
    answer: "Yes! Every quotation is automatically saved in your workspace. You can revisit 'My Quotations' anytime to update, duplicate, or re-download.",
  },
  {
    question: "Can I download PDFs?",
    answer: "Yes. QuoteCraft includes a high-definition in-browser PDF engine that outputs multi-page, publication-ready PDF documents.",
  },
  {
    question: "Can I create custom designs?",
    answer: "Yes. You can customize colors, fonts, header styles, table layouts, add watermarks, and switch between the Simple Form Editor and the Advanced Visual Designer.",
  },
  {
    question: "Can I use different currencies?",
    answer: "Yes. QuoteCraft supports all major ISO currencies, including USD, INR, EUR, GBP, AED, SAR, QAR, CAD, AUD, and SGD with accurate locale-aware formatting.",
  },
  {
    question: "Does it work offline?",
    answer: "Yes. QuoteCraft is designed as an offline-capable Progressive Web Application. Once loaded, all calculations and PDF generations execute directly on your device.",
  },
];

export default function HomePage() {
  const faqSchema = generateFaqSchema(homeFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-indigo-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Copy */}
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-6 border border-blue-200">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Free • No Account Required • Instant Download</span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.1]">
                  Free Online{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Quotation Maker
                  </span>
                  <span className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-bold block mt-3">
                    Create Professional PDF Quotes in Minutes
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Design, customize and download beautiful business quotations without complicated software.
                  Equipped with Decimal.js automated tax calculations, 14+ starter templates, and multi-page PDF generation.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-start gap-4">
                  <Link
                    href="/editor"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition active:scale-95"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span>Create New Quotation</span>
                  </Link>

                  <Link
                    href="/my-quotations"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <FolderArchive className="h-5 w-5 text-slate-500" />
                    <span>My Quotations</span>
                  </Link>
                </div>

                {/* Sublink */}
                <div className="mt-4">
                  <Link
                    href="/templates"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>Or explore 14+ ready-made templates</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Highlights pill row */}
                <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                  <div>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">100%</span>
                    <span className="text-xs text-slate-500 font-medium">Free Forever</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">14+</span>
                    <span className="text-xs text-slate-500 font-medium">Curated Templates</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-slate-900 font-mono">0 sec</span>
                    <span className="text-xs text-slate-500 font-medium">No Sign-up Delay</span>
                  </div>
                </div>
              </div>

              {/* Hero Live Mockup Preview Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition hover:shadow-blue-500/10">
                  {/* Decorative badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        QC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Apex Solutions Ltd.</div>
                        <div className="text-[10px] text-slate-400">QT-2026-804 • Valid 30 Days</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-200">
                      Approved Quote
                    </span>
                  </div>

                  {/* Sample items table snippet */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between font-semibold text-slate-500 border-b border-slate-100 pb-1.5 text-[11px]">
                      <span>Deliverable</span>
                      <span>Total</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <div>
                        <p className="font-semibold text-slate-900">Cloud Web Architecture</p>
                        <p className="text-[10px] text-slate-400">Design system & Next.js</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900">$3,500.00</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <div>
                        <p className="font-semibold text-slate-900">Full-Stack Implementation</p>
                        <p className="text-[10px] text-slate-400">80 hours @ $85/hr</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900">$6,460.00</span>
                    </div>
                  </div>

                  {/* Totals snippet */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal:</span>
                      <span className="font-mono">$9,960.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Tax (10%):</span>
                      <span className="font-mono">$996.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-blue-600 pt-1 border-t border-slate-200">
                      <span>Grand Total:</span>
                      <span className="font-mono text-base">$10,956.00</span>
                    </div>
                  </div>

                  {/* Mock CTA inside card */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[10px] text-slate-400 italic">
                      Amount in words: Ten Thousand...
                    </div>
                    <Link
                      href="/editor"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Try Interactive Editor</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section className="py-20 bg-white border-y border-slate-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-3xl mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                Engineered for Modern Business
              </h2>
              <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Everything You Need to Issue Winning Quotes
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                QuoteCraft removes the frustration of broken spreadsheet formulas and complicated design tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">No Account Required</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start creating instantly. No email verification, passwords, or credit card forms standing in your way.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Automatic Math Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Precise Decimal.js financial calculations: quantity × rates, item discounts, compound taxes, and advance deposits.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Palette className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">14+ Tested Templates</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tailored designs for IT services, construction bids, freelance proposals, consulting, retail, and corporate commerce.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Multi-Page PDF Export</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download crisp, multi-page vector and image PDFs with selectable text, clean table page breaks, and embedded signatures.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Customer & Item Library</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Save reusable client profiles and product catalog lines to auto-populate quotes with a single click.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition hover:border-slate-200 hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Offline Capability</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Draft proposals and generate PDFs even when disconnected from the internet or on low-bandwidth field sites.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TEMPLATE SHOWCASE SECTION */}
        <section className="py-20 bg-slate-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Ready-Made Templates
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-1">
                  Built for Every Industry
                </h2>
              </div>
              <Link
                href="/templates"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                <span>View all 14 templates</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STARTER_TEMPLATES.slice(0, 6).map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div
                    className="h-28 -mx-5 -mt-5 mb-4 p-4 flex flex-col justify-between rounded-t-2xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${t.primaryColor} 0%, ${t.secondaryColor} 100%)`,
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold opacity-80">
                      {t.category}
                    </span>
                    <h3 className="font-bold text-base leading-tight">{t.name}</h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {t.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {t.fontFamily} Font
                    </span>
                    <Link
                      href={`/editor?template=${t.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <span>Use Template</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-3xl mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                Simple Workflow
              </h2>
              <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                How to Create a Quotation in 6 Steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Choose a Template", desc: "Select a curated starter design or start from a clean canvas." },
                { step: "2", title: "Add Company & Customer", desc: "Input your business identity and client billing address coordinates." },
                { step: "3", title: "Add Products & Services", desc: "List deliverables, quantities, rates, and assign grouping headers." },
                { step: "4", title: "Configure Taxes & Terms", desc: "Set GST/VAT percentages, document discounts, and payment terms." },
                { step: "5", title: "Preview Live in Real Time", desc: "Inspect multi-page layout, styling, watermarks, and verification QR." },
                { step: "6", title: "Download Professional PDF", desc: "Export publication-quality PDF ready to email to your prospect." },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm mb-3">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Common Questions
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-1">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Helpful details about QuoteCraft&apos;s features, calculations, and PDF generation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homeFaqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="w-full px-4 text-left sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start Creating Your Quotation Now
            </h2>
            <p className="mt-3 text-base text-blue-100 max-w-xl">
              No account, no fees, no delays. Create your proposal and download a client-ready PDF in minutes.
            </p>
            <div className="mt-8 flex justify-start gap-4">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg hover:bg-blue-50 transition active:scale-95"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create New Quotation</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

