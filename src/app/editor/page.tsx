"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuotationStore } from "@/store/quotationStore";
import { SimpleEditor } from "@/components/editor/SimpleEditor";
import { AdvancedDesigner } from "@/components/designer/AdvancedDesigner";
import { QuotationDocument } from "@/components/preview/QuotationDocument";
import { exportElementToPdf, printDocument } from "@/lib/pdf/generator";
import { exportSingleQuotation } from "@/lib/backup";
import {
  Download,
  Printer,
  Undo2,
  Redo2,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Eye,
  Sliders,
  FileCode,
  Share2,
  ArrowLeft,
  Sparkles,
  Bug,
} from "lucide-react";
import Link from "next/link";

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const quotationId = searchParams.get("id");
  const templateParam = searchParams.get("template");

  const {
    currentQuotation,
    loadQuotation,
    createNewQuotation,
    saveCurrentQuotation,
    isSaving,
    isSaved,
    saveError,
    activeMode,
    setMode,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useQuotationStore();

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const printableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quotationId) {
      loadQuotation(quotationId);
    } else if (templateParam) {
      createNewQuotation(templateParam);
    } else if (currentQuotation.id === "quo-seed-001") {
      createNewQuotation("modern-tech");
    }
  }, [quotationId, templateParam]);

  const handleDownloadPdf = async () => {
    const printableElement =
      (document.getElementById("quotation-printable-canvas")?.offsetWidth ? document.getElementById("quotation-printable-canvas") : null) ||
      document.getElementById("quotation-export-canvas") ||
      document.getElementById("quotation-printable-canvas");

    if (!printableElement) {
      alert("Quotation preview element could not be found. Opening browser print dialog to save as PDF.");
      printDocument();
      return;
    }

    try {
      setIsExportingPdf(true);
      await exportElementToPdf(printableElement, {
        filename: `${currentQuotation.quotationNumber || "quotation"}.pdf`,
        pageSize: currentQuotation.design.pageSize,
        orientation: currentQuotation.design.orientation,
        quality: 2,
      });
    } catch (err: any) {
      console.error("PDF generation failed:", err);
      // Graceful fallback to browser print dialog which has built-in 'Save as PDF'
      alert("Direct PDF download encountered a browser rendering restriction. Opening the browser print dialog so you can choose 'Save as PDF'.");
      printDocument();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Top Application Toolbar */}
      <div className="no-print h-14 border-b border-slate-200 bg-white px-2.5 sm:px-4 flex items-center justify-between shrink-0 shadow-xs z-20">
        {/* Left: Back & Title & Autosave status */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href="/my-quotations"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition shrink-0"
            title="Back to My Quotations"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight font-mono whitespace-nowrap"
                suppressHydrationWarning
              >
                {currentQuotation.quotationNumber}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">|</span>
              <span className="text-xs text-slate-600 font-medium truncate max-w-[150px] sm:max-w-[200px] hidden sm:inline">
                {currentQuotation.customer.name || "Untitled Proposal"}
              </span>
            </div>
            {/* Save Status Badge */}
            <div className="flex items-center gap-1 text-[10px] font-medium -mt-0.5 whitespace-nowrap">
              {isSaving ? (
                <span className="flex items-center gap-1 text-amber-600">
                  <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                  <span className="sm:hidden">Saving</span>
                </span>
              ) : isSaved ? (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  <span className="hidden sm:inline">All changes saved</span>
                  <span className="sm:hidden">Saved</span>
                </span>
              ) : saveError ? (
                <span className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="h-2.5 w-2.5" />
                  <span>Error</span>
                </span>
              ) : (
                <span className="text-slate-400">Unsaved</span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher & History */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Undo / Redo */}
          <div className="hidden md:flex items-center gap-0.5 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo()}
              className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Undo change"
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo()}
              className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Redo change"
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Simple vs Advanced mode toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("simple")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition ${
                activeMode === "simple"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Simple Form"
            >
              <Sliders className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Simple Form</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("advanced")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition ${
                activeMode === "advanced"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Visual Designer"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
              <span className="hidden sm:inline">Visual Designer</span>
            </button>
          </div>
        </div>

        {/* Right: Actions (Print, Export, Support, PDF Download) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="mailto:nestmategroup@gmail.com?subject=QuoteCraft%20Editor%20Support%20%2F%20Bug%20Report"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
            title="Report a Bug or Contact Support (nestmategroup@gmail.com)"
          >
            <Bug className="h-3.5 w-3.5 text-rose-500" />
            <span>Support / Bug</span>
          </a>

          <button
            type="button"
            onClick={printDocument}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
            title="Browser Print"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-blue-600 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 whitespace-nowrap"
          >
            {isExportingPdf ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">Generating...</span>
                <span className="sm:hidden">PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile View Toggle (Edit Form vs Document Preview) on screens < lg */}
      {activeMode === "simple" && (
        <div className="lg:hidden no-print px-2.5 pt-2 pb-0.5 shrink-0">
          <div className="flex bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMobileTab("edit")}
              className={`flex-1 py-1.5 text-center rounded-lg transition flex items-center justify-center gap-1.5 ${
                mobileTab === "edit"
                  ? "bg-white text-blue-600 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Edit Form</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-1.5 text-center rounded-lg transition flex items-center justify-center gap-1.5 ${
                mobileTab === "preview"
                  ? "bg-white text-blue-600 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-blue-600" />
              <span>Document Preview</span>
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex-1 overflow-hidden p-2 sm:p-4">
        {activeMode === "advanced" ? (
          <AdvancedDesigner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/* Form Editor Panel */}
            <div
              className={`no-print lg:col-span-6 xl:col-span-6 h-full overflow-hidden ${
                mobileTab === "preview" ? "hidden lg:block" : "block"
              }`}
            >
              <SimpleEditor />
            </div>

            {/* Live Interactive Preview Canvas */}
            <div
              className={`lg:col-span-6 xl:col-span-6 h-full flex flex-col bg-slate-200/70 rounded-2xl border border-slate-300/70 overflow-hidden shadow-inner ${
                mobileTab === "preview" ? "flex" : "hidden lg:flex"
              }`}
            >
              <div className="no-print h-9 border-b border-slate-300/70 px-4 flex items-center justify-between text-xs text-slate-500 bg-slate-100 shrink-0">
                <span className="font-semibold flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-blue-600" />
                  Live Document Preview
                </span>
                <span className="text-[11px] font-mono">
                  {currentQuotation.design.pageSize} • {currentQuotation.currency}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex justify-center">
                <div className="paper-shadow rounded-lg overflow-hidden w-full max-w-[800px] bg-white h-fit ring-1 ring-slate-300">
                  <QuotationDocument quotation={currentQuotation} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guaranteed offscreen printable source for all screen resolutions & mobile */}
      <div
        id="offscreen-pdf-source"
        className="no-print fixed top-0 left-0 -z-50 pointer-events-none overflow-hidden"
        style={{ width: "800px", height: "0px", opacity: 0.01 }}
        aria-hidden="true"
      >
        <QuotationDocument quotation={currentQuotation} id="quotation-export-canvas" />
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-600 mr-2" />
          Loading QuoteCraft Editor...
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}

