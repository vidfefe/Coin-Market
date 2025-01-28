import { Row, Col, Typography, Card, Flex } from "antd";
import { formatNumber } from "@/utils/formatNumberUtils";

interface CoinStatisticsProps {
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  rank: string;
}

const { Title, Text } = Typography;
export default function CoinStatistics({
  supply,
  maxSupply,
  marketCapUsd,
  rank,
}: CoinStatisticsProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card title="Supply" bordered={false}>
          <Text>{formatNumber(parseFloat(supply))}</Text>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Max Supply" bordered={false}>
          <Text>{maxSupply ? formatNumber(parseFloat(maxSupply)) : "N/A"}</Text>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Market Cap USD" bordered={false}>
          <Text>{formatNumber(parseFloat(marketCapUsd))}</Text>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Rank" bordered={false}>
          <Text>{rank}</Text>
        </Card>
      </Col>
    </Row>
  );
}
