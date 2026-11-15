"use client";

import React, { useState } from "react";
import { useQuotationStore } from "@/store/quotationStore";
import { STARTER_TEMPLATES } from "@/lib/templates/definitions";
import { POPULAR_CURRENCIES } from "@/lib/formatting/currency";
import { DEFAULT_FIELD_VISIBILITY, DocumentFieldVisibility, ItemsDisplayMode } from "@/types";
import {
  Building2,
  User,
  Package,
  DollarSign,
  FileCheck,
  Palette,
  Plus,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  Upload,
  CheckSquare,
  Sliders,
  Sparkles,
  LayoutGrid,
  ListOrdered,
  Layers,
  CheckCircle2,
} from "lucide-react";

export function SimpleEditor() {
  const {
    currentQuotation,
    updateQuotation,
    updateCompany,
    updateCustomer,
    addItem,
    updateItem,
    removeItem,
    duplicateItem,
    addSection,
    updateSection,
    removeSection,
    updateDesign,
    applyTemplate,
    updateFieldVisibility,
    setItemsDisplayMode,
    applyVisibilityPreset,
  } = useQuotationStore();

  const [activeTab, setActiveTab] = useState<
    "metadata" | "company" | "customer" | "items" | "visibility" | "financials" | "terms" | "design"
  >("items");

  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "metadata", label: "Quotation Info", icon: FileCheck },
    { id: "company", label: "Your Company", icon: Building2 },
    { id: "customer", label: "Client Details", icon: User },
    { id: "items", label: "Items & Layout", icon: Package },
    { id: "visibility", label: "Field Visibility", icon: CheckSquare },
    { id: "financials", label: "Tax & Pricing", icon: DollarSign },
    { id: "terms", label: "Terms & Conditions", icon: FileCheck },
    { id: "design", label: "Template & Style", icon: Palette },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Editor Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/60 overflow-x-auto p-1 sm:p-1.5 gap-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition ${
                isActive
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-3.5 sm:p-5 lg:p-6 overflow-y-auto">
        {/* 1. METADATA TAB */}
        {activeTab === "metadata" && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-base font-bold text-slate-900">Quotation Identifiers & Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quotation Number
                </label>
                <input
                  type="text"
                  value={currentQuotation.quotationNumber}
                  onChange={(e) => updateQuotation({ quotationNumber: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  placeholder="QT-2026-001"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Currency
                </label>
                <select
                  value={currentQuotation.currency}
                  onChange={(e) => updateQuotation({ currency: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  {POPULAR_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol}) - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={currentQuotation.issueDate}
                  onChange={(e) => updateQuotation({ issueDate: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Valid Until / Expiry Date
                </label>
                <input
                  type="date"
                  value={currentQuotation.expiryDate}
                  onChange={(e) => updateQuotation({ expiryDate: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quotation Title
                </label>
                <input
                  type="text"
                  value={currentQuotation.title}
                  onChange={(e) => updateQuotation({ title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="COMMERCIAL PROPOSAL & QUOTATION"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  value={currentQuotation.subject || ""}
                  onChange={(e) => updateQuotation({ subject: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Development of Cloud SaaS Platform"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Introductory Remarks / Opening Note
                </label>
                <textarea
                  rows={3}
                  value={currentQuotation.introduction || ""}
                  onChange={(e) => updateQuotation({ introduction: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Thank you for considering our proposal..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Name (Optional)
                </label>
                <input
                  type="text"
                  value={currentQuotation.projectName || ""}
                  onChange={(e) => updateQuotation({ projectName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  PO / RFQ Reference Code
                </label>
                <input
                  type="text"
                  value={currentQuotation.poReference || ""}
                  onChange={(e) => updateQuotation({ poReference: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. COMPANY PROFILE TAB */}
        {activeTab === "company" && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Your Business Details</h3>
              <span className="text-xs text-slate-500">Issuer coordinates shown on quotation header</span>
            </div>

            {/* Company Logo Upload & Preview Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Company Brand Logo
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload your business logo to display in the quotation header and exported PDF.
                  </p>
                </div>
                {currentQuotation.company.logo && (
                  <button
                    type="button"
                    onClick={() => updateCompany({ logo: "" })}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove Logo</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {currentQuotation.company.logo ? (
                  <div className="relative group shrink-0">
                    <img
                      src={currentQuotation.company.logo}
                      alt="Company Logo Preview"
                      className="h-20 w-28 object-contain rounded-xl border border-slate-200 bg-white p-2 shadow-xs"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-28 rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 shrink-0">
                    <Upload className="h-6 w-6 mb-1 text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">No Logo</span>
                  </div>
                )}

                <div className="flex-1 space-y-2.5 w-full">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <label className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition cursor-pointer active:scale-95">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{currentQuotation.company.logo ? "Upload Replacement Logo" : "Upload Brand Logo"}</span>
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

                    <span className="text-xs text-slate-400">or</span>

                    <input
                      type="url"
                      placeholder="Paste image link URL..."
                      value={currentQuotation.company.logo?.startsWith("http") ? currentQuotation.company.logo : ""}
                      onChange={(e) => updateCompany({ logo: e.target.value })}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 focus:border-blue-500 focus:outline-none flex-1 min-w-[180px]"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    PNG, JPG, SVG, or WebP. Transparent backgrounds look best on colored quotation banners.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Trading Name *
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.name}
                  onChange={(e) => updateCompany({ name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tagline / Business Specialization
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.tagline || ""}
                  onChange={(e) => updateCompany({ tagline: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Engineering & Cloud Solutions"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.address}
                  onChange={(e) => updateCompany({ address: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={currentQuotation.company.city}
                  onChange={(e) => updateCompany({ city: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.state}
                  onChange={(e) => updateCompany({ state: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal / ZIP Code
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.postalCode}
                  onChange={(e) => updateCompany({ postalCode: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  value={currentQuotation.company.country}
                  onChange={(e) => updateCompany({ country: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={currentQuotation.company.email}
                  onChange={(e) => updateCompany({ email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={currentQuotation.company.phone}
                  onChange={(e) => updateCompany({ phone: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tax Registration (GSTIN / VAT / EIN)
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.taxRegistrationId || ""}
                  onChange={(e) => updateCompany({ taxRegistrationId: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Authorized Signatory Name
                </label>
                <input
                  type="text"
                  value={currentQuotation.company.authorizedPerson || ""}
                  onChange={(e) => updateCompany({ authorizedPerson: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. John Doe, Managing Partner"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. CUSTOMER DETAILS TAB */}
        {activeTab === "customer" && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-base font-bold text-slate-900">Client / Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={currentQuotation.customer.name}
                  onChange={(e) => updateCustomer({ name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Company / Entity Name
                </label>
                <input
                  type="text"
                  value={currentQuotation.customer.company || ""}
                  onChange={(e) => updateCustomer({ company: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Billing Address
                </label>
                <input
                  type="text"
                  value={currentQuotation.customer.billingAddress}
                  onChange={(e) => updateCustomer({ billingAddress: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={currentQuotation.customer.city}
                  onChange={(e) => updateCustomer({ city: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State / Country
                </label>
                <input
                  type="text"
                  value={currentQuotation.customer.country}
                  onChange={(e) => updateCustomer({ country: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={currentQuotation.customer.email}
                  onChange={(e) => updateCustomer({ email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Phone
                </label>
                <input
                  type="tel"
                  value={currentQuotation.customer.phone}
                  onChange={(e) => updateCustomer({ phone: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Tax ID / VAT Number
                </label>
                <input
                  type="text"
                  value={currentQuotation.customer.taxId || ""}
                  onChange={(e) => updateCustomer({ taxId: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. ITEMS & LAYOUT TAB */}
        {activeTab === "items" && (
          <div className="space-y-5">
            {/* Presentation Mode Selector */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Quotation Structure & Items Presentation Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {[
                  { id: "table", label: "Multi-Column Table", desc: "Detailed product/labor grid" },
                  { id: "simple-list", label: "2-Column Schedule", desc: "Clean scope & fixed fee" },
                  { id: "cards", label: "Package Cards", desc: "Card boxes with scope" },
                  { id: "milestones", label: "Milestone Timeline", desc: "Phased project payments" },
                  { id: "none", label: "Lump Sum (No Table)", desc: "Turnkey single fee proposal" },
                ].map((mode) => {
                  const isSelected = (currentQuotation.itemsDisplayMode || "table") === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setItemsDisplayMode(mode.id as ItemsDisplayMode)}
                      className={`p-2.5 sm:p-3 rounded-lg text-left border transition flex flex-col justify-center ${
                        isSelected
                          ? "bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs ring-1 ring-blue-500/20"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-semibold text-xs leading-snug">{mode.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{mode.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* If in Table Mode: Quick Column Visibility Checkboxes */}
            {(currentQuotation.itemsDisplayMode || "table") === "table" && (
              <div className="rounded-xl border border-slate-200 bg-white p-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <span className="font-semibold text-slate-700">Visible Table Columns:</span>
                {[
                  { key: "colItemNumber", label: "Row #" },
                  { key: "colSku", label: "SKU" },
                  { key: "colQuantity", label: "Qty" },
                  { key: "colUnit", label: "Unit" },
                  { key: "colUnitRate", label: "Unit Rate" },
                  { key: "colDiscount", label: "Discount" },
                  { key: "colTaxRate", label: "Tax %" },
                  { key: "colAmount", label: "Amount" },
                ].map((col) => {
                  const isChecked =
                    (currentQuotation.fieldVisibility as any)?.[col.key] ??
                    (DEFAULT_FIELD_VISIBILITY as any)[col.key];
                  return (
                    <label
                      key={col.key}
                      className="flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          updateFieldVisibility({ [col.key]: e.target.checked } as any)
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-medium">{col.label}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* If in Lump Sum Mode: Show Lump Sum Investment Box */}
            {currentQuotation.itemsDisplayMode === "none" ? (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <h4 className="font-bold text-sm text-slate-900">
                    Lump-Sum Commercial Investment Mode Active
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No line-item table will be rendered. Your proposal will feature a clean turnkey investment summary with your scope of work.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Lump-Sum Investment / Fixed Project Fee ({currentQuotation.currency}) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={currentQuotation.lumpSumAmount || ""}
                      onChange={(e) =>
                        updateQuotation({ lumpSumAmount: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. 5000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Engagement Type / Billing Term
                    </label>
                    <input
                      type="text"
                      value={currentQuotation.subtitle || ""}
                      onChange={(e) => updateQuotation({ subtitle: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. Fixed Price / Monthly Retainer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {currentQuotation.itemsDisplayMode === "milestones"
                        ? "Project Milestones & Deliverables"
                        : currentQuotation.itemsDisplayMode === "cards"
                        ? "Package Deliverables & Cards"
                        : currentQuotation.itemsDisplayMode === "simple-list"
                        ? "Fee Schedule Items"
                        : "Quotation Line Items"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Add unlimited deliverables, assign phase groups, and set custom rates and discounts.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>
                      {currentQuotation.itemsDisplayMode === "milestones" ? "Add Milestone" : "Add Item"}
                    </span>
                  </button>
                </div>

                <div className="space-y-3">
                  {currentQuotation.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition"
                    >
                      {/* Line Item Header with Index and Action Buttons */}
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 inline-flex items-center justify-center text-[10px] font-mono font-bold">
                            {index + 1}
                          </span>
                          <span>Line Item #{index + 1}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => duplicateItem(item.id)}
                            title="Duplicate line item"
                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            title="Remove line item"
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-2.5 sm:gap-3 items-start">
                        <div className="col-span-12 sm:col-span-7">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            {currentQuotation.itemsDisplayMode === "milestones"
                              ? "Milestone Title / Phase Name *"
                              : "Item / Service Name *"}
                          </label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, { name: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="col-span-12 sm:col-span-5">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Group / Phase Heading
                          </label>
                          <input
                            type="text"
                            value={item.groupName || ""}
                            onChange={(e) => updateItem(item.id, { groupName: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                            placeholder="e.g. Phase 1: Planning"
                          />
                        </div>

                        <div className="col-span-12">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Detailed Description / Deliverable Specifications
                          </label>
                          <textarea
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) => updateItem(item.id, { description: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Unit
                          </label>
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                            placeholder="pcs, hrs, days"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1 truncate" title={`Unit Rate (${currentQuotation.currency})`}>
                            Rate ({currentQuotation.currency})
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={item.rate}
                            onChange={(e) =>
                              updateItem(item.id, { rate: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Discount (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="any"
                            value={item.discount}
                            onChange={(e) =>
                              updateItem(item.id, { discount: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Tax Rate (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={item.taxRate}
                            onChange={(e) =>
                              updateItem(item.id, { taxRate: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            SKU / Code
                          </label>
                          <input
                            type="text"
                            value={item.sku || ""}
                            onChange={(e) => updateItem(item.id, { sku: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* 5. GRANULAR FIELD VISIBILITY CHECKBOX CUSTOMIZER */}
        {activeTab === "visibility" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Granular Field & Section Visibility
                </h3>
                <p className="text-xs text-slate-500">
                  Select which fields appear on your quotation and PDF. Untick any item you do not need.
                </p>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyVisibilityPreset("minimal")}
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 transition"
                >
                  ⚡ Minimalist
                </button>
                <button
                  type="button"
                  onClick={() => applyVisibilityPreset("corporate")}
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 transition"
                >
                  ⚡ Corporate
                </button>
                <button
                  type="button"
                  onClick={() => applyVisibilityPreset("tender")}
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 transition"
                >
                  ⚡ Project Tender
                </button>
                <button
                  type="button"
                  onClick={() => applyVisibilityPreset("default")}
                  className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* Checkbox Group Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group A: Document Identifiers & Header */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-blue-600" />
                  <span>Document Meta & Identifiers</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "quotationNumber", label: "Quotation Number" },
                    { key: "issueDate", label: "Issue Date" },
                    { key: "expiryDate", label: "Valid Until / Expiry Date" },
                    { key: "projectName", label: "Project Name" },
                    { key: "projectReference", label: "Project Reference" },
                    { key: "poReference", label: "Purchase Order (PO) Reference" },
                    { key: "preparedBy", label: "Prepared By Name" },
                    { key: "approvedBy", label: "Approved By Name" },
                    { key: "expectedDeliveryDate", label: "Expected Delivery Date" },
                    { key: "currencyBadge", label: "Currency Identifier" },
                    { key: "subject", label: "Subject Line" },
                    { key: "introduction", label: "Introduction / Executive Scope" },
                  ].map((field) => {
                    const isChecked =
                      (currentQuotation.fieldVisibility as any)?.[field.key] ??
                      (DEFAULT_FIELD_VISIBILITY as any)[field.key];
                    return (
                      <label
                        key={field.key}
                        className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateFieldVisibility({ [field.key]: e.target.checked } as any)
                          }
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Group B: Company (Issuer) Coordinates */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-indigo-600" />
                  <span>Company (Issuer) Coordinates</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "companyLogo", label: "Company Logo" },
                    { key: "companyTagline", label: "Tagline / Slogan" },
                    { key: "companyAddress", label: "Physical Street Address" },
                    { key: "companyEmail", label: "Email Address" },
                    { key: "companyPhone", label: "Phone Number" },
                    { key: "companyWhatsapp", label: "WhatsApp Contact" },
                    { key: "companyWebsite", label: "Website URL" },
                    { key: "companyTaxId", label: "Tax ID (GSTIN / VAT / EIN)" },
                    { key: "companyBusinessId", label: "Corporate Reg No / CIN" },
                    { key: "bankDetails", label: "Bank Remittance Coordinates" },
                  ].map((field) => {
                    const isChecked =
                      (currentQuotation.fieldVisibility as any)?.[field.key] ??
                      (DEFAULT_FIELD_VISIBILITY as any)[field.key];
                    return (
                      <label
                        key={field.key}
                        className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateFieldVisibility({ [field.key]: e.target.checked } as any)
                          }
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Group C: Customer (Client) Details */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-600" />
                  <span>Client / Customer Details</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "customerContactPerson", label: "Contact Person Name" },
                    { key: "customerCompany", label: "Customer Entity Name" },
                    { key: "customerBillingAddress", label: "Billing Street Address" },
                    { key: "customerShippingAddress", label: "Shipping / Site Address" },
                    { key: "customerEmail", label: "Client Email Address" },
                    { key: "customerPhone", label: "Client Phone Number" },
                    { key: "customerTaxId", label: "Client Tax / VAT ID" },
                  ].map((field) => {
                    const isChecked =
                      (currentQuotation.fieldVisibility as any)?.[field.key] ??
                      (DEFAULT_FIELD_VISIBILITY as any)[field.key];
                    return (
                      <label
                        key={field.key}
                        className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateFieldVisibility({ [field.key]: e.target.checked } as any)
                          }
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Group D: Table Columns */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-amber-600" />
                  <span>Table Columns & Item Fields</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "colItemNumber", label: "Row Number (#)" },
                    { key: "colSku", label: "SKU / Code Column" },
                    { key: "colDescription", label: "Item Description & Specs" },
                    { key: "colQuantity", label: "Quantity (Qty)" },
                    { key: "colUnit", label: "Unit of Measurement" },
                    { key: "colUnitRate", label: "Unit Rate" },
                    { key: "colDiscount", label: "Line-Item Discount" },
                    { key: "colTaxRate", label: "Line-Item Tax %" },
                    { key: "colAmount", label: "Line Total Amount" },
                  ].map((field) => {
                    const isChecked =
                      (currentQuotation.fieldVisibility as any)?.[field.key] ??
                      (DEFAULT_FIELD_VISIBILITY as any)[field.key];
                    return (
                      <label
                        key={field.key}
                        className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateFieldVisibility({ [field.key]: e.target.checked } as any)
                          }
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Group E: Financial Summary & Totals */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>Financial Totals & Summary</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "subtotal", label: "Subtotal" },
                    { key: "documentDiscount", label: "Document Overall Discount" },
                    { key: "taxBreakdown", label: "Itemized Tax Breakdown" },
                    { key: "additionalCharges", label: "Additional Charges / Surcharges" },
                    { key: "grandTotal", label: "Grand Total" },
                    { key: "amountInWords", label: "Grand Total in Formal Words" },
                    { key: "depositRequired", label: "Advance Deposit Required" },
                    { key: "balanceDue", label: "Balance Due Upon Completion" },
                  ].map((field) => {
                    const isChecked =
                      (currentQuotation.fieldVisibility as any)?.[field.key] ??
                      (DEFAULT_FIELD_VISIBILITY as any)[field.key];
                    return (
                      <label
                        key={field.key}
                        className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateFieldVisibility({ [field.key]: e.target.checked } as any)
                          }
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Group F: Legal & Security */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-purple-600" />
                  <span>Legal, Authentication & Security</span>
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "termsAndConditions", label: "Terms & Conditions Sections" },
                    { key: "signatureBlock", label: "Authorized Signature Line" },
                    { key: "companyStamp", label: "Official Corporate Stamp Seal" },
                    { key: "qrCode", label: "Digital Authentication QR Code" },
                    { key: "watermark", label: "Document Background Watermark" },
                  ].map((field) => {
                    const isChecked =
                      (currentQuotation.fieldVisibility as any)?.[field.key] ??
                      (DEFAULT_FIELD_VISIBILITY as any)[field.key];
                    return (
                      <label
                        key={field.key}
                        className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updateFieldVisibility({ [field.key]: e.target.checked } as any)
                          }
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span>{field.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. FINANCIALS & TAX TAB */}
        {activeTab === "financials" && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-base font-bold text-slate-900">Document Taxes, Discounts & Surcharges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tax Calculation Mode
                </label>
                <select
                  value={currentQuotation.taxType}
                  onChange={(e) => updateQuotation({ taxType: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="exclusive">Tax Exclusive (Tax Added on Top)</option>
                  <option value="inclusive">Tax Inclusive (Prices Already Include Tax)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Overall Discount
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={currentQuotation.documentDiscount}
                    onChange={(e) => updateQuotation({ documentDiscount: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <select
                    value={currentQuotation.documentDiscountType}
                    onChange={(e) => updateQuotation({ documentDiscountType: e.target.value as any })}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="percent">%</option>
                    <option value="fixed">{currentQuotation.currency}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deposit / Advance Required
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={currentQuotation.depositAmount}
                    onChange={(e) => updateQuotation({ depositAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <select
                    value={currentQuotation.depositType}
                    onChange={(e) => updateQuotation({ depositType: e.target.value as any })}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="percent">%</option>
                    <option value="fixed">{currentQuotation.currency}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. TERMS TAB */}
        {activeTab === "terms" && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Commercial Terms & Reusable Sections</h3>
                <p className="text-xs text-slate-500">
                  Toggle clauses on or off, edit terms, or add custom legal sections.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addSection({ title: "Custom Agreement", content: "Details..." })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Section</span>
              </button>
            </div>

            <div className="space-y-3">
              {currentQuotation.sections.map((section) => (
                <div
                  key={section.id}
                  className={`rounded-xl border p-4 transition ${
                    section.isVisible
                      ? "border-slate-200 bg-white"
                      : "border-dashed border-slate-200 bg-slate-50/60 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="text-xs font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-1 py-0.5"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={section.isVisible}
                          onChange={(e) => updateSection(section.id, { isVisible: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span>Visible</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="p-1 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={section.content}
                    onChange={(e) => updateSection(section.id, { content: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. DESIGN & TEMPLATES TAB */}
        {activeTab === "design" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Select Starter Template</h3>
              <p className="text-xs text-slate-500 mb-4">
                Choose from 14 professionally curated industry styles. Changing template preserves all data.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STARTER_TEMPLATES.map((t) => {
                  const isSelected = currentQuotation.design.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => applyTemplate(t.id)}
                      className={`text-left p-3 rounded-xl border transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <span className="text-xs font-bold text-slate-900 truncate">{t.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                        {t.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Color & Visual Customization</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentQuotation.design.primaryColor}
                      onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                      className="h-8 w-12 rounded cursor-pointer border border-slate-300 p-0.5"
                    />
                    <span className="text-xs font-mono text-slate-600">
                      {currentQuotation.design.primaryColor}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Typography Font Family
                  </label>
                  <select
                    value={currentQuotation.design.fontFamily}
                    onChange={(e) => updateDesign({ fontFamily: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Inter">Inter (Modern Sans)</option>
                    <option value="Roboto">Roboto (Clean Corporate)</option>
                    <option value="Playfair Display">Playfair Display (Luxury Serif)</option>
                    <option value="Fira Code">Fira Code (Tech Monospace)</option>
                    <option value="Merriweather">Merriweather (Classic Editorial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Watermark Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={currentQuotation.design.watermarkText || ""}
                    onChange={(e) => updateDesign({ watermarkText: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. DRAFT"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentQuotation.design.showQrCode}
                    onChange={(e) => updateDesign({ showQrCode: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Include Digital QR Code</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentQuotation.design.showSignatureBlock}
                    onChange={(e) => updateDesign({ showSignatureBlock: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Include Authorized Signature</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentQuotation.design.showCompanyStamp}
                    onChange={(e) => updateDesign({ showCompanyStamp: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Include Official Stamp</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

