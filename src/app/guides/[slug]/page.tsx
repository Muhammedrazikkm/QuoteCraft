import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES_LIST, GuideArticle } from "@/lib/seo/guidesData";
import { generateFaqSchema, generateBreadcrumbSchema, SITE_CONFIG } from "@/lib/seo/config";
import { AdBanner } from "@/components/ads/AdBanner";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  Share2,
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return GUIDES_LIST.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = GUIDES_LIST.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${SITE_CONFIG.domain}/guides/${article.slug}`,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default function GuideArticlePage({ params }: Props) {
  const article = GUIDES_LIST.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const faqSchema = generateFaqSchema(article.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Guides", item: "/guides" },
    { name: article.title, item: `/guides/${article.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-blue-600 transition">
            Guides
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-base text-slate-600 leading-relaxed font-medium">
            {article.summary}
          </p>
        </header>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
          <div className="whitespace-pre-line leading-relaxed">{article.content}</div>
        </div>

        {/* ADVERTISEMENT SLOT 4: In-Article Responsive Banner */}
        <div className="my-8 no-print">
          <AdBanner slotId="guide-in-article" format="horizontal" />
        </div>

        {/* Call to Action Banner */}
        <div className="my-12 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Ready to Put These Principles into Practice?
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md">
              Create an accurate quotation in minutes using QuoteCraft&apos;s automated financial engine and 14+ starter templates.
            </p>
          </div>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95 shrink-0"
          >
            <span>Launch Quotation Maker</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* FAQs Section */}
        {article.faqs.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span>Related Frequently Asked Questions</span>
            </h3>
            <div className="space-y-4">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

