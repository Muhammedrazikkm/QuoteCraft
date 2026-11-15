"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db, DEFAULT_COMPANY } from "@/lib/db";
import { CompanyProfile } from "@/types";
import {
  Building2,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Copy,
  Star,
  ArrowLeft,
  X,
  CreditCard,
  Mail,
  Phone,
  Globe,
  Upload,
} from "lucide-react";

export default function CompaniesSettingsPage() {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState<CompanyProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      let list = await db.companies.toArray();
      if (list.length === 0) {
        // Seed default company
        await db.companies.put(DEFAULT_COMPANY);
        list = [DEFAULT_COMPANY];
      }
      setCompanies(list);
    } catch (err) {
      console.error("Failed to load companies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;

    const companyToSave: CompanyProfile = {
      ...editingCompany,
      updatedAt: new Date().toISOString(),
    };

    if (companyToSave.isDefault) {
      // Unset other defaults
      await Promise.all(
        companies.map((c) =>
          c.id !== companyToSave.id && c.isDefault
            ? db.companies.update(c.id, { isDefault: false })
            : Promise.resolve()
        )
      );
    }

    await db.companies.put(companyToSave);
    setIsModalOpen(false);
    setEditingCompany(null);
    fetchCompanies();
  };

  const handleSetDefault = async (id: string) => {
    await Promise.all(
      companies.map((c) =>
        db.companies.update(c.id, { isDefault: c.id === id })
      )
    );
    fetchCompanies();
  };

  const handleDelete = async (id: string) => {
    if (companies.length <= 1) {
      alert("You must keep at least one company profile.");
      return;
    }
    if (confirm("Delete this company profile?")) {
      await db.companies.delete(id);
      fetchCompanies();
    }
  };

  const openNewCompanyModal = () => {
    setEditingCompany({
      id: `comp-${Date.now()}`,
      name: "",
      tagline: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      email: "",
      phone: "",
      website: "",
      taxRegistrationId: "",
      businessRegistrationId: "",
      authorizedPerson: "",
      authorizedPersonTitle: "",
      bankDetails: {
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        routingOrIfsc: "",
      },
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (comp: CompanyProfile) => {
    setEditingCompany(JSON.parse(JSON.stringify(comp)));
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Company Profiles
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage multi-brand identities, official seals, tax IDs, and remittance coordinates.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openNewCompanyModal}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Add Company Profile</span>
        </button>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((comp) => (
          <div
            key={comp.id}
            className={`rounded-2xl border p-6 bg-white shadow-xs transition flex flex-col justify-between ${
              comp.isDefault
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  {comp.logo ? (
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="h-12 w-12 object-contain rounded-lg border border-slate-200 p-1 bg-white"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 border border-slate-200">
                      <Building2 className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{comp.name}</h3>
                    {comp.tagline && (
                      <p className="text-xs text-slate-500 font-medium">{comp.tagline}</p>
                    )}
                  </div>
                </div>

                {comp.isDefault && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                    <Star className="h-3 w-3 fill-blue-600" />
                    Default
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <p>{comp.address}</p>
                <p>
                  {comp.city}, {comp.state} {comp.postalCode}, {comp.country}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{comp.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{comp.phone}</span>
                  </p>
                  {comp.taxRegistrationId && (
                    <p className="font-mono text-slate-500">Tax ID: {comp.taxRegistrationId}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              {!comp.isDefault ? (
                <button
                  type="button"
                  onClick={() => handleSetDefault(comp.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-slate-400 font-medium">Active Default Profile</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(comp)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Edit Profile
                </button>
                {!comp.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comp.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete Profile"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingCompany.name ? "Edit Company Profile" : "Add Company Profile"}
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
              {/* Logo Upload Section */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center gap-4">
                {editingCompany.logo ? (
                  <div className="relative group shrink-0">
                    <img
                      src={editingCompany.logo}
                      alt="Company Logo Preview"
                      className="h-14 w-14 object-contain rounded-lg border border-slate-200 bg-white p-1"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingCompany({ ...editingCompany, logo: "" })}
                      className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-rose-500 text-white shadow-xs hover:bg-rose-600"
                      title="Remove Logo"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-14 w-14 rounded-lg border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 shrink-0">
                    <Building2 className="h-5 w-5 text-slate-400" />
                    <span className="text-[9px] font-semibold mt-0.5">No Logo</span>
                  </div>
                )}

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition cursor-pointer">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{editingCompany.logo ? "Change Logo" : "Upload Logo"}</span>
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
                              setEditingCompany({ ...editingCompany, logo: result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>

                    {editingCompany.logo && (
                      <button
                        type="button"
                        onClick={() => setEditingCompany({ ...editingCompany, logo: "" })}
                        className="text-xs font-semibold text-rose-600 hover:underline px-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Upload your official company brand logo (PNG, JPG, SVG, WebP).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCompany.name}
                    onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingCompany.tagline || ""}
                    onChange={(e) => setEditingCompany({ ...editingCompany, tagline: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={editingCompany.address}
                    onChange={(e) => setEditingCompany({ ...editingCompany, address: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={editingCompany.city}
                    onChange={(e) => setEditingCompany({ ...editingCompany, city: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State / Province</label>
                  <input
                    type="text"
                    value={editingCompany.state}
                    onChange={(e) => setEditingCompany({ ...editingCompany, state: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={editingCompany.postalCode}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, postalCode: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editingCompany.country}
                    onChange={(e) => setEditingCompany({ ...editingCompany, country: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingCompany.email}
                    onChange={(e) => setEditingCompany({ ...editingCompany, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editingCompany.phone}
                    onChange={(e) => setEditingCompany({ ...editingCompany, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tax Registration (GSTIN/VAT/EIN)
                  </label>
                  <input
                    type="text"
                    value={editingCompany.taxRegistrationId || ""}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, taxRegistrationId: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Authorized Signatory
                  </label>
                  <input
                    type="text"
                    value={editingCompany.authorizedPerson || ""}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, authorizedPerson: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingCompany.isDefault}
                    onChange={(e) =>
                      setEditingCompany({ ...editingCompany, isDefault: e.target.checked })
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Make this the default profile for new quotations</span>
                </label>
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

