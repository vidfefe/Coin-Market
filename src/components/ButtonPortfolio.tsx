import { useState, useCallback, useEffect } from "react";
import { Modal, Button, Table, Flex, Typography } from "antd";
import { usePortfolio } from "@/context/PortfolioContext";
import { formatNumber } from "@/utils/formatNumberUtils";
import CoinImage from "./CoinImage/CoinImage";

const { Text } = Typography;

export default function ButtonPortfolio() {
  const context = usePortfolio();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [portfolioDifference, setPortfolioDifference] = useState<{
    difference: number;
    percentage: number;
  }>({ difference: 0, percentage: 0 });

  const portfolioValue = context ? context.calculatePortfolioValue() : 0;

  const loadPortfolioDifference = useCallback(async () => {
    if (context) {
      const result = await context.calculatePortfolioDifference();
      setPortfolioDifference(result);
    }
  }, [context]);

  useEffect(() => {
    loadPortfolioDifference();
  }, [loadPortfolioDifference]);

  const handleRemoveCoin = (coinId: string) => {
    if (context) {
      context.removeCoin(coinId);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "symbol",
      key: "logo",
      render: (symbol: string) => <CoinImage symbol={symbol} />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => `${quantity}`,
    },
    {
      title: "Initial Price (USD)",
      dataIndex: "initialPriceUsd",
      key: "initialPriceUsd",
      render: (price: number) => `$${formatNumber(price)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button danger onClick={() => handleRemoveCoin(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        style={{ height: "auto", padding: " 5px 10px" }}
      >
        <Flex vertical={true} align="start">
          <Text>Portfolio:</Text>
          <Text>
            {`$${formatNumber(portfolioValue)}`}{" "}
            {portfolioDifference.difference >= 0 ? (
              <span style={{ color: "green" }}>
                +{formatNumber(portfolioDifference.difference)} (
                {portfolioDifference.percentage.toFixed(2)}%)
              </span>
            ) : (
              <span style={{ color: "red" }}>
                {formatNumber(portfolioDifference.difference)} (
                {portfolioDifference.percentage.toFixed(2)}%)
              </span>
            )}
          </Text>
        </Flex>
      </Button>

      <Modal
        title="Your Portfolio"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {context ? (
          context.portfolio.length > 0 ? (
            <Table
              columns={columns}
              dataSource={context.portfolio}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                position: ["bottomCenter"],
              }}
              scroll={{ x: 400 }}
            />
          ) : (
            <Text>No coins in your portfolio.</Text>
          )
        ) : (
          <Text>Portfolio context not available.</Text>
        )}
      </Modal>
    </>
  );
}
