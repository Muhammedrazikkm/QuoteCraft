"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Quotation, DEFAULT_FIELD_VISIBILITY, DocumentFieldVisibility } from "@/types";
import { calculateQuotationTotals } from "@/lib/calculations/financial";
import { formatCurrency } from "@/lib/formatting/currency";
import { formatDate } from "@/lib/formatting/dates";

interface QuotationDocumentProps {
  quotation: Quotation;
  id?: string;
  className?: string;
}

export function QuotationDocument({
  quotation,
  id = "quotation-printable-canvas",
  className = "",
}: QuotationDocumentProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const fieldVisibility: DocumentFieldVisibility = {
    ...DEFAULT_FIELD_VISIBILITY,
    ...(quotation.fieldVisibility || {}),
  };
  const itemsDisplayMode = quotation.itemsDisplayMode || "table";

  const design = quotation.design || {
    primaryColor: "#2563eb",
    secondaryColor: "#3b82f6",
    accentColor: "#dbeafe",
    textColor: "#0f172a",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
    headerLayout: "modern-banner",
    tableLayout: "clean",
    pageSize: "A4",
    orientation: "portrait",
    showQrCode: true,
    showSignatureBlock: true,
    showCompanyStamp: true,
  };

  const totals = calculateQuotationTotals(quotation.items, {
    documentDiscount: quotation.documentDiscount,
    documentDiscountType: quotation.documentDiscountType,
    documentTaxType: quotation.taxType,
    additionalCharges: quotation.additionalCharges,
    depositAmount: quotation.depositAmount,
    depositType: quotation.depositType,
    currencyCode: quotation.currency,
    lumpSumAmount: quotation.lumpSumAmount,
  });

  // Generate QR Code if enabled
  useEffect(() => {
    if (fieldVisibility.qrCode && design.showQrCode) {
      const qrPayload = JSON.stringify({
        quoteNo: quotation.quotationNumber,
        company: quotation.company.name,
        customer: quotation.customer.name,
        total: totals.grandTotal,
        currency: quotation.currency,
        date: quotation.issueDate,
      });

      QRCode.toDataURL(qrPayload, {
        width: 140,
        margin: 1,
        color: {
          dark: design.primaryColor || "#000000",
          light: "#ffffff",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => setQrDataUrl(""));
    }
  }, [
    fieldVisibility.qrCode,
    design.showQrCode,
    design.primaryColor,
    quotation.quotationNumber,
    quotation.company.name,
    quotation.customer.name,
    totals.grandTotal,
    quotation.currency,
    quotation.issueDate,
  ]);

  // Group items by groupName if present
  const groupedItems: Record<string, typeof quotation.items> = {};
  quotation.items.forEach((item) => {
    const group = item.groupName?.trim() || "DefaultGroup";
    if (!groupedItems[group]) {
      groupedItems[group] = [];
    }
    groupedItems[group].push(item);
  });

  const fontStyleClass =
    design.fontFamily === "Playfair Display"
      ? "font-serif"
      : design.fontFamily === "Fira Code"
      ? "font-mono"
      : "font-sans";

  return (
    <div
      id={id}
      className={`print-area relative mx-auto w-full max-w-[800px] min-h-[1130px] bg-white p-8 sm:p-12 text-slate-800 transition-all ${fontStyleClass} ${className}`}
      style={{
        color: design.textColor,
        backgroundColor: design.backgroundColor || "#ffffff",
      }}
    >
      {/* Watermark overlay if draft or configured */}
      {fieldVisibility.watermark && design.watermarkText && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
          <span className="rotate-[-35deg] select-none text-8xl font-black uppercase tracking-widest text-slate-900/[0.04]">
            {design.watermarkText}
          </span>
        </div>
      )}

      {/* HEADER SECTION */}
      {design.headerLayout === "modern-banner" && (
        <div
          className="relative -mx-8 -mt-8 sm:-mx-12 sm:-mt-12 mb-8 p-8 sm:p-10 rounded-b-2xl text-white shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.secondaryColor} 100%)`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {fieldVisibility.companyLogo && quotation.company.logo && (
                <img
                  src={quotation.company.logo}
                  alt={quotation.company.name}
                  className="h-16 w-16 object-contain rounded-lg bg-white p-1.5 shadow"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {quotation.company.name}
                </h1>
                {fieldVisibility.companyTagline && quotation.company.tagline && (
                  <p className="text-xs text-white/80 font-medium tracking-wide">
                    {quotation.company.tagline}
                  </p>
                )}
              </div>
            </div>

            {fieldVisibility.quotationNumber && (
              <div className="sm:text-right">
                <span className="text-xs font-bold tracking-widest uppercase text-white/90 block">
                  QUOTATION
                </span>
                <h2 className="mt-1 text-xl font-mono font-bold tracking-tight text-white" suppressHydrationWarning>
                  {quotation.quotationNumber}
                </h2>
              </div>
            )}
          </div>
        </div>
      )}

      {design.headerLayout === "bold-bar" && (
        <div className="mb-8">
          <div
            className="h-2 w-full mb-6 rounded-full"
            style={{ backgroundColor: design.primaryColor }}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {fieldVisibility.companyLogo && quotation.company.logo && (
                <img
                  src={quotation.company.logo}
                  alt={quotation.company.name}
                  className="h-14 w-14 object-contain rounded-md"
                />
              )}
              <div>
                <h1 className="text-2xl font-black tracking-tight" style={{ color: design.primaryColor }}>
                  {quotation.company.name}
                </h1>
                {fieldVisibility.companyTagline && quotation.company.tagline && (
                  <p className="text-xs text-slate-500 font-medium">{quotation.company.tagline}</p>
                )}
              </div>
            </div>
            {fieldVisibility.quotationNumber && (
              <div className="sm:text-right">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  QUOTATION
                </span>
                <p className="text-xl font-bold font-mono" style={{ color: design.primaryColor }} suppressHydrationWarning>
                  {quotation.quotationNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {(design.headerLayout === "classic" ||
        design.headerLayout === "minimal" ||
        design.headerLayout === "split" ||
        design.headerLayout === "clean-centered") && (
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div
            className={`flex flex-col ${
              design.headerLayout === "clean-centered"
                ? "items-center text-center"
                : "sm:flex-row sm:items-center sm:justify-between"
            } gap-4`}
          >
            <div className="flex items-center gap-3">
              {fieldVisibility.companyLogo && quotation.company.logo && (
                <img
                  src={quotation.company.logo}
                  alt={quotation.company.name}
                  className="h-12 w-12 object-contain"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: design.primaryColor }}>
                  {quotation.company.name}
                </h1>
                {fieldVisibility.companyTagline && quotation.company.tagline && (
                  <p className="text-xs text-slate-500">{quotation.company.tagline}</p>
                )}
              </div>
            </div>

            {fieldVisibility.quotationNumber && (
              <div className={design.headerLayout === "clean-centered" ? "text-center" : "sm:text-right"}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  QUOTATION
                </h2>
                <p className="text-lg font-bold font-mono text-slate-800" suppressHydrationWarning>
                  {quotation.quotationNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* METADATA & PARTIES INFO GRID */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
        {/* Company Contact */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            From (Issuer)
          </span>
          <p className="font-bold text-slate-900 text-sm mb-1">{quotation.company.name}</p>
          {fieldVisibility.companyAddress && (
            <>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                {quotation.company.address}
              </p>
              <p className="text-slate-600">
                {quotation.company.city}, {quotation.company.state} {quotation.company.postalCode}
              </p>
              <p className="text-slate-600 font-medium">{quotation.company.country}</p>
            </>
          )}
          <div className="mt-2.5 space-y-1 border-t border-slate-200/60 pt-2 text-slate-500">
            {fieldVisibility.companyEmail && quotation.company.email && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Email:</span>
                <span className="text-slate-700 break-all">{quotation.company.email}</span>
              </div>
            )}
            {fieldVisibility.companyPhone && quotation.company.phone && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Phone:</span>
                <span className="text-slate-700">{quotation.company.phone}</span>
              </div>
            )}
            {fieldVisibility.companyWhatsapp && quotation.company.whatsapp && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">WhatsApp:</span>
                <span className="text-slate-700">{quotation.company.whatsapp}</span>
              </div>
            )}
            {fieldVisibility.companyWebsite && quotation.company.website && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Web:</span>
                <span className="text-slate-700 break-all">{quotation.company.website}</span>
              </div>
            )}
            {fieldVisibility.companyTaxId && quotation.company.taxRegistrationId && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Tax ID:</span>
                <span className="font-mono text-slate-700">{quotation.company.taxRegistrationId}</span>
              </div>
            )}
            {fieldVisibility.companyBusinessId && quotation.company.businessRegistrationId && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Reg No:</span>
                <span className="font-mono text-slate-700">{quotation.company.businessRegistrationId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Quotation Prepared For
          </span>
          {fieldVisibility.customerContactPerson && (
            <p className="font-bold text-slate-900 text-sm mb-1">{quotation.customer.name}</p>
          )}
          {fieldVisibility.customerCompany && quotation.customer.company && (
            <p className="font-medium text-slate-700 mb-1">{quotation.customer.company}</p>
          )}
          {fieldVisibility.customerBillingAddress && (
            <>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                {quotation.customer.billingAddress}
              </p>
              <p className="text-slate-600">
                {quotation.customer.city}, {quotation.customer.state} {quotation.customer.postalCode}
              </p>
              <p className="text-slate-600 font-medium">{quotation.customer.country}</p>
            </>
          )}
          {fieldVisibility.customerShippingAddress && quotation.customer.shippingAddress && (
            <div className="mt-2 pt-2 border-t border-slate-200/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Site / Delivery Address:</span>
              <p className="text-slate-600 whitespace-pre-line text-[11px]">{quotation.customer.shippingAddress}</p>
            </div>
          )}
          <div className="mt-2.5 space-y-1 border-t border-slate-200/60 pt-2 text-slate-500">
            {fieldVisibility.customerEmail && quotation.customer.email && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Email:</span>
                <span className="text-slate-700 break-all">{quotation.customer.email}</span>
              </div>
            )}
            {fieldVisibility.customerPhone && quotation.customer.phone && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Phone:</span>
                <span className="text-slate-700">{quotation.customer.phone}</span>
              </div>
            )}
            {fieldVisibility.customerTaxId && quotation.customer.taxId && (
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-slate-400 shrink-0 font-medium">Tax Reg:</span>
                <span className="font-mono text-slate-700">{quotation.customer.taxId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quotation Dates & References */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:col-span-2 lg:col-span-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
            Quotation Details
          </span>
          <div className="space-y-2">
            {fieldVisibility.issueDate && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Issue Date:</span>
                <span className="font-semibold text-slate-800 text-right min-w-0 break-words">{formatDate(quotation.issueDate)}</span>
              </div>
            )}
            {fieldVisibility.expiryDate && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Valid Until:</span>
                <span className="font-semibold text-red-600 text-right min-w-0 break-words">{formatDate(quotation.expiryDate)}</span>
              </div>
            )}
            {fieldVisibility.projectName && quotation.projectName && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Project:</span>
                <span className="font-medium text-slate-800 text-right min-w-0 break-words">{quotation.projectName}</span>
              </div>
            )}
            {fieldVisibility.projectReference && quotation.projectReference && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Proj Ref:</span>
                <span className="font-mono text-slate-700 text-right min-w-0 break-words">{quotation.projectReference}</span>
              </div>
            )}
            {fieldVisibility.poReference && quotation.poReference && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">PO Ref:</span>
                <span className="font-mono text-slate-700 text-right min-w-0 break-words">{quotation.poReference}</span>
              </div>
            )}
            {fieldVisibility.preparedBy && quotation.preparedBy && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Prepared By:</span>
                <span className="text-slate-700 font-medium text-right min-w-0 break-words">{quotation.preparedBy}</span>
              </div>
            )}
            {fieldVisibility.approvedBy && quotation.approvedBy && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Approved By:</span>
                <span className="text-slate-700 font-medium text-right min-w-0 break-words">{quotation.approvedBy}</span>
              </div>
            )}
            {fieldVisibility.expectedDeliveryDate && quotation.expectedDeliveryDate && (
              <div className="flex items-baseline justify-between gap-x-4 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Expected Delivery:</span>
                <span className="text-slate-700 text-right min-w-0 break-words">{formatDate(quotation.expectedDeliveryDate)}</span>
              </div>
            )}
            {fieldVisibility.currencyBadge && (
              <div className="flex items-baseline justify-between gap-x-4 border-t border-slate-200/60 pt-2 text-xs">
                <span className="text-slate-500 shrink-0 whitespace-nowrap">Currency:</span>
                <span className="font-bold text-slate-900 text-right min-w-0">{quotation.currency}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INTRODUCTION / SUBJECT */}
      {((fieldVisibility.subject && quotation.subject) ||
        (fieldVisibility.introduction && quotation.introduction)) && (
        <div
          className="mb-6 rounded-lg bg-blue-50/40 p-4 border-l-4 text-xs"
          style={{ borderColor: design.primaryColor }}
        >
          {fieldVisibility.subject && quotation.subject && (
            <h3 className="font-bold text-slate-900 mb-1">
              Subject: {quotation.subject}
            </h3>
          )}
          {fieldVisibility.introduction && quotation.introduction && (
            <p className="text-slate-600 leading-relaxed">{quotation.introduction}</p>
          )}
        </div>
      )}

      {/* 5 ITEMS PRESENTATION MODES */}

      {/* MODE 1: TRADITIONAL MULTI-COLUMN TABLE */}
      {itemsDisplayMode === "table" && (
        <div className="mb-8 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className="border-b border-slate-200 text-slate-700"
                style={{
                  backgroundColor:
                    design.tableLayout === "accent-header"
                      ? design.accentColor || "#eff6ff"
                      : "#f8fafc",
                }}
              >
                {fieldVisibility.colItemNumber && <th className="py-3 px-3 font-semibold w-10">#</th>}
                {fieldVisibility.colDescription && <th className="py-3 px-3 font-semibold">Description</th>}
                {fieldVisibility.colSku && <th className="py-3 px-3 font-semibold w-24">SKU</th>}
                {fieldVisibility.colQuantity && <th className="py-3 px-3 font-semibold text-right w-16">Qty</th>}
                {fieldVisibility.colUnit && <th className="py-3 px-3 font-semibold text-right w-16">Unit</th>}
                {fieldVisibility.colUnitRate && <th className="py-3 px-3 font-semibold text-right w-20">Unit Rate</th>}
                {fieldVisibility.colDiscount && <th className="py-3 px-3 font-semibold text-right w-16">Disc</th>}
                {fieldVisibility.colTaxRate && <th className="py-3 px-3 font-semibold text-right w-16">Tax</th>}
                {fieldVisibility.colAmount && <th className="py-3 px-3 font-semibold text-right w-24">Amount</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(groupedItems).map(([groupTitle, items], gIdx) => (
                <React.Fragment key={groupTitle}>
                  {groupTitle !== "DefaultGroup" && (
                    <tr className="bg-slate-100/60 font-semibold text-slate-700">
                      <td colSpan={10} className="py-2 px-3 tracking-wide">
                        {groupTitle}
                      </td>
                    </tr>
                  )}
                  {items.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        design.tableLayout === "striped" && index % 2 === 1
                          ? "bg-slate-50/50"
                          : ""
                      }
                    >
                      {fieldVisibility.colItemNumber && (
                        <td className="py-3 px-3 text-slate-400 font-mono">
                          {index + 1}
                        </td>
                      )}
                      {fieldVisibility.colDescription && (
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{item.name}</div>
                          {item.description && (
                            <div className="text-slate-500 mt-0.5 whitespace-pre-line leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </td>
                      )}
                      {fieldVisibility.colSku && (
                        <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                          {item.sku || "-"}
                        </td>
                      )}
                      {fieldVisibility.colQuantity && (
                        <td className="py-3 px-3 text-right font-medium">
                          {item.quantity}
                        </td>
                      )}
                      {fieldVisibility.colUnit && (
                        <td className="py-3 px-3 text-right text-slate-500 text-[11px]">
                          {item.unit || "unit"}
                        </td>
                      )}
                      {fieldVisibility.colUnitRate && (
                        <td className="py-3 px-3 text-right font-mono">
                          {formatCurrency(item.rate, quotation.currency)}
                        </td>
                      )}
                      {fieldVisibility.colDiscount && (
                        <td className="py-3 px-3 text-right font-mono text-slate-600">
                          {item.discount > 0
                            ? item.discountType === "percent"
                              ? `${item.discount}%`
                              : formatCurrency(item.discount, quotation.currency)
                            : "-"}
                        </td>
                      )}
                      {fieldVisibility.colTaxRate && (
                        <td className="py-3 px-3 text-right font-mono text-slate-600">
                          {item.taxRate > 0 ? `${item.taxRate}%` : "-"}
                        </td>
                      )}
                      {fieldVisibility.colAmount && (
                        <td className="py-3 px-3 text-right font-bold font-mono text-slate-900">
                          {formatCurrency(item.amount, quotation.currency)}
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODE 2: SIMPLE 2-COLUMN FEE SCHEDULE */}
      {itemsDisplayMode === "simple-list" && (
        <div className="mb-8 space-y-4">
          <div className="border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Scope of Services & Deliverables</span>
            <span>Fee</span>
          </div>
          <div className="divide-y divide-slate-100">
            {quotation.items.map((item, idx) => (
              <div key={item.id} className="flex justify-between items-start py-3.5 gap-4">
                <div className="max-w-xl">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    {fieldVisibility.colItemNumber && (
                      <span className="text-slate-400 font-mono text-xs">{idx + 1}.</span>
                    )}
                    <span>{item.name}</span>
                  </div>
                  {item.description && (
                    <div className="text-slate-500 text-xs mt-1 leading-relaxed whitespace-pre-line pl-4">
                      {item.description}
                    </div>
                  )}
                </div>
                <div className="text-right font-mono font-bold text-slate-900 text-sm shrink-0">
                  {formatCurrency(item.amount, quotation.currency)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: DELIVERABLE / PACKAGE CARDS */}
      {itemsDisplayMode === "cards" && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotation.items.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {item.unit || `Package #${idx + 1}`}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {formatCurrency(item.amount, quotation.currency)}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                {item.description && (
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
              {item.quantity > 1 && (
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                  <span>Scope Volume:</span>
                  <span className="font-medium text-slate-700">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODE 4: MILESTONE PHASE SCHEDULE */}
      {itemsDisplayMode === "milestones" && (
        <div className="mb-8 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Project Implementation & Milestone Payment Schedule
          </div>
          {quotation.items.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="h-7 w-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shrink-0"
                  style={{ backgroundColor: design.primaryColor }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  {item.description && (
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                  Milestone Amount
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {formatCurrency(item.amount, quotation.currency)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODE 5: PURE LUMP-SUM NARRATIVE SCOPE (NO TABLE AT ALL) */}
      {itemsDisplayMode === "none" && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/70 p-6">
          <span
            className="inline-block rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200"
          >
            Project Engagement Scope & Investment
          </span>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Scope of Work & Deliverables</h3>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
            {quotation.introduction ||
              "All professional services, consultations, architecture, and turnkey project deliverables as agreed upon in the commercial specification."}
          </p>
        </div>
      )}

      {/* SUMMARY & FINANCIAL TOTALS SECTION */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Left Side: Amount in Words & Bank Coordinates */}
        <div className="flex flex-col justify-between text-xs space-y-4">
          {fieldVisibility.amountInWords && totals.amountInWords && (
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Amount in Words
              </span>
              <p className="font-medium italic text-slate-800 leading-snug">
                {totals.amountInWords}
              </p>
            </div>
          )}

          {fieldVisibility.bankDetails && quotation.company.bankDetails && (
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Bank Remittance Coordinates
              </span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-600 font-mono text-[11px]">
                <span>Bank Name:</span>
                <span className="text-slate-800 font-medium">{quotation.company.bankDetails.bankName}</span>
                <span>Account Holder:</span>
                <span className="text-slate-800">{quotation.company.bankDetails.accountHolder}</span>
                <span>Account No:</span>
                <span className="text-slate-900 font-bold">{quotation.company.bankDetails.accountNumber}</span>
                <span>Routing / IFSC:</span>
                <span className="text-slate-800">{quotation.company.bankDetails.routingOrIfsc}</span>
                {quotation.company.bankDetails.swiftOrBic && (
                  <>
                    <span>SWIFT / BIC:</span>
                    <span className="text-slate-800">{quotation.company.bankDetails.swiftOrBic}</span>
                  </>
                )}
                {quotation.company.bankDetails.iban && (
                  <>
                    <span>IBAN:</span>
                    <span className="text-slate-800">{quotation.company.bankDetails.iban}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Totals Calculation Box */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 text-xs space-y-2.5">
          {fieldVisibility.subtotal && (
            <div className="flex items-baseline justify-between gap-x-4 text-slate-600">
              <span className="shrink-0 whitespace-nowrap">Subtotal:</span>
              <span className="font-mono font-medium text-right min-w-0">{formatCurrency(totals.subtotal, quotation.currency)}</span>
            </div>
          )}

          {fieldVisibility.documentDiscount && totals.discountTotal > 0 && (
            <div className="flex items-baseline justify-between gap-x-4 text-emerald-600">
              <span className="shrink-0 whitespace-nowrap">Total Discounts:</span>
              <span className="font-mono font-medium text-right min-w-0">- {formatCurrency(totals.discountTotal, quotation.currency)}</span>
            </div>
          )}

          {fieldVisibility.taxBreakdown &&
            totals.taxBreakdown.map((tax) => (
              <div key={tax.name} className="flex items-baseline justify-between gap-x-4 text-slate-600">
                <span className="shrink-0 whitespace-nowrap">{tax.name}:</span>
                <span className="font-mono text-right min-w-0">{formatCurrency(tax.taxAmount, quotation.currency)}</span>
              </div>
            ))}

          {fieldVisibility.additionalCharges && totals.additionalChargesTotal > 0 && (
            <div className="flex items-baseline justify-between gap-x-4 text-slate-600">
              <span className="shrink-0 whitespace-nowrap">Additional Surcharges:</span>
              <span className="font-mono text-right min-w-0">{formatCurrency(totals.additionalChargesTotal, quotation.currency)}</span>
            </div>
          )}

          {fieldVisibility.grandTotal && (
            <div
              className="flex items-baseline justify-between gap-x-4 border-t-2 pt-3 text-sm font-bold"
              style={{ borderColor: design.primaryColor, color: design.primaryColor }}
            >
              <span className="shrink-0 whitespace-nowrap">Grand Total:</span>
              <span className="font-mono text-base text-right min-w-0">
                {formatCurrency(totals.grandTotal, quotation.currency)}
              </span>
            </div>
          )}

          {fieldVisibility.depositRequired && totals.depositRequired > 0 && (
            <div className="flex items-baseline justify-between gap-x-4 text-slate-700 pt-1 border-t border-slate-200/80">
              <span className="shrink-0 whitespace-nowrap">Advance Required:</span>
              <span className="font-mono font-semibold text-right min-w-0">
                {formatCurrency(totals.depositRequired, quotation.currency)}
              </span>
            </div>
          )}

          {fieldVisibility.balanceDue && totals.balanceDue > 0 && (
            <div className="flex items-baseline justify-between gap-x-4 text-slate-500">
              <span className="shrink-0 whitespace-nowrap">Balance Due:</span>
              <span className="font-mono text-right min-w-0">
                {formatCurrency(totals.balanceDue, quotation.currency)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* REUSABLE SECTIONS / TERMS */}
      {fieldVisibility.termsAndConditions &&
        quotation.sections &&
        quotation.sections.filter((s) => s.isVisible).length > 0 && (
          <div className="mb-8 border-t border-slate-200 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Terms & Conditions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {quotation.sections
                .filter((s) => s.isVisible)
                .map((section) => (
                  <div key={section.id} className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                    <h5 className="font-bold text-slate-800 mb-1">{section.title}</h5>
                    <p className="text-slate-600 leading-relaxed">{section.content}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* SIGNATURE & STAMP & QR CODE FOOTER */}
      <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-end justify-between gap-6 text-xs">
        {/* QR Code */}
        {fieldVisibility.qrCode && design.showQrCode && qrDataUrl && (
          <div className="flex items-center gap-3">
            <img src={qrDataUrl} alt="Verification QR Code" className="h-20 w-20 rounded border border-slate-200 p-1" />
            <div className="text-[11px] text-slate-500 max-w-[140px] leading-tight">
              Scan to verify quotation details or authenticate digitally.
            </div>
          </div>
        )}

        {/* Authorized Signature & Stamp */}
        <div className="flex items-center gap-8 text-center ml-auto">
          {fieldVisibility.companyStamp && design.showCompanyStamp && (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 uppercase font-bold p-1">
                {quotation.companyStamp ? (
                  <img src={quotation.companyStamp} alt="Stamp" className="h-full w-full object-contain" />
                ) : (
                  <span>Official Seal</span>
                )}
              </div>
              <span className="mt-2 text-[10px] text-slate-400 uppercase tracking-wider">
                Corporate Stamp
              </span>
            </div>
          )}

          {fieldVisibility.signatureBlock && design.showSignatureBlock && (
            <div className="flex flex-col items-center">
              <div className="h-16 w-40 border-b border-slate-400 flex items-end justify-center pb-1">
                {quotation.authorizedSignature ? (
                  <img
                    src={quotation.authorizedSignature}
                    alt="Authorized Signature"
                    className="max-h-14 max-w-full object-contain"
                  />
                ) : (
                  <span className="font-serif italic text-base text-slate-700">
                    {quotation.company.authorizedPerson || "Authorized Signatory"}
                  </span>
                )}
              </div>
              <span className="mt-1 font-semibold text-slate-800 text-[11px]">
                {quotation.company.authorizedPerson || "Authorized Signatory"}
              </span>
              <span className="text-[10px] text-slate-400">
                {quotation.company.authorizedPersonTitle || "Executive Director"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

