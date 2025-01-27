"use client";

import { formatNumber } from "@/utils/formatNumberUtils";
import { Button, Table, TableProps } from "antd";

import { getCoins } from "@/api/coinApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import CoinImage from "./CoinImage";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import { useRouter } from "next/navigation";

interface CoinsData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
}

const columns: TableProps<CoinsData>["columns"] = [
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Logo",
    dataIndex: "symbol",
    key: "logo",
    render: (symbol) => <CoinImage symbol={symbol} />,
  },
  {
    title: "Price",
    dataIndex: "priceUsd",
    key: "price",
    render: (priceUsd) => formatNumber(parseFloat(priceUsd)),
    sorter: (a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd),
  },
  {
    title: "Market Cap USD",
    dataIndex: "marketCapUsd",
    key: "marketCapUsd",
    render: (marketCapUsd) => formatNumber(parseFloat(marketCapUsd)),
    sorter: (a, b) => parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd),
  },
  {
    title: "Change in 24h",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
    render: (changePercent24Hr) => (
      <span
        style={{ color: parseFloat(changePercent24Hr) > 0 ? "green" : "red" }}
      >
        {parseFloat(changePercent24Hr).toFixed(2)}%
      </span>
    ),
    sorter: (a, b) =>
      parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr),
  },
  {
    title: "Action",
    key: "action",
    render: () => <Button type="primary">Add</Button>,
  },
];

export default function CoinTable({ searchCoin }: { searchCoin: string }) {
  const [coins, setCoins] = useState<CoinsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    pageSize: number;
  }>({
    currentPage: 1,
    pageSize: 10,
  });

  const { showMessage, contextHolder } = useMessageHandler();

  const navigate = useRouter();

  const loadCoins = useCallback(async (page: number, pageSize: number) => {
    setIsLoading(true);
    const limit = (page - 1) * pageSize;

    try {
      const data = await getCoins(pageSize, limit);
      setCoins(data);
    } catch (err) {
      showMessage("error", "Something went wrong. Please try again later");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoins(pagination.currentPage, pagination.pageSize);
  }, [pagination, loadCoins]);

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchCoin.toLowerCase()),
    );
  }, [searchCoin, coins]);

  return (
    <>
      {contextHolder}
      <Table<CoinsData>
        columns={columns}
        dataSource={filteredCoins}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => navigate.push(`/coin/${record.id}`),
        })}
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: 100,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPagination({ currentPage: page, pageSize });
          },
          position: ["bottomCenter"],
        }}
      />
    </>
  );
}
