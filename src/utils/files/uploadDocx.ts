import mammoth from "mammoth";

export const uploadDocx = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const { value }: { value: string } = await mammoth.extractRawText({
      arrayBuffer,
    });
    return value;
  };