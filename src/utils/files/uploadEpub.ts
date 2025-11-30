import JSZip from "jszip";

export const uploadEPUB = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  let fullText = "";

  const htmlFiles = Object.keys(zip.files).filter(
    (path) => path.endsWith(".html") || path.endsWith(".xhtml")
  );

  for (const path of htmlFiles) {
    const fileData = await zip.files[path].async("string");

    const text = fileData
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    if (text.length > 20) fullText += text + "\n\n";
  }

  return fullText.trim();
};
