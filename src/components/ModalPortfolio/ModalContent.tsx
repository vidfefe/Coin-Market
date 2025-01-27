import { Table, InputNumber, Button } from "antd";
import CoinImage from "../CoinImage/CoinImage";
import { formatNumber } from "@/utils/formatNumberUtils";
import { CoinsData } from "@/types/coinsData";
import { PortfolioCoin } from "@/types/portfolioCoin";

export function AddCoinModalContent({
  coin,
  quantity,
  setQuantity,
}: {
  coin: CoinsData;
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  return (
    <>
      <p>Price: ${formatNumber(parseFloat(coin.priceUsd))}</p>
      <p>
        <strong>Quantity</strong>
      </p>
      <InputNumber
        min={1}
        max={1000}
        step={1}
        value={quantity}
        onChange={(value) => setQuantity(value ?? 0)}
        style={{ width: "100%" }}
      />
    </>
  );
}

export function PortfolioModalContent({
  portfolio,
  handleRemoveCoin,
}: {
  portfolio: PortfolioCoin[];
  handleRemoveCoin: (coinId: string) => void;
}) {
  return (
    <Table
      columns={[
        { title: "Name", dataIndex: "name", key: "name" },
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
          render: (_, record: any) => (
            <Button danger onClick={() => handleRemoveCoin(record.id)}>
              Remove
            </Button>
          ),
        },
      ]}
      dataSource={portfolio}
      rowKey="id"
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
      scroll={{ x: 400 }}
    />
  );
}
