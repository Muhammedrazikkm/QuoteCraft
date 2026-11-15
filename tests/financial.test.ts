import { describe, it, expect } from "vitest";
import { calculateQuotationTotals, convertAmountToWords } from "@/lib/calculations/financial";
import { formatCurrency } from "@/lib/formatting/currency";
import { QuotationItem } from "@/types";

describe("Financial Calculation Engine", () => {
  const sampleItems: QuotationItem[] = [
    {
      id: "item-1",
      name: "Web Platform Development",
      quantity: 10,
      unit: "hrs",
      rate: 100,
      discount: 10, // 10%
      discountType: "percent",
      taxRate: 10, // 10%
      taxType: "exclusive",
      amount: 900,
    },
    {
      id: "item-2",
      name: "Cloud Server Deployment",
      quantity: 1,
      unit: "package",
      rate: 500,
      discount: 50, // $50 fixed
      discountType: "fixed",
      taxRate: 10,
      taxType: "exclusive",
      amount: 450,
    },
  ];

  it("calculates subtotal, discounts, line tax, and grand total correctly", () => {
    const res = calculateQuotationTotals(sampleItems, {
      currencyCode: "USD",
    });

    // Item 1 gross: 10 * 100 = 1000. Disc: 10% = 100. Net = 900. Tax (10%) = 90.
    // Item 2 gross: 1 * 500 = 500. Disc: $50 = 50. Net = 450. Tax (10%) = 45.
    // Raw Subtotal = 1500
    // Total Discounts = 150
    // Taxable Amount = 1350
    // Total Tax = 135
    // Grand Total = 1350 + 135 = 1485
    expect(res.subtotal).toBe(1500);
    expect(res.discountTotal).toBe(150);
    expect(res.taxableAmount).toBe(1350);
    expect(res.taxTotal).toBe(135);
    expect(res.grandTotal).toBe(1485);
  });

  it("calculates document-level overall discount", () => {
    const res = calculateQuotationTotals(sampleItems, {
      documentDiscount: 10, // 10% document discount
      documentDiscountType: "percent",
      currencyCode: "USD",
    });

    // Net after item discount: 1350. Overall disc 10% = 135.
    // Taxable after overall discount: 1350 - 135 = 1215.
    // Tax (10%): 121.50.
    // Grand total = 1215 + 121.50 = 1336.50
    expect(res.discountTotal).toBe(285); // 150 item + 135 overall
    expect(res.grandTotal).toBe(1336.5);
  });

  it("calculates deposit required and remaining balance due", () => {
    const res = calculateQuotationTotals(sampleItems, {
      depositAmount: 50,
      depositType: "percent",
      currencyCode: "USD",
    });

    // Grand total: 1485
    // Deposit 50% = 742.50
    // Balance due = 742.50
    expect(res.depositRequired).toBe(742.5);
    expect(res.balanceDue).toBe(742.5);
  });

  it("supports additional surcharges (shipping, installation)", () => {
    const res = calculateQuotationTotals(sampleItems, {
      additionalCharges: [
        { id: "c1", name: "Courier Shipping", amount: 15 },
        { id: "c2", name: "Installation Handling", amount: 100 },
      ],
      currencyCode: "USD",
    });

    // 1485 + 115 = 1600
    expect(res.additionalChargesTotal).toBe(115);
    expect(res.grandTotal).toBe(1600);
  });

  it("calculates totals correctly when using lump-sum mode without line items", () => {
    const res = calculateQuotationTotals([], {
      lumpSumAmount: 7500,
      currencyCode: "USD",
      depositAmount: 50,
      depositType: "percent",
    });

    expect(res.subtotal).toBe(7500);
    expect(res.grandTotal).toBe(7500);
    expect(res.depositRequired).toBe(3750);
    expect(res.balanceDue).toBe(3750);
  });
});

describe("Amount in Words Engine", () => {
  it("converts USD amounts into International words", () => {
    const words = convertAmountToWords(1485.5, "USD");
    expect(words).toBe(
      "One Thousand Four Hundred Eighty Five Dollars and Fifty Cents Only"
    );
  });

  it("converts INR amounts into Indian numbering words (Lakhs & Crores)", () => {
    const words = convertAmountToWords(125000, "INR");
    expect(words).toBe("One Lakh Twenty Five Thousand Rupees Only");
  });

  it("handles zero gracefully", () => {
    expect(convertAmountToWords(0)).toBe("Zero");
  });
});

describe("Currency Formatter", () => {
  it("formats USD currency", () => {
    const formatted = formatCurrency(1250.75, "USD");
    expect(formatted).toContain("1,250.75");
  });

  it("formats INR currency", () => {
    const formatted = formatCurrency(50000, "INR");
    expect(formatted).toContain("50,000");
  });

  it("formats EUR currency", () => {
    const formatted = formatCurrency(99.99, "EUR");
    expect(formatted).toContain("99");
  });
});

