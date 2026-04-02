"use client";

export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    return extractFromPDF(file);
  } else if (ext === "docx" || ext === "doc") {
    return extractFromWord(file);
  } else if (ext === "txt") {
    return file.text();
  }
  throw new Error(`Unsupported file type: .${ext}`);
}

async function extractFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = await import("pdfjs-dist");

  // Use bundled worker via blob URL instead of CDN
  const workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).href;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const texts: string[] = [];

  for (let i = 1; i <= Math.min(pdf.numPages, 30); i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    texts.push(pageText);
  }

  return texts.join("\n\n");
}

async function extractFromWord(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}
