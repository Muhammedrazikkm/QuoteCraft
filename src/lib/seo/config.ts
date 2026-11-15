export const SITE_CONFIG = {
  name: "QuoteCraft",
  domain: "https://quotecraft.app",
  titleTemplate: "%s | QuoteCraft - Professional Quotation Maker",
  defaultTitle: "QuoteCraft — Free Online Quotation Maker & Professional PDF Generator",
  defaultDescription:
    "Create, customize, and download professional business quotations in minutes. Built-in financial calculation engine, 14+ ready templates, multi-page PDF generation, and clean formatting. Free forever without account registration.",
  keywords: [
    "free quotation maker online",
    "quotation generator",
    "create quotation PDF online",
    "free quotation template",
    "business quotation maker",
    "professional quotation format",
    "estimate generator",
    "custom quotation builder",
    "quotation software",
    "quotation maker for small businesses",
    "quotation generator for freelancers",
    "contractor quotation template",
    "IT service quotation template",
    "GST quotation maker India",
  ],
  author: "QuoteCraft Development Team",
  twitterHandle: "@quotecraftapp",
};

export function generateSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QuoteCraft",
    image: "https://quotecraft.app/logo.svg",
    operatingSystem: "Web Browser, Windows, macOS, Linux, Android, iOS",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
    description:
      "A privacy-focused, browser-based quotation builder and document designer with multi-page PDF generation, offline PWA capability, and dynamic financial calculations.",
    featureList: [
      "No account or login required",
      "Instant workspace management",
      "Precision financial engine with decimal.js",
      "Dynamic multi-currency & tax rate calculations",
      "Multi-page vector and image PDF generation",
      "Visual drag and drop template designer",
      "Automated tax calculation and precision pricing",
    ],
  };
}

export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : `${SITE_CONFIG.domain}${crumb.item}`,
    })),
  };
}

