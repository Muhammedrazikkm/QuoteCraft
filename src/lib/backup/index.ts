import JSZip from "jszip";
import { db } from "@/lib/db";
import { Quotation, CompanyProfile, Customer, QuotationItem, TemplateDesignConfig } from "@/types";

export interface WorkspaceBackup {
  schemaVersion: number;
  exportedAt: string;
  source: string;
  quotations: Quotation[];
  templates: TemplateDesignConfig[];
  companies: CompanyProfile[];
  customers: Customer[];
  items: QuotationItem[];
  settings?: any[];
}

export interface ImportSummary {
  quotationsCount: number;
  templatesCount: number;
  companiesCount: number;
  customersCount: number;
  itemsCount: number;
  status: "success" | "partial" | "error";
  message: string;
}

/**
 * Creates full workspace JSON backup
 */
export async function createFullBackup(): Promise<WorkspaceBackup> {
  const [quotations, templates, companies, customers, items, settings] = await Promise.all([
    db.quotations.toArray(),
    db.templates.toArray(),
    db.companies.toArray(),
    db.customers.toArray(),
    db.items.toArray(),
    db.settings.toArray(),
  ]);

  return {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    source: "QuoteCraft Local Engine",
    quotations,
    templates,
    companies,
    customers,
    items,
    settings,
  };
}

/**
 * Downloads full backup as a JSON file
 */
export async function downloadJsonBackup(): Promise<void> {
  const backup = await createFullBackup();
  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  a.href = url;
  a.download = `QuoteCraft-Backup-${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Downloads full backup as a compressed ZIP file with metadata
 */
export async function downloadZipBackup(): Promise<void> {
  const backup = await createFullBackup();
  const zip = new JSZip();

  zip.file("quotecraft-workspace.json", JSON.stringify(backup, null, 2));
  zip.file(
    "README.txt",
    `QuoteCraft Local Workspace Backup\nExported: ${backup.exportedAt}\nTotal Quotations: ${backup.quotations.length}\nTotal Customers: ${backup.customers.length}\nTotal Items: ${backup.items.length}\n`
  );

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  a.href = url;
  a.download = `QuoteCraft-Full-Archive-${dateStr}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Imports workspace backup with merge or replace strategy
 */
export async function importWorkspaceBackup(
  backupData: any,
  strategy: "merge" | "replace" = "merge"
): Promise<ImportSummary> {
  if (!backupData || typeof backupData !== "object") {
    throw new Error("Invalid backup format. Expected a valid JSON object.");
  }

  const quotations: Quotation[] = Array.isArray(backupData.quotations) ? backupData.quotations : [];
  const templates: TemplateDesignConfig[] = Array.isArray(backupData.templates)
    ? backupData.templates
    : [];
  const companies: CompanyProfile[] = Array.isArray(backupData.companies) ? backupData.companies : [];
  const customers: Customer[] = Array.isArray(backupData.customers) ? backupData.customers : [];
  const items: QuotationItem[] = Array.isArray(backupData.items) ? backupData.items : [];

  if (strategy === "replace") {
    await Promise.all([
      db.quotations.clear(),
      db.templates.clear(),
      db.companies.clear(),
      db.customers.clear(),
      db.items.clear(),
    ]);
  }

  // Bulk put entries
  await Promise.all([
    quotations.length > 0 ? db.quotations.bulkPut(quotations) : Promise.resolve(),
    templates.length > 0 ? db.templates.bulkPut(templates) : Promise.resolve(),
    companies.length > 0 ? db.companies.bulkPut(companies) : Promise.resolve(),
    customers.length > 0 ? db.customers.bulkPut(customers) : Promise.resolve(),
    items.length > 0 ? db.items.bulkPut(items) : Promise.resolve(),
  ]);

  return {
    quotationsCount: quotations.length,
    templatesCount: templates.length,
    companiesCount: companies.length,
    customersCount: customers.length,
    itemsCount: items.length,
    status: "success",
    message: `Successfully imported ${quotations.length} quotations, ${customers.length} customers, and ${items.length} items using '${strategy}' strategy.`,
  };
}

/**
 * Export single quotation to JSON
 */
export function exportSingleQuotation(quotation: Quotation): void {
  const jsonStr = JSON.stringify(quotation, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${quotation.quotationNumber || "quotation"}.quotecraft.json`;
  a.click();
  URL.revokeObjectURL(url);
}

