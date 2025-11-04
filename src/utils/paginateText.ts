interface IPaginateProps {
  text: string;
  chunkSize: number;
};

export const paginateText = ({text, chunkSize = 2000}: IPaginateProps) => {
  const words = text.split(/\s+/);
  const pagesArr: string[][] = [];
  let temp: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    if (currentLength + word.length + 1 > chunkSize) {
      pagesArr.push(temp);
      temp = [];
      currentLength = 0;
    }
    temp.push(word);
    currentLength += word.length + 1;
  }

  if (temp.length > 0) pagesArr.push(temp);
  return pagesArr;
};