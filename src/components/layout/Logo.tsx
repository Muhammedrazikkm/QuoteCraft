import React from "react";

interface LogoProps {
  variant?: "full" | "icon" | "mark-only";
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  showSubtitle?: boolean;
  className?: string;
}

/**
 * High-definition vector emblem for QuoteCraft.
 * Matches the official favicon.svg and brand identity.
 */
export function LogoMark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensionMap = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 ${dimensionMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient
            id="logo-bg-grad"
            x1="0"
            y1="0"
            x2="512"
            y2="512"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          <linearGradient
            id="logo-doc-grad"
            x1="120"
            y1="90"
            x2="380"
            y2="430"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <linearGradient
            id="logo-fold-grad"
            x1="290"
            y1="90"
            x2="370"
            y2="170"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="logo-cyan-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Base Squircle */}
        <rect width="512" height="512" rx="118" fill="url(#logo-bg-grad)" />
        <rect
          x="6"
          y="6"
          width="500"
          height="500"
          rx="112"
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="10"
          fill="none"
        />

        {/* Document Sheet */}
        <path
          d="M 148 100 C 134 100 124 110 124 124 L 124 388 C 124 402 134 412 148 412 L 364 412 C 378 412 388 402 388 388 L 388 184 L 304 100 Z"
          fill="url(#logo-doc-grad)"
        />

        {/* Fold Corner */}
        <path
          d="M 304 100 L 304 172 C 304 178 310 184 316 184 L 388 184 Z"
          fill="url(#logo-fold-grad)"
        />

        {/* Quotation Marks */}
        <path
          d="M 166 206 C 166 176 182 156 208 150 L 212 162 C 196 166 188 176 186 188 L 204 188 C 210 188 214 192 214 198 L 214 220 C 214 226 210 230 204 230 L 176 230 C 170 230 166 226 166 220 Z"
          fill="#2563eb"
        />
        <path
          d="M 226 206 C 226 176 242 156 268 150 L 272 162 C 256 166 248 176 246 188 L 264 188 C 270 188 274 192 274 198 L 274 220 C 274 226 270 230 264 230 L 236 230 C 230 230 226 226 226 220 Z"
          fill="#2563eb"
        />

        {/* Line Items */}
        <rect
          x="166"
          y="252"
          width="180"
          height="14"
          rx="7"
          fill="#2563eb"
          fillOpacity="0.85"
        />
        <rect x="166" y="280" width="135" height="11" rx="5.5" fill="#94a3b8" />
        <rect x="316" y="280" width="30" height="11" rx="5.5" fill="#64748b" />
        <rect x="166" y="304" width="105" height="11" rx="5.5" fill="#94a3b8" />
        <rect x="316" y="304" width="30" height="11" rx="5.5" fill="#64748b" />

        {/* Accent Check Badge */}
        <circle
          cx="372"
          cy="372"
          r="48"
          fill="url(#logo-cyan-grad)"
          stroke="#ffffff"
          strokeWidth="8"
        />
        <path
          d="M 354 372 L 366 384 L 392 358"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Complete Brand Logo with Emblem and Typography
 */
export function Logo({
  variant = "full",
  size = "md",
  theme = "light",
  showSubtitle = true,
  className = "",
}: LogoProps) {
  if (variant === "icon" || variant === "mark-only") {
    return <LogoMark size={size} className={className} />;
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const isDark = theme === "dark";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <div className="flex flex-col text-left">
        <span
          className={`font-bold tracking-tight leading-none ${textSizes[size]} ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Quote
          <span className={isDark ? "text-blue-400" : "text-blue-600"}>
            Craft
          </span>
        </span>
        {showSubtitle && (
          <span
            className={`mt-1 text-[10px] font-semibold tracking-wider uppercase leading-none ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Quotation Builder
          </span>
        )}
      </div>
    </div>
  );
}

