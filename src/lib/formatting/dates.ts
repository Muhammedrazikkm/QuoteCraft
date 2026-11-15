import { format, parseISO, isValid } from "date-fns";

export function formatDate(
  dateInput: string | Date | null | undefined,
  formatPattern: string = "dd MMM yyyy"
): string {
  if (!dateInput) return "";
  try {
    const d = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    if (!isValid(d)) {
      const fallback = new Date(dateInput);
      return isValid(fallback) ? format(fallback, formatPattern) : String(dateInput);
    }
    return format(d, formatPattern);
  } catch {
    return String(dateInput);
  }
}

export function getCurrentDateISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDefaultExpiryDateISO(daysValid: number = 30): string {
  const d = new Date();
  d.setDate(d.getDate() + daysValid);
  return d.toISOString().split("T")[0];
}

