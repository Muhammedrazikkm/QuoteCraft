import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEMPLATE_CATEGORIES_DATA } from "@/lib/seo/categoriesData";
import { generateFaqSchema, generateBreadcrumbSchema, SITE_CONFIG } from "@/lib/seo/config";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  HelpCircle,
  Briefcase,
  Layers,
} from "lucide-react";

interface Props {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return Object.keys(TEMPLATE_CATEGORIES_DATA).map((slug) => ({
    category: slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const data = TEMPLATE_CATEGORIES_DATA[params.category];
  if (!data) return {};

  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `${SITE_CONFIG.domain}/templates/${data.slug}`,
    },
  };
}

export default function CategoryTemplatePage({ params }: Props) {
  const data = TEMPLATE_CATEGORIES_DATA[params.category];
  if (!data) {
    notFound();
  }

  const faqSchema = generateFaqSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Templates", item: "/templates" },
    { name: data.name, item: `/templates/${data.slug}` },
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

      <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/templates" className="hover:text-blue-600 transition">
            Templates
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">{data.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4 border border-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Specialized Industry Template
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {data.heading}
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {data.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/editor?template=${data.templateId}`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
              >
                <span>Customize This Quotation Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                <span>Instant PDF • No Account Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Overview & Key Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>Industry Scope & Purpose</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {data.industryOverview}
            </p>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Essential Fields Included
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {data.keyFields.map((field, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-600" />
              <span>Professional Quoting Best Practices</span>
            </h2>
            <ul className="space-y-3 text-sm text-slate-600 mb-6">
              {data.bestPractices.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Sample Deliverables & Rates
            </h3>
            <div className="space-y-2">
              {data.sampleItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center rounded-lg bg-slate-50 p-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-slate-500">{item.description}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

