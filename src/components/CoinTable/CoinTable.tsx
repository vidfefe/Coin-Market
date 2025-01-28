"use client";

import { formatNumber } from "@/utils/formatNumberUtils";
import { Button, Table, TableProps } from "antd";

import { getCoins } from "@/api/coinApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import CoinImage from "../CoinImage/CoinImage";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import { useRouter } from "next/navigation";
import ButtonAddCoin from "../ButtonAddCoin";
import { columns } from "./columns";
import { CoinsData } from "@/types/coinsData";

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
          onClick: (event) => {
            const target = event.target as HTMLElement;

            const modals = document.querySelectorAll(".ant-modal");
            const isModalVisible = Array.from(modals).some(
              (modal) => window.getComputedStyle(modal).display !== "none",
            );

            if (isModalVisible || target.closest("button")) {
              return;
            }

            navigate.push(`/coin/${record.id}`);
          },
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
        scroll={{ x: 500 }}
      />
    </>
  );
}
