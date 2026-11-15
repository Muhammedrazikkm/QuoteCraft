import { CurrencyConfig } from "@/types";

export const POPULAR_CURRENCIES: CurrencyConfig[] = [
  { code: "USD", symbol: "$", name: "US Dollar", decimalPlaces: 2, locale: "en-US" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", decimalPlaces: 2, locale: "en-IN" },
  { code: "EUR", symbol: "€", name: "Euro", decimalPlaces: 2, locale: "de-DE" },
  { code: "GBP", symbol: "£", name: "British Pound", decimalPlaces: 2, locale: "en-GB" },
  { code: "AED", symbol: "AED", name: "UAE Dirham", decimalPlaces: 2, locale: "en-AE" },
  { code: "SAR", symbol: "SAR", name: "Saudi Riyal", decimalPlaces: 2, locale: "en-SA" },
  { code: "QAR", symbol: "QAR", name: "Qatari Riyal", decimalPlaces: 2, locale: "en-QA" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar", decimalPlaces: 2, locale: "en-CA" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", decimalPlaces: 2, locale: "en-AU" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", decimalPlaces: 2, locale: "en-SG" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", decimalPlaces: 0, locale: "ja-JP" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", decimalPlaces: 2, locale: "zh-CN" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", decimalPlaces: 2, locale: "de-CH" },
  { code: "ZAR", symbol: "R", name: "South African Rand", decimalPlaces: 2, locale: "en-ZA" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", decimalPlaces: 2, locale: "en-NZ" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", decimalPlaces: 2, locale: "pt-BR" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso", decimalPlaces: 2, locale: "es-MX" },
  { code: "KWD", symbol: "KWD", name: "Kuwaiti Dinar", decimalPlaces: 3, locale: "en-KW" },
  { code: "OMR", symbol: "OMR", name: "Omani Rial", decimalPlaces: 3, locale: "en-OM" },
  { code: "BHD", symbol: "BHD", name: "Bahraini Dinar", decimalPlaces: 3, locale: "en-BH" },
];

/**
 * Format any currency value using Intl.NumberFormat
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "USD",
  customLocale?: string
): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    amount = 0;
  }

  const found = POPULAR_CURRENCIES.find(
    (c) => c.code.toUpperCase() === currencyCode.toUpperCase()
  );

  const locale = customLocale || (found ? found.locale : "en-US");
  const decimals = found ? found.decimalPlaces : 2;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    // Fallback if currency code not recognized by runtime Intl
    const symbol = found ? found.symbol : currencyCode;
    return `${symbol} ${amount.toFixed(decimals)}`;
  }
}

/**
 * Returns currency symbol for a given ISO code
 */
export function getCurrencySymbol(currencyCode: string): string {
  const found = POPULAR_CURRENCIES.find(
    (c) => c.code.toUpperCase() === currencyCode.toUpperCase()
  );
  if (found) return found.symbol;
  try {
    const formatter = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
    });
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find((p) => p.type === "currency");
    return symbolPart ? symbolPart.value : currencyCode;
  } catch {
    return currencyCode;
  }
}

