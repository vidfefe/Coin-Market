"use client";

import { getCoinDetails, getCoinHistory } from "@/api/coinApi";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import Loader from "@/components/Loader";
import PriceChart from "@/components/PriceChart";
import CoinStatistics from "@/components/CoinStatistics";
import CoinInfo from "@/components/CoinInfo";
import { getUnixTimestamps } from "@/utils/getUnixTimestampsUtils";

interface CoinHistory {
  time: number;
  priceUsd: number;
}

interface CoinDetails {
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  supply: string;
  maxSupply: string;
  rank: string;
}

export default function CoinDetailsPage() {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null);
  const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([]);
  const [interval, setInterval] = useState<"h1" | "m30" | "m5">("h1");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useRouter();
  const { showMessage, contextHolder } = useMessageHandler();
  const { coinId } = useParams<{ coinId: string }>();

  const loadCoinData = useCallback(async () => {
    try {
      const { start, end } = getUnixTimestamps(interval);
      const [details, history] = await Promise.all([
        getCoinDetails(coinId),
        getCoinHistory(coinId, interval, start, end),
      ]);
      setCoinData(details);
      setCoinHistory(
        history.map((item: any) => ({
          time: item.time,
          priceUsd: parseFloat(item.priceUsd),
        })),
      );
    } catch (err) {
      showMessage("error", "Failed to load coin data. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [coinId, interval]);

  useEffect(() => {
    loadCoinData();
  }, [loadCoinData]);

  if (isLoading) {
    return <Loader />;
  }

  if (!coinData || !coinHistory.length) {
    return (
      <>
        {contextHolder}
        <Row align="middle" justify="center" style={{ minHeight: "100vh" }}>
          <Col>
            <Button size="large" onClick={() => navigate.back()}>
              Back to Coin Table
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row gutter={30} justify="center">
        <Col xs={24} lg={10} xl={8}>
          <CoinInfo
            name={coinData.name}
            symbol={coinData.symbol}
            priceUsd={coinData.priceUsd}
          />

          <Row gutter={[16, 16]}>
            <Col>
              <Button size="large" onClick={() => navigate.back()}>
                Back to Coin Table
              </Button>
            </Col>
            <Col>
              <Button type="primary" size="large">
                Add to Portfolio
              </Button>
            </Col>
          </Row>

          <CoinStatistics
            marketCapUsd={coinData.marketCapUsd}
            supply={coinData.supply}
            maxSupply={coinData.maxSupply}
            rank={coinData.rank}
          />
        </Col>

        <Col xs={24} lg={12} xl={14}>
          <PriceChart
            data={coinHistory}
            interval={interval}
            currentPrice={parseFloat(coinData.priceUsd)}
            onIntervalChange={setInterval}
          />
        </Col>
      </Row>
    </>
  );
}
