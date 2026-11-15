"use client";

import React, { useState, useEffect } from "react";
import { db, DEFAULT_SAMPLE_ITEMS } from "@/lib/db";
import { QuotationItem } from "@/types";
import { formatCurrency } from "@/lib/formatting/currency";
import {
  Package,
  Search,
  Plus,
  Trash2,
  Edit,
  Copy,
  Tag,
  DollarSign,
  Percent,
  X,
} from "lucide-react";

export default function ItemsLibraryPage() {
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<QuotationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      let list = await db.items.toArray();
      if (list.length === 0) {
        // Seed default items
        await db.items.bulkPut(DEFAULT_SAMPLE_ITEMS);
        list = [...DEFAULT_SAMPLE_ITEMS];
      }
      setItems(list);
    } catch (err) {
      console.error("Failed to load items library:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    await db.items.put(editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this catalog item?")) {
      await db.items.delete(id);
      fetchItems();
    }
  };

  const handleDuplicate = async (item: QuotationItem) => {
    const dup: QuotationItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: `${item.name} (Copy)`,
    };
    await db.items.put(dup);
    fetchItems();
  };

  const openNewItemModal = () => {
    setEditingItem({
      id: `item-${Date.now()}`,
      name: "",
      description: "",
      sku: "",
      quantity: 1,
      unit: "unit",
      rate: 100,
      discount: 0,
      discountType: "percent",
      taxRate: 10,
      taxType: "exclusive",
      amount: 100,
      groupName: "General Services",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: QuotationItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.sku && i.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.groupName && i.groupName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Product & Service Library
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Maintain your reusable rates, deliverable specifications, and service codes.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewItemModal}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Add Catalog Item</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, SKU, category..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Items Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="py-3 px-4 font-semibold">SKU / Code</th>
              <th className="py-3 px-4 font-semibold">Item & Description</th>
              <th className="py-3 px-4 font-semibold">Category / Group</th>
              <th className="py-3 px-4 font-semibold text-right">Standard Rate</th>
              <th className="py-3 px-4 font-semibold text-right">Unit</th>
              <th className="py-3 px-4 font-semibold text-right">Default Tax</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                  {item.sku || "—"}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.name}</div>
                  {item.description && (
                    <div className="text-slate-500 line-clamp-1 mt-0.5">{item.description}</div>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {item.groupName || "General"}
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                  {formatCurrency(item.rate, "USD")}
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                  {item.unit}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                  {item.taxRate}%
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-1 rounded text-slate-400 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(item)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700"
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingItem.name ? "Edit Item" : "Add Catalog Item"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description / Specification
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SKU / Code</label>
                  <input
                    type="text"
                    value={editingItem.sku || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, sku: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                    placeholder="e.g. SRV-01"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category / Phase</label>
                  <input
                    type="text"
                    value={editingItem.groupName || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, groupName: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Design & UX"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit Rate</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={editingItem.rate}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, rate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit Label</label>
                  <input
                    type="text"
                    required
                    value={editingItem.unit}
                    onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="hrs, pcs, sq ft"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editingItem.taxRate}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, taxRate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

