import { create } from "zustand";
import {
  Quotation,
  CompanyProfile,
  Customer,
  QuotationItem,
  ReusableSection,
  TemplateDesignConfig,
  DocumentFieldVisibility,
  DEFAULT_FIELD_VISIBILITY,
  ItemsDisplayMode,
} from "@/types";
import { db, DEFAULT_COMPANY, DEFAULT_CUSTOMER, DEFAULT_SAMPLE_ITEMS } from "@/lib/db";
import { STARTER_TEMPLATES, getTemplateById } from "@/lib/templates/definitions";
import { DEFAULT_TERMS_AND_SECTIONS } from "@/lib/templates/defaultSections";
import { getCurrentDateISO, getDefaultExpiryDateISO } from "@/lib/formatting/dates";

interface QuotationStoreState {
  currentQuotation: Quotation;
  activeMode: "simple" | "advanced";
  isSaving: boolean;
  isSaved: boolean;
  saveError: string | null;
  history: Quotation[];
  historyIndex: number;

  // Actions
  createNewQuotation: (templateId?: string) => void;
  loadQuotation: (id: string) => Promise<boolean>;
  saveCurrentQuotation: () => Promise<void>;
  updateQuotation: (partial: Partial<Quotation>, addToHistory?: boolean) => void;
  updateCompany: (partial: Partial<CompanyProfile>) => void;
  updateCustomer: (partial: Partial<Customer>) => void;
  addItem: (item?: Partial<QuotationItem>) => void;
  updateItem: (id: string, updates: Partial<QuotationItem>) => void;
  removeItem: (id: string) => void;
  reorderItems: (items: QuotationItem[]) => void;
  duplicateItem: (id: string) => void;
  addSection: (section: Partial<ReusableSection>) => void;
  updateSection: (id: string, updates: Partial<ReusableSection>) => void;
  removeSection: (id: string) => void;
  updateDesign: (designUpdates: Partial<TemplateDesignConfig>) => void;
  updateFieldVisibility: (partial: Partial<DocumentFieldVisibility>) => void;
  setItemsDisplayMode: (mode: ItemsDisplayMode) => void;
  applyVisibilityPreset: (preset: "minimal" | "corporate" | "tender" | "default") => void;
  applyTemplate: (templateId: string) => void;
  setMode: (mode: "simple" | "advanced") => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export function generateQuotationNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `QT-${year}-${randomNum}`;
}

export function createDefaultQuotation(
  templateId: string = "modern-tech",
  isDynamic: boolean = false
): Quotation {
  const template = getTemplateById(templateId);
  const now = isDynamic ? new Date().toISOString() : "2026-01-01T00:00:00.000Z";

  return {
    id: isDynamic
      ? `quo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      : "quo-seed-001",
    quotationNumber: isDynamic ? generateQuotationNumber() : "QT-2026-001",
    title: "COMMERCIAL PROPOSAL & QUOTATION",
    subtitle: "Enterprise Technical Solutions & Services",
    subject: "Implementation of Cloud Infrastructure & Custom Digital Experience Platform",
    issueDate: isDynamic ? getCurrentDateISO() : "2026-01-01",
    expiryDate: isDynamic ? getDefaultExpiryDateISO(30) : "2026-01-31",
    status: "draft",
    company: { ...DEFAULT_COMPANY },
    customer: { ...DEFAULT_CUSTOMER },
    projectName: "NextGen Digital Enterprise Portal",
    projectReference: "PRJ-2026-ENG-44",
    poReference: "PO-REQ-901",
    preparedBy: "David Miller (Senior Architect)",
    approvedBy: "Executive Operations Board",
    currency: "USD",
    documentLanguage: "en",
    introduction:
      "Thank you for the opportunity to present this quotation. Based on our preliminary discovery consultations, we have prepared a comprehensive scope breakdown and investment estimate tailored to your exact business objectives.",
    items: JSON.parse(JSON.stringify(DEFAULT_SAMPLE_ITEMS)),
    itemsDisplayMode: "table",
    columnVisibility: {
      itemNumber: true,
      sku: false,
      description: true,
      quantity: true,
      unit: true,
      unitRate: true,
      discount: true,
      tax: true,
      amount: true,
    },
    fieldVisibility: { ...DEFAULT_FIELD_VISIBILITY },
    lumpSumAmount: 0,
    documentDiscount: 0,
    documentDiscountType: "percent",
    taxType: "exclusive",
    additionalCharges: [
      { id: "charge-1", name: "Cloud Server Provisioning & CI/CD Setup", amount: 450, isTaxable: false },
    ],
    depositAmount: 50,
    depositType: "percent",
    sections: JSON.parse(JSON.stringify(DEFAULT_TERMS_AND_SECTIONS)),
    customFields: {},
    templateId: template.id,
    design: { ...template },
    isAdvancedLayout: false,
    designerElements: [],
    createdAt: now,
    updatedAt: now,
    revision: 1,
  };
}

export const useQuotationStore = create<QuotationStoreState>((set, get) => {
  const initialQuo = createDefaultQuotation("modern-tech", false);

  return {
    currentQuotation: initialQuo,
    activeMode: "simple",
    isSaving: false,
    isSaved: true,
    saveError: null,
    history: [initialQuo],
    historyIndex: 0,

    createNewQuotation: (templateId?: string) => {
      const newQuo = createDefaultQuotation(templateId || "modern-tech", true);
      set({
        currentQuotation: newQuo,
        history: [newQuo],
        historyIndex: 0,
        isSaved: false,
        saveError: null,
      });
      // trigger save to indexedDB
      get().saveCurrentQuotation();
    },

    loadQuotation: async (id: string) => {
      try {
        const found = await db.quotations.get(id);
        if (found) {
          set({
            currentQuotation: found,
            history: [found],
            historyIndex: 0,
            isSaved: true,
            saveError: null,
          });
          return true;
        }
        return false;
      } catch (err: any) {
        set({ saveError: err?.message || "Failed to load quotation from IndexedDB" });
        return false;
      }
    },

    saveCurrentQuotation: async () => {
      const { currentQuotation } = get();
      if (!currentQuotation) return;

      set({ isSaving: true, saveError: null });
      try {
        const updated = {
          ...currentQuotation,
          updatedAt: new Date().toISOString(),
        };
        await db.quotations.put(updated);
        set({ currentQuotation: updated, isSaving: false, isSaved: true });
      } catch (err: any) {
        set({ isSaving: false, isSaved: false, saveError: err?.message || "Error saving quotation" });
      }
    },

    updateQuotation: (partial, addToHistory = true) => {
      const { currentQuotation, history, historyIndex } = get();
      const updated = {
        ...currentQuotation,
        ...partial,
        updatedAt: new Date().toISOString(),
      };

      let newHistory = history;
      let newIndex = historyIndex;

      if (addToHistory) {
        newHistory = [...history.slice(0, historyIndex + 1), updated];
        if (newHistory.length > 30) newHistory.shift();
        newIndex = newHistory.length - 1;
      }

      set({
        currentQuotation: updated,
        history: newHistory,
        historyIndex: newIndex,
        isSaved: false,
      });

      // Debounced autosave
      debouncedSave(get().saveCurrentQuotation);
    },

    updateCompany: (partial) => {
      const { currentQuotation } = get();
      get().updateQuotation({
        company: { ...currentQuotation.company, ...partial },
      });
    },

    updateCustomer: (partial) => {
      const { currentQuotation } = get();
      get().updateQuotation({
        customer: { ...currentQuotation.customer, ...partial },
      });
    },

    addItem: (itemPartial) => {
      const { currentQuotation } = get();
      const newItem: QuotationItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        name: "New Quotation Item / Service",
        description: "Comprehensive specification and deliverable details",
        quantity: 1,
        unit: "unit",
        rate: 100,
        discount: 0,
        discountType: "percent",
        taxRate: 10,
        taxType: "exclusive",
        amount: 100,
        ...itemPartial,
      };

      get().updateQuotation({
        items: [...currentQuotation.items, newItem],
      });
    },

    updateItem: (id, updates) => {
      const { currentQuotation } = get();
      const updatedItems = currentQuotation.items.map((item) => {
        if (item.id === id) {
          const mod = { ...item, ...updates };
          // Recalculate item line amount
          const qty = mod.quantity || 0;
          const rate = mod.rate || 0;
          let disc = 0;
          if (mod.discount > 0) {
            disc =
              mod.discountType === "percent"
                ? (qty * rate * mod.discount) / 100
                : mod.discount;
          }
          mod.amount = Math.max(0, qty * rate - disc);
          return mod;
        }
        return item;
      });

      get().updateQuotation({ items: updatedItems });
    },

    removeItem: (id) => {
      const { currentQuotation } = get();
      get().updateQuotation({
        items: currentQuotation.items.filter((item) => item.id !== id),
      });
    },

    duplicateItem: (id) => {
      const { currentQuotation } = get();
      const itemToDup = currentQuotation.items.find((i) => i.id === id);
      if (!itemToDup) return;
      const dup: QuotationItem = {
        ...itemToDup,
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        name: `${itemToDup.name} (Copy)`,
      };
      get().updateQuotation({ items: [...currentQuotation.items, dup] });
    },

    reorderItems: (items) => {
      get().updateQuotation({ items });
    },

    addSection: (secPartial) => {
      const { currentQuotation } = get();
      const newSec: ReusableSection = {
        id: `sec-${Date.now()}`,
        title: "New Section",
        content: "Enter terms, specifications, or notes here.",
        type: "custom",
        isVisible: true,
        order: currentQuotation.sections.length + 1,
        ...secPartial,
      };
      get().updateQuotation({
        sections: [...currentQuotation.sections, newSec],
      });
    },

    updateSection: (id, updates) => {
      const { currentQuotation } = get();
      get().updateQuotation({
        sections: currentQuotation.sections.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      });
    },

    removeSection: (id) => {
      const { currentQuotation } = get();
      get().updateQuotation({
        sections: currentQuotation.sections.filter((s) => s.id !== id),
      });
    },

    updateDesign: (designUpdates) => {
      const { currentQuotation } = get();
      get().updateQuotation({
        design: { ...currentQuotation.design, ...designUpdates },
      });
    },

    updateFieldVisibility: (partial) => {
      const { currentQuotation } = get();
      const current = currentQuotation.fieldVisibility || DEFAULT_FIELD_VISIBILITY;
      get().updateQuotation({
        fieldVisibility: { ...current, ...partial },
      });
    },

    setItemsDisplayMode: (mode) => {
      get().updateQuotation({ itemsDisplayMode: mode });
    },

    applyVisibilityPreset: (preset) => {
      const { currentQuotation } = get();
      if (preset === "minimal") {
        get().updateQuotation({
          itemsDisplayMode: "simple-list",
          fieldVisibility: {
            ...DEFAULT_FIELD_VISIBILITY,
            poReference: false,
            projectReference: false,
            approvedBy: false,
            expectedDeliveryDate: false,
            companyTaxId: false,
            companyBusinessId: false,
            bankDetails: false,
            customerTaxId: false,
            customerShippingAddress: false,
            colSku: false,
            colImage: false,
            colQuantity: false,
            colUnit: false,
            colUnitRate: false,
            colDiscount: false,
            colTaxRate: false,
            taxBreakdown: false,
            additionalCharges: false,
            depositRequired: false,
            balanceDue: false,
            watermark: false,
            companyStamp: false,
          },
        });
      } else if (preset === "corporate") {
        get().updateQuotation({
          itemsDisplayMode: "table",
          fieldVisibility: {
            ...DEFAULT_FIELD_VISIBILITY,
            poReference: true,
            projectReference: true,
            approvedBy: true,
            expectedDeliveryDate: true,
            companyTaxId: true,
            companyBusinessId: true,
            bankDetails: true,
            customerTaxId: true,
            customerShippingAddress: true,
            colItemNumber: true,
            colSku: true,
            colDescription: true,
            colQuantity: true,
            colUnit: true,
            colUnitRate: true,
            colDiscount: true,
            colTaxRate: true,
            colAmount: true,
            taxBreakdown: true,
            additionalCharges: true,
            depositRequired: true,
            balanceDue: true,
            signatureBlock: true,
            companyStamp: true,
            qrCode: true,
          },
        });
      } else if (preset === "tender") {
        get().updateQuotation({
          itemsDisplayMode: "milestones",
          fieldVisibility: {
            ...DEFAULT_FIELD_VISIBILITY,
            projectName: true,
            projectReference: true,
            expectedDeliveryDate: true,
            approvedBy: true,
            bankDetails: true,
            termsAndConditions: true,
            signatureBlock: true,
            companyStamp: true,
            depositRequired: true,
            balanceDue: true,
          },
        });
      } else {
        // default
        get().updateQuotation({
          itemsDisplayMode: "table",
          fieldVisibility: { ...DEFAULT_FIELD_VISIBILITY },
        });
      }
    },

    applyTemplate: (templateId) => {
      const t = getTemplateById(templateId);
      const { currentQuotation } = get();
      get().updateQuotation({
        templateId: t.id,
        design: { ...t },
      });
    },

    setMode: (mode) => set({ activeMode: mode }),

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        set({
          currentQuotation: history[newIndex],
          historyIndex: newIndex,
          isSaved: false,
        });
        debouncedSave(get().saveCurrentQuotation);
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        set({
          currentQuotation: history[newIndex],
          historyIndex: newIndex,
          isSaved: false,
        });
        debouncedSave(get().saveCurrentQuotation);
      }
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,
  };
});

let debounceTimer: any = null;
function debouncedSave(fn: () => void, delayMs = 1200) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fn();
  }, delayMs);
}

