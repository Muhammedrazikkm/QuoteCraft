import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES_LIST } from "@/lib/seo/guidesData";
import { SITE_CONFIG } from "@/lib/seo/config";
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Quotation Guides, Tips & Best Practices | QuoteCraft",
  description:
    "Comprehensive guides on how to create, calculate, format, and negotiate commercial quotations, tenders, and proposals for your business.",
  openGraph: {
    title: "Business Quotation Guides & Best Practices | QuoteCraft",
    description:
      "Master the art of creating winning business quotations. Learn pricing calculations, legal terms, and formatting.",
    url: `${SITE_CONFIG.domain}/guides`,
  },
};

export default function GuidesHubPage() {
  return (
    <div className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-left max-w-3xl mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3 border border-blue-200">
          <BookOpen className="h-3.5 w-3.5" />
          Quotation Knowledge & Strategy
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Quotation Guides & Industry Best Practices
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          In-depth tutorials, legal clause frameworks, and pricing strategies to help freelancers,
          contractors, and enterprise teams quote accurately and win higher-value contracts.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES_LIST.map((article) => (
          <article
            key={article.slug}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition">
                <Link href={`/guides/${article.slug}`}>{article.title}</Link>
              </h2>

              <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{article.publishedDate}</span>
              <Link
                href={`/guides/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

