"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/db";
import { STARTER_TEMPLATES, getTemplateById } from "@/lib/templates/definitions";
import { QuotationDocument } from "@/components/preview/QuotationDocument";
import { useQuotationStore, createDefaultQuotation } from "@/store/quotationStore";
import {
  TemplateDesignConfig,
  TemplateCategory,
  ItemsDisplayMode,
  Quotation,
} from "@/types";
import {
  Palette,
  ArrowLeft,
  Save,
  Check,
  Eye,
  Sliders,
  Type,
  LayoutGrid,
  FileCheck,
  Sparkles,
  RefreshCw,
  Plus,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

function TemplateDesignerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const baseId = searchParams.get("base") || "modern-tech";

  const [currentTemplate, setCurrentTemplate] = useState<TemplateDesignConfig>(() => {
    const base = getTemplateById(baseId);
    return {
      ...base,
      id: editId || `custom-${Date.now()}`,
      name: editId ? base.name : `${base.name} (Custom Design)`,
      isCustom: true,
    };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(0.85);

  // Load existing template if editing
  useEffect(() => {
    if (editId) {
      db.templates.get(editId).then((found) => {
        if (found) {
          setCurrentTemplate(found);
        }
      });
    }
  }, [editId]);

  // Sample quotation for live template preview
  const sampleQuotation: Quotation = {
    ...createDefaultQuotation(),
    design: currentTemplate,
    itemsDisplayMode: currentTemplate.itemsDisplayMode || "table",
  };

  const handleSaveTemplate = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await db.templates.put({
        ...currentTemplate,
        isCustom: true,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to save template:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUseTemplate = async () => {
    await handleSaveTemplate();
    const { createNewQuotation, updateDesign } = useQuotationStore.getState();
    createNewQuotation();
    updateDesign(currentTemplate);
    router.push("/editor");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Top Designer Toolbar */}
      <div className="h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Back to Templates"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm tracking-tight">
                {currentTemplate.name}
              </span>
              <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 text-[10px] font-bold uppercase">
                {currentTemplate.category}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Custom Template Designer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <Check className="h-3.5 w-3.5" />
              Template Saved!
            </span>
          )}

          <button
            type="button"
            onClick={handleSaveTemplate}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            <Save className="h-3.5 w-3.5 text-blue-600" />
            <span>{isSaving ? "Saving..." : "Save Template"}</span>
          </button>

          <button
            type="button"
            onClick={handleUseTemplate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <span>Create Quote With This</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Designer Workspace: Split Controls and Live Preview */}
      <div className="flex-1 overflow-hidden p-2 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Controls Panel */}
          <div className="lg:col-span-5 xl:col-span-4 h-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-y-auto p-5 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span>Template Identity</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Configure basic identifiers and classification for your custom design.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Template Display Name *
                  </label>
                  <input
                    type="text"
                    value={currentTemplate.name}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Industry Category
                  </label>
                  <select
                    value={currentTemplate.category}
                    onChange={(e) =>
                      setCurrentTemplate({
                        ...currentTemplate,
                        category: e.target.value as TemplateCategory,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="corporate">Business & Corporate</option>
                    <option value="modern">Modern Professional</option>
                    <option value="minimal">Minimalist Clean</option>
                    <option value="construction">Construction & Bids</option>
                    <option value="it-services">IT & Infrastructure</option>
                    <option value="software">Software & Web Dev</option>
                    <option value="creative">Creative & Design</option>
                    <option value="freelance">Freelance Independent</option>
                    <option value="interior-design">Interior Design</option>
                    <option value="retail">Retail & Wholesale</option>
                    <option value="manufacturing">Industrial & Manufacturing</option>
                    <option value="consulting">Advisory & Consulting</option>
                    <option value="event">Event Management</option>
                    <option value="international">International Trade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Template Brief
                  </label>
                  <textarea
                    rows={2}
                    value={currentTemplate.description}
                    onChange={(e) =>
                      setCurrentTemplate({ ...currentTemplate, description: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                    placeholder="Short description for when browsing this design..."
                  />
                </div>
              </div>
            </div>

            {/* Layout Architecture */}
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-indigo-600" />
                <span>Layout & Structure</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Select banner style, presentation format, and tabular structures.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Header Banner Architecture
                  </label>
                  <select
                    value={currentTemplate.headerLayout}
                    onChange={(e) =>
                      setCurrentTemplate({
                        ...currentTemplate,
                        headerLayout: e.target.value as any,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="modern-banner">Modern Banner (Vibrant Gradient)</option>
                    <option value="bold-bar">Bold Colored Bar</option>
                    <option value="classic">Classic Corporate</option>
                    <option value="minimal">Minimal Clean Line</option>
                    <option value="split">Split Two-Tone</option>
                    <option value="clean-centered">Centered Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Items Presentation Style
                  </label>
                  <select
                    value={currentTemplate.itemsDisplayMode || "table"}
                    onChange={(e) =>
                      setCurrentTemplate({
                        ...currentTemplate,
                        itemsDisplayMode: e.target.value as ItemsDisplayMode,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="table">Multi-Column Table (Itemized)</option>
                    <option value="simple-list">2-Column Fee Schedule (Clean)</option>
                    <option value="cards">Package Deliverable Cards (Boxed)</option>
                    <option value="milestones">Milestone Phase Timeline (Stages)</option>
                    <option value="none">Lump Sum Scope (No Table)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Table Styling
                  </label>
                  <select
                    value={currentTemplate.tableLayout}
                    onChange={(e) =>
                      setCurrentTemplate({
                        ...currentTemplate,
                        tableLayout: e.target.value as any,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="clean">Clean Minimalist</option>
                    <option value="striped">Zebra Striped Rows</option>
                    <option value="accent-header">Accent Colored Header Fill</option>
                    <option value="bordered">Full Border Grid</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Paper Size
                    </label>
                    <select
                      value={currentTemplate.pageSize}
                      onChange={(e) =>
                        setCurrentTemplate({
                          ...currentTemplate,
                          pageSize: e.target.value as any,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                    >
                      <option value="A4">A4 (Standard)</option>
                      <option value="Letter">US Letter</option>
                      <option value="A5">A5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Orientation
                    </label>
                    <select
                      value={currentTemplate.orientation}
                      onChange={(e) =>
                        setCurrentTemplate({
                          ...currentTemplate,
                          orientation: e.target.value as any,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Palette className="h-4 w-4 text-purple-600" />
                <span>Color Harmony</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Define the primary, secondary, and accent colors for this document.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Primary Brand Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTemplate.primaryColor}
                      onChange={(e) =>
                        setCurrentTemplate({ ...currentTemplate, primaryColor: e.target.value })
                      }
                      className="h-8 w-12 rounded cursor-pointer border border-slate-200 bg-transparent p-0.5"
                    />
                    <span className="font-mono text-xs text-slate-500 w-16">
                      {currentTemplate.primaryColor}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Secondary Gradient Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTemplate.secondaryColor}
                      onChange={(e) =>
                        setCurrentTemplate({ ...currentTemplate, secondaryColor: e.target.value })
                      }
                      className="h-8 w-12 rounded cursor-pointer border border-slate-200 bg-transparent p-0.5"
                    />
                    <span className="font-mono text-xs text-slate-500 w-16">
                      {currentTemplate.secondaryColor}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Accent Fill Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTemplate.accentColor}
                      onChange={(e) =>
                        setCurrentTemplate({ ...currentTemplate, accentColor: e.target.value })
                      }
                      className="h-8 w-12 rounded cursor-pointer border border-slate-200 bg-transparent p-0.5"
                    />
                    <span className="font-mono text-xs text-slate-500 w-16">
                      {currentTemplate.accentColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Type className="h-4 w-4 text-emerald-600" />
                <span>Typography</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Select the font family that best matches your corporate or creative brand.
              </p>

              <div>
                <select
                  value={currentTemplate.fontFamily}
                  onChange={(e) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      fontFamily: e.target.value as any,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                >
                  <option value="Inter">Inter (Clean Modern Sans-Serif)</option>
                  <option value="Roboto">Roboto (Standard Corporate)</option>
                  <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                  <option value="Fira Code">Fira Code (Technical / Developer Mono)</option>
                  <option value="Merriweather">Merriweather (Editorial Editorial Serif)</option>
                  <option value="Lato">Lato (Balanced Neutral)</option>
                </select>
              </div>
            </div>

            {/* Security & Authentication Blocks */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-purple-600" />
                <span>Default Security Blocks</span>
              </h3>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={currentTemplate.showQrCode}
                  onChange={(e) =>
                    setCurrentTemplate({ ...currentTemplate, showQrCode: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Include Authentication QR Code</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={currentTemplate.showSignatureBlock}
                  onChange={(e) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      showSignatureBlock: e.target.checked,
                    })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Include Signatory Block</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={currentTemplate.showCompanyStamp}
                  onChange={(e) =>
                    setCurrentTemplate({
                      ...currentTemplate,
                      showCompanyStamp: e.target.checked,
                    })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Include Official Company Seal</span>
              </label>
            </div>
          </div>

          {/* Live Document Preview Panel */}
          <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 h-full flex-col bg-slate-200/70 rounded-2xl border border-slate-300/70 overflow-hidden shadow-inner">
            <div className="h-9 border-b border-slate-300/70 px-4 flex items-center justify-between text-xs text-slate-600 bg-slate-100">
              <span className="font-semibold flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                Live Template Mockup
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.1))}
                  className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-50"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="font-mono text-xs w-12 text-center">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale((z) => Math.min(1.2, z + 0.1))}
                  className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-50"
                  title="Zoom In"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setZoomScale(0.85)}
                  className="ml-1 text-[11px] underline text-slate-500 hover:text-slate-800"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 flex justify-center">
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "top center",
                }}
                className="transition-transform duration-150 ease-out"
              >
                <div className="paper-shadow rounded-lg overflow-hidden w-[800px] bg-white ring-1 ring-slate-300">
                  <QuotationDocument quotation={sampleQuotation} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TemplateDesignerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500 text-xs">
          <RefreshCw className="h-5 w-5 animate-spin text-blue-600 mr-2" />
          Loading Template Designer...
        </div>
      }
    >
      <TemplateDesignerContent />
    </Suspense>
  );
}
