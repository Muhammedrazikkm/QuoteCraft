"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { POPULAR_CURRENCIES } from "@/lib/formatting/currency";
import {
  Settings,
  Building2,
  Save,
  CheckCircle2,
  ShieldCheck,
  Sliders,
  Bug,
  Mail,
  LifeBuoy,
} from "lucide-react";

export default function SettingsPage() {
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [numberingPrefix, setNumberingPrefix] = useState("QT-2026-");
  const [defaultValidityDays, setDefaultValidityDays] = useState(30);
  const [defaultTaxRate, setDefaultTaxRate] = useState(10);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load existing settings
    db.settings.get("app_preferences").then((entry) => {
      if (entry && entry.value) {
        if (entry.value.defaultCurrency) setDefaultCurrency(entry.value.defaultCurrency);
        if (entry.value.numberingPrefix) setNumberingPrefix(entry.value.numberingPrefix);
        if (entry.value.defaultValidityDays) setDefaultValidityDays(entry.value.defaultValidityDays);
        if (entry.value.defaultTaxRate !== undefined) setDefaultTaxRate(entry.value.defaultTaxRate);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.settings.put({
      key: "app_preferences",
      value: {
        defaultCurrency,
        numberingPrefix,
        defaultValidityDays,
        defaultTaxRate,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Settings Navigation Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Application Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure system defaults and business profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/settings/companies"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            <Building2 className="h-4 w-4 text-blue-600" />
            <span>Company Profiles</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: General Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6"
          >
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Quotation & Financial Defaults</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Currency
                </label>
                <select
                  value={defaultCurrency}
                  onChange={(e) => setDefaultCurrency(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  {POPULAR_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol}) - {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Default currency applied to all newly created quotations.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Quotation Number Prefix Format
                </label>
                <input
                  type="text"
                  value={numberingPrefix}
                  onChange={(e) => setNumberingPrefix(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                  placeholder="QT-2026-"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Prefix pattern for auto-generated quotation numbering schemes.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Validity Window (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={defaultValidityDays}
                  onChange={(e) => setDefaultValidityDays(parseInt(e.target.value) || 30)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Number of calendar days after issuance before quote expiry.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Standard Tax Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={defaultTaxRate}
                  onChange={(e) => setDefaultTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Default percentage applied to new quotation line items.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {isSaved ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Preferences saved successfully!
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
              >
                <Save className="h-4 w-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Configuration Overview & Support */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Workspace Preferences</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Customize standard defaults applied across all your quotations, including default currency, quotation numbering, and standard tax rates.
            </p>
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs text-slate-600 space-y-1">
              <p>• Currency: <strong>{defaultCurrency}</strong></p>
              <p>• Numbering Prefix: <strong>{numberingPrefix}</strong></p>
              <p>• Validity Window: <strong>{defaultValidityDays} Days</strong></p>
            </div>
          </div>

          {/* Support & Bug Reporting Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Bug className="h-4 w-4 text-rose-500" />
              <span>Support & Bug Reporting</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Need technical help, custom invoice/quotation formatting, or found a bug? Reach out to our team directly:
            </p>
            <a
              href="mailto:nestmategroup@gmail.com?subject=QuoteCraft%20Support%20%2F%20Bug%20Report"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition w-full"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>nestmategroup@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

