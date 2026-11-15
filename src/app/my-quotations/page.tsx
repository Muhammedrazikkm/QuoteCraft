"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { Quotation, QuotationStatus } from "@/types";
import { calculateQuotationTotals } from "@/lib/calculations/financial";
import { formatCurrency } from "@/lib/formatting/currency";
import { formatDate } from "@/lib/formatting/dates";
import { exportSingleQuotation } from "@/lib/backup";
import {
  FileText,
  Search,
  Filter,
  PlusCircle,
  LayoutGrid,
  List,
  Trash2,
  Copy,
  Edit,
  Download,
  Archive,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpDown,
} from "lucide-react";

export default function MyQuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"updatedAt" | "createdAt" | "amount">("updatedAt");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Load from IndexedDB
  const fetchQuotations = async () => {
    try {
      setIsLoading(true);
      const list = await db.quotations.toArray();
      setQuotations(list);
    } catch (err) {
      console.error("Failed to load quotations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  // Filter & Sort
  const filteredQuotations = quotations
    .filter((q) => {
      const matchSearch =
        q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.customer.company && q.customer.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "all" || q.status === statusFilter;

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "updatedAt") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "amount") {
        const totA = calculateQuotationTotals(a.items).grandTotal;
        const totB = calculateQuotationTotals(b.items).grandTotal;
        return totB - totA;
      }
      return 0;
    });

  // Actions
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      await db.quotations.delete(id);
      fetchQuotations();
    }
  };

  const handleDuplicate = async (quotation: Quotation) => {
    const dup: Quotation = {
      ...JSON.parse(JSON.stringify(quotation)),
      id: `quo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      quotationNumber: `${quotation.quotationNumber}-COPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "draft",
    };
    await db.quotations.put(dup);
    fetchQuotations();
  };

  const handleStatusChange = async (id: string, newStatus: QuotationStatus) => {
    const target = quotations.find((q) => q.id === id);
    if (target) {
      const updated = { ...target, status: newStatus, updatedAt: new Date().toISOString() };
      await db.quotations.put(updated);
      fetchQuotations();
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Delete ${selectedIds.length} selected quotations permanently?`)) {
      await Promise.all(selectedIds.map((id) => db.quotations.delete(id)));
      setSelectedIds([]);
      fetchQuotations();
    }
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Quotations
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Your business proposals, estimates, and commercial quotations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create New Quotation</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by quote #, client, company..."
              className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Controls: Status, Sort, View */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none"
            >
              <option value="updatedAt">Sort: Recently Modified</option>
              <option value="createdAt">Sort: Created Date</option>
              <option value="amount">Sort: Highest Amount</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-slate-200 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === "grid" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === "list" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400"
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <span className="font-semibold text-slate-700">
              {selectedIds.length} quotation{selectedIds.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBulkDelete}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 text-red-600 px-3 py-1.5 font-semibold hover:bg-red-100 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quotations Content */}
      {isLoading ? (
        <div className="flex py-20 items-center justify-center text-slate-500">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-600 mr-2" />
          Loading records...
        </div>
      ) : filteredQuotations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-16 px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Quotations Found</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            {searchQuery
              ? "No quotations match your current search criteria."
              : "You haven't created any quotations yet. Start with a pre-designed template or create a blank one."}
          </p>
          <div className="mt-6">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create Your First Quotation</span>
            </Link>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotations.map((q) => {
            const totals = calculateQuotationTotals(q.items, {
              documentDiscount: q.documentDiscount,
              documentDiscountType: q.documentDiscountType,
              documentTaxType: q.taxType,
              additionalCharges: q.additionalCharges,
              currencyCode: q.currency,
            });

            return (
              <div
                key={q.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      {q.quotationNumber}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                        q.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : q.status === "sent"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : q.status === "rejected"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition truncate">
                    {q.title || "Quotation"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 truncate">
                    Client: <span className="text-slate-800">{q.customer.name}</span>
                    {q.customer.company && ` (${q.customer.company})`}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Issuer: <span className="text-slate-600">{q.company.name}</span>
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Total Amount
                      </span>
                      <span className="font-mono font-bold text-lg text-slate-900">
                        {formatCurrency(totals.grandTotal, q.currency)}
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      <span>Valid until:</span>
                      <p className="font-medium text-slate-600">{formatDate(q.expiryDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(q)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    {/* <button
                      type="button"
                      onClick={() => exportSingleQuotation(q)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      title="Export JSON"
                    >
                      <Download className="h-4 w-4" />
                    </button> */}
                    <button
                      type="button"
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Link
                    href={`/editor?id=${q.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 font-semibold text-white hover:bg-blue-600 transition text-xs"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Open Editor</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3 px-4 font-semibold w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredQuotations.length &&
                      filteredQuotations.length > 0
                    }
                    onChange={(e) =>
                      setSelectedIds(e.target.checked ? filteredQuotations.map((q) => q.id) : [])
                    }
                    className="rounded text-blue-600"
                  />
                </th>
                <th className="py-3 px-4 font-semibold">Quote #</th>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Total</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotations.map((q) => {
                const totals = calculateQuotationTotals(q.items, {
                  documentDiscount: q.documentDiscount,
                  documentDiscountType: q.documentDiscountType,
                  documentTaxType: q.taxType,
                  additionalCharges: q.additionalCharges,
                  currencyCode: q.currency,
                });
                const isSelected = selectedIds.includes(q.id);

                return (
                  <tr key={q.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, q.id]);
                          } else {
                            setSelectedIds(selectedIds.filter((id) => id !== q.id));
                          }
                        }}
                        className="rounded text-blue-600"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                      {q.quotationNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {q.customer.name}
                      {q.customer.company && (
                        <span className="block text-[11px] text-slate-400">
                          {q.customer.company}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {q.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {formatDate(q.issueDate)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                          q.status === "accepted"
                            ? "bg-emerald-50 text-emerald-700"
                            : q.status === "sent"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrency(totals.grandTotal, q.currency)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/editor?id=${q.id}`}
                          className="p-1 rounded text-slate-500 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(q)}
                          className="p-1 rounded text-slate-500 hover:text-slate-800"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(q.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

