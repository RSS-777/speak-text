export  const uploadText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Не вдалося прочитати TXT файл"));
      reader.readAsText(file);
    });
  };