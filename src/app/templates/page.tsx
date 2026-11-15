"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STARTER_TEMPLATES } from "@/lib/templates/definitions";
import { TemplateCategory } from "@/types";
import {
  LayoutTemplate,
  Search,
  Filter,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  FileCheck,
} from "lucide-react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "business", label: "Business & Corporate" },
    { id: "construction", label: "Construction & Bids" },
    { id: "it-services", label: "IT & Infrastructure" },
    { id: "software", label: "Software & Web Dev" },
    { id: "freelance", label: "Freelance & Creative" },
    { id: "interior-design", label: "Interior Design" },
    { id: "retail", label: "Retail & Wholesale" },
    { id: "manufacturing", label: "Industrial & Mfg" },
    { id: "event", label: "Event Management" },
    { id: "international", label: "International Trade" },
  ];

  const filteredTemplates = STARTER_TEMPLATES.filter((template) => {
    const matchCategory =
      selectedCategory === "all" ||
      template.category === selectedCategory ||
      (selectedCategory === "business" &&
        (template.category === "corporate" ||
          template.category === "formal" ||
          template.category === "consulting"));

    const matchSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Heading */}
      <div className="text-left max-w-3xl mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3 border border-blue-200">
          <Sparkles className="h-3.5 w-3.5" />
          14+ Industry-Tested Design Templates
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Professional Quotation Templates
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Select from beautifully engineered quotation designs crafted for corporate procurement,
          creative studios, technical contractors, and global commerce. Every template is 100% customizable.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === c.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-lg transition overflow-hidden"
          >
            {/* Visual Header Mockup */}
            <div
              className="h-32 -mx-5 -mt-5 mb-4 p-4 flex flex-col justify-between rounded-t-2xl text-white transition-transform group-hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${template.primaryColor} 0%, ${template.secondaryColor} 100%)`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider font-semibold opacity-90">
                  {template.category}
                </span>
                <span className="rounded bg-white/20 backdrop-blur px-2 py-0.5 text-[10px] font-bold">
                  {template.pageSize}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">{template.name}</h4>
                <p className="text-[11px] opacity-80">{template.fontFamily} Typography</p>
              </div>
            </div>

            {/* Template Details */}
            <div className="flex-1">
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {template.description}
              </p>

              <div className="space-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>Header Architecture:</span>
                  <span className="font-medium text-slate-700 capitalize">
                    {template.headerLayout.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Table Structure:</span>
                  <span className="font-medium text-slate-700 capitalize">
                    {template.tableLayout.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Color Harmony:</span>
                  <div className="flex items-center gap-1">
                    <span
                      className="h-3 w-3 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: template.primaryColor }}
                    />
                    <span
                      className="h-3 w-3 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: template.secondaryColor }}
                    />
                    <span
                      className="h-3 w-3 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: template.accentColor }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={`/editor?template=${template.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
              >
                <span>Use This Template</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

