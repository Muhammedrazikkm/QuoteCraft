import React from "react";
import Link from "next/link";
import { FileQuestion, Home, PlusCircle, LayoutTemplate } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Page Not Found (404)
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-600 leading-relaxed">
        The quotation resource or public page you requested does not exist or may have been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create Quotation</span>
        </Link>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <LayoutTemplate className="h-4 w-4" />
          <span>Browse Templates</span>
        </Link>
      </div>
    </div>
  );
}

