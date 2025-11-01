import Image, { StaticImageData } from "next/image";

interface ICardProps {
  src: StaticImageData;
  alt: string;
  text: string;
}

export const CardInstruction = ({ src, alt, text }: ICardProps) => {
  return (
    <div className="flex-1 max-w-[120px] text-center text-xs">
      <Image src={src} alt={alt} width={80} height={80} />
      <p>{text}</p>
    </div>
  );
};
