"use client";

import React, { useState } from "react";
import { useQuotationStore } from "@/store/quotationStore";
import { QuotationDocument } from "@/components/preview/QuotationDocument";
import {
  Layers,
  Type,
  Palette,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Check,
  Grid,
} from "lucide-react";

export function AdvancedDesigner() {
  const { currentQuotation, updateDesign, updateQuotation, updateCompany } = useQuotationStore();
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [activeLeftTab, setActiveLeftTab] = useState<"elements" | "layers">("elements");
  const [selectedSection, setSelectedSection] = useState<string>("header");

  const design = currentQuotation.design;

  const elementsList = [
    { id: "header", name: "Company Header Banner", icon: Type, active: true },
    { id: "customer", name: "Customer & Client Block", icon: Type, active: true },
    { id: "metadata", name: "Dates & Quotation Details", icon: Type, active: true },
    { id: "items", name: "Dynamic Line Items Table", icon: Grid, active: true },
    { id: "totals", name: "Financial Totals & Summary", icon: Layers, active: true },
    { id: "terms", name: "Terms & Conditions Sections", icon: Type, active: true },
    { id: "signature", name: "Authorized Signatory Block", icon: Palette, active: design.showSignatureBlock },
    { id: "stamp", name: "Official Corporate Seal", icon: Palette, active: design.showCompanyStamp },
    { id: "qrcode", name: "Digital Authentication QR", icon: Grid, active: design.showQrCode },
  ];

  return (
    <div className="flex h-full w-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* LEFT PANEL: Elements & Layers */}
      <div className="hidden md:flex w-64 border-r border-slate-800 bg-slate-950 flex-col shrink-0">
        <div className="flex border-b border-slate-800 p-2 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveLeftTab("elements")}
            className={`flex-1 py-1.5 px-3 rounded-md transition ${
              activeLeftTab === "elements" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Elements
          </button>
          <button
            onClick={() => setActiveLeftTab("layers")}
            className={`flex-1 py-1.5 px-3 rounded-md transition ${
              activeLeftTab === "layers" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Layers
          </button>
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-1.5 text-xs">
          {activeLeftTab === "elements" ? (
            <>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Document Sections
              </p>
              {elementsList.map((el) => {
                const Icon = el.icon;
                const isSelected = selectedSection === el.id;
                return (
                  <button
                    key={el.id}
                    onClick={() => setSelectedSection(el.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition ${
                      isSelected
                        ? "bg-blue-600/20 border-blue-500 text-blue-300"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{el.name}</span>
                    </div>
                    {el.active && <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Layout Hierarchy
              </p>
              <div className="space-y-1 font-mono text-[11px] text-slate-400">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  Page 1: Root Container
                </div>
                <div className="pl-3 space-y-1">
                  <div className="p-1.5 rounded bg-slate-900/60">#header-layout ({design.headerLayout})</div>
                  <div className="p-1.5 rounded bg-slate-900/60">#parties-grid</div>
                  <div className="p-1.5 rounded bg-slate-900/60">#items-table ({design.tableLayout})</div>
                  <div className="p-1.5 rounded bg-slate-900/60">#financial-summary</div>
                  <div className="p-1.5 rounded bg-slate-900/60">#terms-block</div>
                  <div className="p-1.5 rounded bg-slate-900/60">#signature-qr-footer</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CENTER: Canvas with Zoom & Live Document */}
      <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
        {/* Canvas Toolbar */}
        <div className="h-12 border-b border-slate-800 px-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">Format:</span>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-200">
              {design.pageSize} ({design.orientation})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.1))}
              className="p-1 rounded bg-slate-800 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="font-mono text-slate-300 w-12 text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale((z) => Math.min(1.3, z + 0.1))}
              className="p-1 rounded bg-slate-800 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setZoomScale(0.85)}
              className="ml-2 text-[11px] underline hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-3 sm:p-8 flex justify-center bg-slate-900/90">
          <div
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: "top center",
            }}
            className="transition-transform duration-150 ease-out"
          >
            <div className="paper-shadow rounded-lg overflow-hidden ring-1 ring-slate-700">
              <QuotationDocument quotation={currentQuotation} />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Inspector & Properties */}
      <div className="hidden xl:flex w-72 border-l border-slate-800 bg-slate-950 p-4 flex-col shrink-0 overflow-y-auto text-xs space-y-5">
        <h3 className="font-bold text-white text-sm">Visual Properties</h3>

        <div>
          <label className="block font-semibold text-slate-400 mb-1.5">Header Layout Style</label>
          <select
            value={design.headerLayout}
            onChange={(e) => updateDesign({ headerLayout: e.target.value as any })}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 focus:outline-none"
          >
            <option value="modern-banner">Modern Banner (Gradient)</option>
            <option value="bold-bar">Bold Colored Bar</option>
            <option value="classic">Classic Corporate</option>
            <option value="minimal">Minimal Clean Line</option>
            <option value="clean-centered">Centered Executive</option>
          </select>
        </div>

        {/* Company Logo Property */}
        <div className="pt-2 border-t border-slate-800">
          <label className="block font-semibold text-slate-400 mb-2">Company Brand Logo</label>
          <div className="flex items-center gap-3">
            {currentQuotation.company.logo ? (
              <div className="relative group shrink-0">
                <img
                  src={currentQuotation.company.logo}
                  alt="Logo"
                  className="h-12 w-12 object-contain rounded-lg border border-slate-700 bg-white p-1"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-lg border border-dashed border-slate-700 bg-slate-900 flex items-center justify-center text-slate-500 text-[10px] shrink-0">
                No Logo
              </div>
            )}
            <div className="flex-1 space-y-1">
              <label className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 text-xs font-semibold cursor-pointer transition">
                <span>{currentQuotation.company.logo ? "Change" : "Upload Logo"}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      if (result) {
                        updateCompany({ logo: result });
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              {currentQuotation.company.logo && (
                <button
                  type="button"
                  onClick={() => updateCompany({ logo: "" })}
                  className="block text-[11px] text-rose-400 hover:underline"
                >
                  Remove Logo
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-400 mb-1.5">
            Items Presentation Style
          </label>
          <select
            value={currentQuotation.itemsDisplayMode || "table"}
            onChange={(e) => updateQuotation({ itemsDisplayMode: e.target.value as any })}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 focus:outline-none"
          >
            <option value="table">Multi-Column Table</option>
            <option value="simple-list">2-Column Fee Schedule</option>
            <option value="cards">Package Deliverable Cards</option>
            <option value="milestones">Milestone Phase Schedule</option>
            <option value="none">Lump Sum (No Table)</option>
          </select>
        </div>

        {(currentQuotation.itemsDisplayMode || "table") === "table" && (
          <div>
            <label className="block font-semibold text-slate-400 mb-1.5">Table Styling</label>
            <select
              value={design.tableLayout}
              onChange={(e) => updateDesign({ tableLayout: e.target.value as any })}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 focus:outline-none"
            >
              <option value="clean">Clean Minimalist</option>
              <option value="striped">Zebra Striped Rows</option>
              <option value="accent-header">Accent Header Fill</option>
              <option value="bordered">Full Border Grid</option>
            </select>
          </div>
        )}

        <div className="border-t border-slate-800 pt-4">
          <label className="block font-semibold text-slate-400 mb-1.5">Palette Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={design.primaryColor}
              onChange={(e) => updateDesign({ primaryColor: e.target.value })}
              className="h-8 w-12 rounded cursor-pointer border border-slate-700 bg-transparent p-0.5"
            />
            <span className="font-mono text-slate-300">{design.primaryColor}</span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-3">
          <label className="block font-semibold text-slate-400">Display Blocks</label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={design.showQrCode}
              onChange={(e) => updateDesign({ showQrCode: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-blue-500"
            />
            <span>Show Verification QR Code</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={design.showSignatureBlock}
              onChange={(e) => updateDesign({ showSignatureBlock: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-blue-500"
            />
            <span>Show Signature Block</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={design.showCompanyStamp}
              onChange={(e) => updateDesign({ showCompanyStamp: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-blue-500"
            />
            <span>Show Company Official Seal</span>
          </label>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <label className="block font-semibold text-slate-400 mb-1">Watermark</label>
          <input
            type="text"
            value={design.watermarkText || ""}
            onChange={(e) => updateDesign({ watermarkText: e.target.value })}
            placeholder="e.g. DRAFT"
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

