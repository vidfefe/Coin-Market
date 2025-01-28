import { useState } from "react";
import { Image } from "antd";

interface CoinImageProps {
  symbol: string;
  size?: number;
}

export default function CoinImage({ symbol, size = 20 }: CoinImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(
    `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`,
  );

  return (
    <Image
      src={imageSrc}
      onError={() => {
        setImageSrc("https://placehold.co/20x20");
      }}
      alt={symbol}
      width={size}
      height={size}
    />
  );
}
