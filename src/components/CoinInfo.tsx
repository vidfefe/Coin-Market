import { Row, Col, Typography, Card, Flex } from "antd";
import { formatNumber } from "@/utils/formatNumberUtils";
import CoinImage from "@/components/CoinImage";

interface CoinInfoProps {
  name: string;
  symbol: string;
  priceUsd: string;
}

const { Title, Text } = Typography;
export default function CoinInfo({ name, symbol, priceUsd }: CoinInfoProps) {
  return (
    <Flex gap={20}>
      <CoinImage symbol={symbol} size={40} />
      <div>
        <Title level={2} style={{ margin: 0 }}>
          {name}
        </Title>
        <Text type="secondary">{symbol}</Text>
      </div>
      <Title level={2} style={{ margin: 0 }}>
        ${formatNumber(parseFloat(priceUsd))}
      </Title>
    </Flex>
  );
}
