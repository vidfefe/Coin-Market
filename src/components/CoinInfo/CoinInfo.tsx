import { Typography, Flex } from "antd";
import { formatNumber } from "@/utils/formatNumberUtils";
import CoinImage from "@/components/CoinImage/CoinImage";
import React from "react";

interface CoinInfoProps {
  name: string;
  symbol: string;
  priceUsd: string;
}

const { Title, Text } = Typography;
export default function CoinInfo({ name, symbol, priceUsd }: CoinInfoProps) {
  return (
    <Flex gap={20} align="center">
      <CoinImage symbol={symbol} size={40} />
      <div>
        <Title level={2} className="coin-title">
          {name}
        </Title>
        <Text type="secondary">{symbol}</Text>
      </div>
      <Title level={2} className="coin-title">
        ${formatNumber(parseFloat(priceUsd))}
      </Title>
    </Flex>
  );
}
