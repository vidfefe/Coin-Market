import { useState, useEffect, useCallback } from "react";
import { Button, Typography, Flex } from "antd";
import { usePortfolio } from "@/context/PortfolioContext";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import { formatNumber } from "@/utils/formatNumberUtils";
import { CoinsData } from "@/types/coinsData";
import { ModalPortfolio } from "../ModalPortfolio/ModalPortfolio";
import {
  AddCoinModalContent,
  PortfolioModalContent,
} from "../ModalPortfolio/ModalContent";
import Footer from "../ModalPortfolio/ModalFooter";

const { Text } = Typography;

interface ButtonProps {
  coin?: CoinsData;
  isAddCoinMode?: boolean;
  isPortfolioMode?: boolean;
  size?: "small" | "middle" | "large";
}

export default function ButtonPortfolio({
  coin,
  isAddCoinMode = false,
  isPortfolioMode = false,
  size = "middle",
}: ButtonProps) {
  const {
    addCoin,
    removeCoin,
    portfolio,
    calculatePortfolioValue,
    calculatePortfolioDifference,
  } = usePortfolio()!;
  const { showMessage, contextHolder } = useMessageHandler();

  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [portfolioDifference, setPortfolioDifference] = useState({
    difference: 0,
    percentage: 0,
  });

  const loadPortfolioDifference = useCallback(async () => {
    const result = await calculatePortfolioDifference();
    setPortfolioDifference(result);
  }, [calculatePortfolioDifference]);

  useEffect(() => {
    if (isPortfolioMode) loadPortfolioDifference();
  }, [isPortfolioMode, loadPortfolioDifference]);

  const handleAddCoin = () => {
    if (quantity < 1 || quantity > 1000) {
      showMessage("error", `Quantity must be between 1 and 1000`);
      return;
    }

    const coinToAdd = {
      id: coin!.id,
      symbol: coin!.symbol,
      name: coin!.name,
      quantity,
      initialPriceUsd: parseFloat(coin!.priceUsd),
    };

    addCoin(coinToAdd);
    setVisible(false);
    showMessage("success", `You added ${quantity} ${coin!.name}`);
  };

  const handleRemoveCoin = (coinId: string) => {
    removeCoin(coinId);
  };

  const renderPortfolioButton = () => (
    <Button
      onClick={() => setVisible(true)}
      style={{ height: "auto", padding: "5px 10px" }}
      size={size}
    >
      <Flex vertical={true} align="start">
        <Text>Portfolio:</Text>
        <Text>
          ${formatNumber(calculatePortfolioValue())}{" "}
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
  );

  if (isAddCoinMode) {
    return (
      <>
        {contextHolder}
        <Button type="primary" size={size} onClick={() => setVisible(true)}>
          Add
        </Button>

        <ModalPortfolio
          visible={visible}
          title={`Add ${coin?.name} to Portfolio`}
          onCancel={() => setVisible(false)}
          footer={
            <Footer
              onCancel={() => setVisible(false)}
              onSubmit={handleAddCoin}
            />
          }
          content={
            <AddCoinModalContent
              coin={coin!}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />
      </>
    );
  }

  if (isPortfolioMode) {
    return (
      <>
        {renderPortfolioButton()}
        <ModalPortfolio
          visible={visible}
          title="Your Portfolio"
          onCancel={() => setVisible(false)}
          footer={null}
          content={
            <PortfolioModalContent
              portfolio={portfolio}
              handleRemoveCoin={handleRemoveCoin}
            />
          }
        />
      </>
    );
  }

  return null;
}
