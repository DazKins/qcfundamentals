import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const ArticleImage = ({src, alt}: Props) => {
  return (
    <div className="w-full flex justify-center">
      <Image
        src={src}
        width={1000}
        height={400}
        alt={alt}
        className="rounded-default overflow-hidden"
      />
    </div>
  );
};

export default ArticleImage;
