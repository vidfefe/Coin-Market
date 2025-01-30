import { formatNumber } from "@/utils/formatNumberUtils";
import CoinImage from "@/components/CoinImage/CoinImage";
import type { TableProps } from "antd";
import type { CoinsData } from "@/types/coinsData";
import ButtonPortfolio from "../ButtonPortfolio/ButtonPortfolio";
import React from "react";

export const columns: TableProps<CoinsData>["columns"] = [
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
    render: (priceUsd) => `$${formatNumber(parseFloat(priceUsd))}`,
    sorter: (a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd),
  },
  {
    title: "Market Cap USD",
    dataIndex: "marketCapUsd",
    key: "marketCapUsd",
    render: (marketCapUsd) => `$${formatNumber(parseFloat(marketCapUsd))}`,
    sorter: (a, b) => parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd),
  },
  {
    title: "Change in 24h",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
    render: (changePercent24Hr) => (
      <span
        className={
          parseFloat(changePercent24Hr) > 0
            ? "positive-value"
            : "negative-value"
        }
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
    render: (_, coin) => <ButtonPortfolio coin={coin} isAddCoinMode={true} />,
  },
];
