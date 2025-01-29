"use client";

import { getCoins } from "@/api/coinApi";
import { useEffect, useState, useCallback } from "react";
import { Row, Col, Flex, Layout, Typography } from "antd";
import { formatNumber } from "@/utils/formatNumberUtils";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import ButtonPortfolio from "../ButtonPortfolio/ButtonPortfolio";
import { CoinsData } from "@/types/coinsData";
import React from "react";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const [popularCoins, setPopularCoins] = useState<
    { id: string; rank: string; name: string; priceUsd: number }[]
  >([]);
  const { showMessage, contextHolder } = useMessageHandler();

  const loadPopularCoins = useCallback(async () => {
    try {
      const coins = await getCoins(3, 0);
      setPopularCoins(
        coins.map((coin: CoinsData) => ({
          id: coin.id,
          rank: coin.rank,
          name: coin.name,
          priceUsd: parseFloat(coin.priceUsd),
        })),
      );
    } catch (error) {
      console.error(error);
      showMessage(
        "error",
        "Failed to load popular coins. Please try again later",
      );
    }
  }, []);

  useEffect(() => {
    loadPopularCoins();
  }, [loadPopularCoins]);

  return (
    <>
      {contextHolder}
      <AntHeader
        style={{
          marginBottom: "20px",
          lineHeight: "0px",
          paddingTop: "15px",
          height: "auto",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Row justify="space-around" align="middle" gutter={[0, 16]}>
          <Col xs={24} sm={14} lg={10}>
            <Row
              gutter={[16, 16]}
              align="middle"
              justify="center"
              data-testid="top-coins"
            >
              {popularCoins.map((coin) => (
                <Col key={coin.id} xs={7} sm={8} lg={7}>
                  <Flex align="center" gap={15}>
                    <Title
                      style={{ margin: 0 }}
                      level={5}
                    >{`#${coin.rank}`}</Title>
                    <Title
                      style={{ margin: 0 }}
                      level={5}
                    >{`${coin.name}: $${formatNumber(coin.priceUsd)}`}</Title>
                  </Flex>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Row justify="center" align="middle">
              <ButtonPortfolio isPortfolioMode={true} />
            </Row>
          </Col>
        </Row>
      </AntHeader>
    </>
  );
}
