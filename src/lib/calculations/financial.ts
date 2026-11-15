import Decimal from "decimal.js";
import { QuotationItem, AdditionalCharge, FinancialCalculationResult, TaxBreakdown } from "@/types";

// Configure Decimal.js precision
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

export interface CalculationOptions {
  documentDiscount?: number;
  documentDiscountType?: "percent" | "fixed";
  documentTaxType?: "exclusive" | "inclusive";
  additionalCharges?: AdditionalCharge[];
  depositAmount?: number;
  depositType?: "percent" | "fixed";
  currencyCode?: string;
  precision?: number;
  lumpSumAmount?: number;
}

/**
 * Calculates line-item totals, document discounts, taxes breakdown,
 * additional charges, and balance due using Decimal.js for precise financial math.
 */
export function calculateQuotationTotals(
  items: QuotationItem[],
  options: CalculationOptions = {}
): FinancialCalculationResult {
  const {
    documentDiscount = 0,
    documentDiscountType = "fixed",
    documentTaxType = "exclusive",
    additionalCharges = [],
    depositAmount = 0,
    depositType = "fixed",
    currencyCode = "USD",
    precision = 2,
  } = options;

  let rawSubtotal = new Decimal(0);
  let totalItemDiscounts = new Decimal(0);
  const taxMap = new Map<string, { rate: Decimal; taxable: Decimal; tax: Decimal }>();

  if (items.length === 0 && options.lumpSumAmount && options.lumpSumAmount > 0) {
    rawSubtotal = new Decimal(options.lumpSumAmount);
  }

  // Process each line item
  items.forEach((item) => {
    const qty = new Decimal(item.quantity || 0);
    const rate = new Decimal(item.rate || 0);
    const lineGross = qty.mul(rate);
    rawSubtotal = rawSubtotal.plus(lineGross);

    // Calculate line discount
    let lineDiscount = new Decimal(0);
    if (item.discount > 0) {
      if (item.discountType === "percent") {
        lineDiscount = lineGross.mul(new Decimal(item.discount).dividedBy(100));
      } else {
        lineDiscount = new Decimal(item.discount);
      }
      if (lineDiscount.greaterThan(lineGross)) {
        lineDiscount = lineGross;
      }
    }
    totalItemDiscounts = totalItemDiscounts.plus(lineDiscount);
    const lineNet = lineGross.minus(lineDiscount);

    // Line tax calculation
    const taxRate = new Decimal(item.taxRate || 0);
    if (taxRate.greaterThan(0) && item.taxType !== "exempt") {
      const taxKey = `${taxRate.toFixed(2)}%`;
      let taxableForLine = lineNet;
      let calculatedTax = new Decimal(0);

      if (documentTaxType === "inclusive" || item.taxType === "inclusive") {
        // Price includes tax: Tax = Net - (Net / (1 + Rate / 100))
        const divisor = new Decimal(1).plus(taxRate.dividedBy(100));
        taxableForLine = lineNet.dividedBy(divisor);
        calculatedTax = lineNet.minus(taxableForLine);
      } else {
        // Exclusive tax: Tax = Net * (Rate / 100)
        calculatedTax = lineNet.mul(taxRate.dividedBy(100));
      }

      if (!taxMap.has(taxKey)) {
        taxMap.set(taxKey, { rate: taxRate, taxable: new Decimal(0), tax: new Decimal(0) });
      }
      const existing = taxMap.get(taxKey)!;
      existing.taxable = existing.taxable.plus(taxableForLine);
      existing.tax = existing.tax.plus(calculatedTax);
    }
  });

  // Calculate document-level discount
  let overallDiscount = new Decimal(0);
  if (documentDiscount > 0) {
    if (documentDiscountType === "percent") {
      const netAfterItemDiscount = rawSubtotal.minus(totalItemDiscounts);
      overallDiscount = netAfterItemDiscount.mul(new Decimal(documentDiscount).dividedBy(100));
    } else {
      overallDiscount = new Decimal(documentDiscount);
    }
  }

  const combinedDiscount = totalItemDiscounts.plus(overallDiscount);

  // If there's an overall document discount and exclusive taxes, adjust taxable amount proportionately
  let taxSum = new Decimal(0);
  const taxBreakdownList: TaxBreakdown[] = [];

  taxMap.forEach((entry, key) => {
    let finalTaxable = entry.taxable;
    let finalTax = entry.tax;

    if (overallDiscount.greaterThan(0) && rawSubtotal.greaterThan(0)) {
      const discountRatio = new Decimal(1).minus(
        overallDiscount.dividedBy(rawSubtotal.minus(totalItemDiscounts).clamp(1, Infinity))
      );
      if (discountRatio.greaterThan(0) && discountRatio.lessThan(1)) {
        finalTaxable = finalTaxable.mul(discountRatio);
        finalTax = finalTaxable.mul(entry.rate.dividedBy(100));
      }
    }

    taxSum = taxSum.plus(finalTax);
    taxBreakdownList.push({
      name: `Tax (${key})`,
      rate: entry.rate.toDecimalPlaces(2).toNumber(),
      taxableAmount: finalTaxable.toDecimalPlaces(precision).toNumber(),
      taxAmount: finalTax.toDecimalPlaces(precision).toNumber(),
    });
  });

  // Calculate Additional Charges
  let additionalTotal = new Decimal(0);
  additionalCharges.forEach((charge) => {
    if (charge.amount) {
      additionalTotal = additionalTotal.plus(new Decimal(charge.amount));
    }
  });

  // Net subtotal before document discount
  const subtotalVal = rawSubtotal.minus(totalItemDiscounts);

  // Grand Total calculation
  let grandTotal = subtotalVal.minus(overallDiscount);
  if (documentTaxType === "exclusive") {
    grandTotal = grandTotal.plus(taxSum);
  }
  grandTotal = grandTotal.plus(additionalTotal);
  if (grandTotal.isNegative()) {
    grandTotal = new Decimal(0);
  }

  // Deposit / Advance Payment
  let depositRequired = new Decimal(0);
  if (depositAmount > 0) {
    if (depositType === "percent") {
      depositRequired = grandTotal.mul(new Decimal(depositAmount).dividedBy(100));
    } else {
      depositRequired = new Decimal(depositAmount);
    }
    if (depositRequired.greaterThan(grandTotal)) {
      depositRequired = grandTotal;
    }
  }

  const balanceDue = grandTotal.minus(depositRequired);

  const roundedGrandTotal = grandTotal.toDecimalPlaces(precision).toNumber();

  return {
    subtotal: rawSubtotal.toDecimalPlaces(precision).toNumber(),
    discountTotal: combinedDiscount.toDecimalPlaces(precision).toNumber(),
    taxableAmount: rawSubtotal.minus(combinedDiscount).toDecimalPlaces(precision).toNumber(),
    taxBreakdown: taxBreakdownList,
    taxTotal: taxSum.toDecimalPlaces(precision).toNumber(),
    additionalChargesTotal: additionalTotal.toDecimalPlaces(precision).toNumber(),
    grandTotal: roundedGrandTotal,
    depositRequired: depositRequired.toDecimalPlaces(precision).toNumber(),
    balanceDue: balanceDue.toDecimalPlaces(precision).toNumber(),
    amountInWords: convertAmountToWords(roundedGrandTotal, currencyCode),
  };
}

/**
 * Converts a numeric amount to formal words (supports Indian and International systems).
 */
export function convertAmountToWords(amount: number, currency: string = "USD"): string {
  if (isNaN(amount) || amount === 0) return "Zero";

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const integerPart = Math.floor(absAmount);
  const decimalPart = Math.round((absAmount - integerPart) * 100);

  const isIndianSystem = currency.toUpperCase() === "INR";
  const intWords = isIndianSystem
    ? convertToIndianWords(integerPart)
    : convertToInternationalWords(integerPart);

  let words = intWords;

  // Currency label
  const currencyLabels: Record<string, { main: string; sub: string }> = {
    INR: { main: "Rupees", sub: "Paise" },
    USD: { main: "Dollars", sub: "Cents" },
    EUR: { main: "Euros", sub: "Cents" },
    GBP: { main: "Pounds", sub: "Pence" },
    AED: { main: "Dirhams", sub: "Fils" },
    SAR: { main: "Riyals", sub: "Halalas" },
    QAR: { main: "Riyals", sub: "Dirhams" },
    CAD: { main: "Dollars", sub: "Cents" },
    AUD: { main: "Dollars", sub: "Cents" },
    SGD: { main: "Dollars", sub: "Cents" },
  };

  const labels = currencyLabels[currency.toUpperCase()] || {
    main: currency.toUpperCase(),
    sub: "Units",
  };

  words = `${words} ${labels.main}`;

  if (decimalPart > 0) {
    const decWords = isIndianSystem
      ? convertToIndianWords(decimalPart)
      : convertToInternationalWords(decimalPart);
    words += ` and ${decWords} ${labels.sub}`;
  }

  words += " Only";
  return isNegative ? `Negative ${words}` : words;
}

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertThreeDigits(num: number): string {
  let str = "";
  if (num >= 100) {
    str += `${ONES[Math.floor(num / 100)]} Hundred `;
    num %= 100;
  }
  if (num >= 20) {
    str += `${TENS[Math.floor(num / 10)]} `;
    num %= 10;
  }
  if (num > 0) {
    str += `${ONES[num]} `;
  }
  return str.trim();
}

function convertToInternationalWords(num: number): string {
  if (num === 0) return "Zero";
  const scales = ["", "Thousand", "Million", "Billion", "Trillion"];
  let str = "";
  let scaleIndex = 0;

  while (num > 0 && scaleIndex < scales.length) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkStr = convertThreeDigits(chunk);
      const scaleStr = scales[scaleIndex] ? ` ${scales[scaleIndex]}` : "";
      str = `${chunkStr}${scaleStr} ${str}`;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }
  return str.trim();
}

function convertToIndianWords(num: number): string {
  if (num === 0) return "Zero";
  let str = "";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const remainder = num;

  if (crore > 0) {
    str += `${convertToIndianWords(crore)} Crore `;
  }
  if (lakh > 0) {
    str += `${convertThreeDigits(lakh)} Lakh `;
  }
  if (thousand > 0) {
    str += `${convertThreeDigits(thousand)} Thousand `;
  }
  if (remainder > 0) {
    str += convertThreeDigits(remainder);
  }

  return str.trim();
}

