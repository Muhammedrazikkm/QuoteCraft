import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PdfExportOptions {
  filename?: string;
  pageSize?: "A4" | "Letter" | "A5";
  orientation?: "portrait" | "landscape";
  quality?: number; // 1 to 3 scale
}

/**
 * Generates and downloads a multi-page PDF document from an HTML container element.
 * Uses an isolated offscreen container and onclone normalization to guarantee
 * styles, fonts, and images render with pixel precision.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<void> {
  const {
    filename = "quotation.pdf",
    pageSize = "a4",
    orientation = "portrait",
    quality = 2,
  } = options;

  // Create isolated container at (0, 0) with -z-index so html2canvas renders exact coordinates without negative offsets
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "800px";
  container.style.minHeight = "1130px";
  container.style.zIndex = "-9999";
  container.style.backgroundColor = "#ffffff";
  container.style.opacity = "1";
  container.style.visibility = "visible";
  container.style.pointerEvents = "none";
  container.style.transform = "none";

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = "none";
  clone.style.margin = "0";
  clone.style.opacity = "1";
  clone.style.visibility = "visible";
  clone.style.display = "block";
  clone.style.width = "800px";
  clone.style.maxWidth = "800px";

  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Wait for all images to finish loading/decoding
    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true); // Don't block export if an image fails
        });
      })
    );

    // Render element canvas with html2canvas
    const canvas = await html2canvas(clone, {
      scale: quality,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: "#ffffff",
      width: 800,
      windowWidth: 800,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      onclone: (clonedDoc) => {
        // Ensure cloned element is visible and styles are preserved
        const allCloned = clonedDoc.querySelectorAll(".print-area");
        allCloned.forEach((node) => {
          const el = node as HTMLElement;
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.style.display = "block";
        });
      },
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error("Rendered canvas has 0 dimensions.");
    }

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    // Dimensions in mm
    const pdf = new jsPDF({
      orientation: orientation as "portrait" | "landscape",
      unit: "mm",
      format: pageSize.toLowerCase() as any,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Subsequent pages if content overflows significantly (> 8mm threshold prevents blank trailing pages)
    while (heightLeft > 8) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    // Direct Blob URL download trigger
    const pdfBlob = pdf.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 1500);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Triggers standard browser print dialog for the current document
 */
export function printDocument(): void {
  if (typeof window !== "undefined") {
    window.print();
  }
}
