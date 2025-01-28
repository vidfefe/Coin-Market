import { usePortfolio } from "@/context/PortfolioContext";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import { formatNumber } from "@/utils/formatNumberUtils";
import { Button, InputNumber, Modal } from "antd";
import { useState } from "react";
import { CoinsData } from "@/types/coinsData";

interface AddCoinButtonProps {
  coin: CoinsData;
  size?: "small" | "middle" | "large";
}

export default function ButtonAddCoin({
  coin,
  size = "small",
}: AddCoinButtonProps) {
  const { addCoin } = usePortfolio()!;
  const [visible, setVisible] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const minQuantity = 1;
  const maxQuantity = 1000;

  const { showMessage, contextHolder } = useMessageHandler();

  const handleAddCoin = () => {
    if (quantity < minQuantity) {
      showMessage("error", `Minimum number of coins: ${minQuantity}`);
      return;
    }
    if (quantity > maxQuantity) {
      showMessage("error", `Maximum number of coins ${maxQuantity}`);
      return;
    }

    const coinToAdd = {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      quantity,
      initialPriceUsd: parseFloat(coin.priceUsd),
    };

    addCoin(coinToAdd);
    setVisible(false);
    showMessage("success", `You added ${quantity} coins ${coin.name}`);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" size={size} onClick={() => setVisible(true)}>
        Add
      </Button>

      <Modal
        title={`Add ${coin.name} to Portfolio`}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddCoin}>
            Add to Portfolio
          </Button>,
        ]}
      >
        <div>
          <p>Price: {`$${formatNumber(parseFloat(coin.priceUsd))}`}</p>
          <p>
            <strong>Quantity</strong>
          </p>
          <InputNumber
            min={minQuantity}
            max={maxQuantity}
            step={1}
            value={quantity}
            onChange={(value) => setQuantity(value ?? 0)}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
    </>
  );
}
