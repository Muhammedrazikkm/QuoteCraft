"use client";

import React, { useState, useEffect } from "react";
import { db, DEFAULT_CUSTOMER } from "@/lib/db";
import { Customer } from "@/types";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit,
  Mail,
  Phone,
  Building,
  MapPin,
  Check,
  X,
  FileSpreadsheet,
} from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      let list = await db.customers.toArray();
      if (list.length === 0) {
        // Seed default customer if empty
        await db.customers.put(DEFAULT_CUSTOMER);
        list = [DEFAULT_CUSTOMER];
      }
      setCustomers(list);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const customerToSave: Customer = {
      ...editingCustomer,
      updatedAt: new Date().toISOString(),
    };

    await db.customers.put(customerToSave);
    setIsModalOpen(false);
    setEditingCustomer(null);
    fetchCustomers();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await db.customers.delete(id);
      fetchCustomers();
    }
  };

  const openNewCustomerModal = () => {
    setEditingCustomer({
      id: `cust-${Date.now()}`,
      name: "",
      company: "",
      contactPerson: "",
      billingAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      email: "",
      phone: "",
      taxId: "",
      referenceNumber: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cust: Customer) => {
    setEditingCustomer({ ...cust });
    setIsModalOpen(true);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Customer Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your clients, procurement contacts, and billing coordinates.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewCustomerModal}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by customer name, company, email..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <Users className="mx-auto h-10 w-10 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900">No Customers Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Add customers to automatically populate quotations with one click.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-base">{customer.name}</h3>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(customer)}
                      className="p-1 rounded text-slate-400 hover:text-blue-600"
                      title="Edit Customer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(customer.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600"
                      title="Delete Customer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {customer.company && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold mb-2">
                    <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{customer.company}</span>
                  </p>
                )}

                <div className="space-y-1 text-xs text-slate-500">
                  {customer.email && (
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </p>
                  )}
                  {customer.phone && (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{customer.phone}</span>
                    </p>
                  )}
                  {customer.billingAddress && (
                    <p className="flex items-start gap-1.5 mt-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        {customer.billingAddress}, {customer.city} {customer.state}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {customer.taxId && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[11px]">
                  <span className="text-slate-400">Tax ID:</span>
                  <span className="font-mono text-slate-700 font-medium">{customer.taxId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Customer Modal */}
      {isModalOpen && editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingCustomer.name ? "Edit Customer" : "Add New Customer"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Person / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Name"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={editingCustomer.company || ""}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, company: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Acme Corporation"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Billing Address</label>
                  <input
                    type="text"
                    value={editingCustomer.billingAddress}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, billingAddress: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={editingCustomer.city}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editingCustomer.country}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, country: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tax ID / VAT No.</label>
                  <input
                    type="text"
                    value={editingCustomer.taxId || ""}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, taxId: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Account Reference</label>
                  <input
                    type="text"
                    value={editingCustomer.referenceNumber || ""}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, referenceNumber: e.target.value })
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
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

