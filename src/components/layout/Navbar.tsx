"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutTemplate,
  FolderArchive,
  Users,
  Package,
  Settings,
  HelpCircle,
  Menu,
  X,
  PlusCircle,
  ShieldCheck,
  Bug,
  Mail,
} from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "My Quotations", href: "/my-quotations" },
    { label: "Customers", href: "/customers" },
    { label: "Items", href: "/items" },
    { label: "Guides", href: "/guides" },
    { label: "Settings", href: "/settings" },
    { label: "Help", href: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center transition hover:opacity-95">
          <Logo size="md" showSubtitle={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* <div className="hidden items-center gap-1.5 text-xs text-emerald-600 font-medium lg:flex bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Private & Local</span>
          </div> */}
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Quotation</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/editor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create Quotation</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 mt-2">
              <a
                href="mailto:nestmategroup@gmail.com?subject=QuoteCraft%20Support%20%2F%20Bug%20Report"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600"
              >
                <Bug className="h-3.5 w-3.5 text-rose-500" />
                <span>Support &amp; Bugs: nestmategroup@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

