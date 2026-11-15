import React from "react";
import Link from "next/link";
import { Shield, Cpu, CheckCircle, Mail, LifeBuoy, Bug } from "lucide-react";
import { Logo } from "./Logo";
import { AdBanner } from "@/components/ads/AdBanner";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 no-print">
      {/* ADVERTISEMENT SLOT 5: Global Pre-Footer Fluid Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-4">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <AdBanner slotId="global-pre-footer" format="horizontal" />
        </div>
      </div>

      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Privacy Statement */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center transition hover:opacity-95">
              <Logo size="md" theme="dark" showSubtitle={true} />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              The professional quotation builder and document designer.
              Create, customize, calculate, and download client-ready PDF quotes
              with enterprise formatting and ease.
            </p>

            {/* Support & Bug Reporting */}
            <div className="mt-5 rounded-xl bg-slate-800/80 p-4 border border-slate-700/60 max-w-sm">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1.5">
                <LifeBuoy className="h-4 w-4 text-blue-400" />
                Support & Bug Reporting
              </span>
              <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">
                Need help or encountered a bug? Email our support team:
              </p>
              <a
                href="mailto:nestmategroup@gmail.com?subject=QuoteCraft%20Support%20%2F%20Bug%20Report"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                nestmategroup@gmail.com
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/editor" className="hover:text-white transition">
                  Create Quotation
                </Link>
              </li>
              <li>
                <Link href="/free-quotation-maker" className="hover:text-white transition">
                  Free Quotation Maker
                </Link>
              </li>
              <li>
                <Link href="/quotation-generator" className="hover:text-white transition">
                  Quotation Generator
                </Link>
              </li>
              <li>
                <Link href="/quotation-pdf-maker" className="hover:text-white transition">
                  PDF Quote Generator
                </Link>
              </li>
              <li>
                <Link href="/my-quotations" className="hover:text-white transition">
                  My Quotations
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition">
                  Template Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Templates & Categories */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Templates</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/templates/business" className="hover:text-white transition">
                  Business & Corporate
                </Link>
              </li>
              <li>
                <Link href="/templates/construction" className="hover:text-white transition">
                  Construction & Bids
                </Link>
              </li>
              <li>
                <Link href="/templates/it-services" className="hover:text-white transition">
                  IT & Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/templates/freelance" className="hover:text-white transition">
                  Freelance & Creative
                </Link>
              </li>
              <li>
                <Link href="/templates/interior-design" className="hover:text-white transition">
                  Interior Design & FF&E
                </Link>
              </li>
              <li>
                <Link href="/templates/software-development" className="hover:text-white transition">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/templates/retail" className="hover:text-white transition">
                  Wholesale & Retail
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Resources & Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/guides" className="hover:text-white transition">
                  Quotation Guides
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-create-a-professional-quotation" className="hover:text-white transition">
                  Quotation Best Practices
                </Link>
              </li>
              <li>
                <Link href="/guides/quotation-vs-invoice" className="hover:text-white transition">
                  Quotation vs Invoice
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <a
                  href="mailto:nestmategroup@gmail.com?subject=QuoteCraft%20Support%20%2F%20Bug%20Report"
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition font-medium"
                >
                  <Bug className="h-3.5 w-3.5" />
                  <span>Report Bug / Support</span>
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="mt-12 border-t border-slate-800 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} QuoteCraft. All rights reserved. Built for global businesses, freelancers, and enterprises.
          </p>
          <div className="mt-4 flex items-center gap-6 sm:mt-0 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              Verified Calculations
            </span>
            <span className="flex items-center gap-1">
              <HardDrive className="h-3.5 w-3.5 text-blue-400" />
              PDF Ready
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-purple-400" />
              Decimal.js Engine
            </span>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

