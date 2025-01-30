"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCoinDetails } from "@/api/coinApi";
import { PortfolioCoin } from "@/types/portfolioCoin";

interface PortfolioContextType {
  portfolio: PortfolioCoin[];
  addCoin: (coin: PortfolioCoin) => void;
  removeCoin: (coinId: string) => void;
  calculatePortfolioValue: () => number;
  calculatePortfolioDifference: () => Promise<{
    difference: number;
    percentage: number;
  }>;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioCoin[]>([]);

  useEffect(() => {
    const savedPortfolio = localStorage.getItem("portfolio");
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  useEffect(() => {
    if (portfolio.length > 0) {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
  }, [portfolio]);

  function addCoin(coin: PortfolioCoin) {
    setPortfolio((prev) => {
      const existingCoin = prev.find((item) => item.id === coin.id);
      if (existingCoin) {
        return prev.map((item) =>
          item.id === coin.id
            ? { ...item, quantity: item.quantity + coin.quantity }
            : item,
        );
      }
      return [...prev, coin];
    });
  }

  function removeCoin(coinId: string) {
    setPortfolio((prev) => {
      const updatedPortfolio = prev.filter((coin) => coin.id !== coinId);

      if (updatedPortfolio.length === 0) {
        localStorage.removeItem("portfolio");
      }

      return updatedPortfolio;
    });
  }

  function calculatePortfolioValue() {
    return portfolio.reduce((total, coin) => {
      return total + coin.initialPriceUsd * coin.quantity;
    }, 0);
  }

  async function calculatePortfolioDifference() {
    const initialPriceUsd = calculatePortfolioValue();

    let currentPriceUsd = 0;

    try {
      for (const coin of portfolio) {
        const coinDetails = await getCoinDetails(coin.id);
        const currentPrice = parseFloat(coinDetails.priceUsd) || 0;
        currentPriceUsd += currentPrice * coin.quantity;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to load current coin prices");
    }

    const difference = currentPriceUsd - initialPriceUsd;
    const percentage = initialPriceUsd
      ? (difference / initialPriceUsd) * 100
      : 0;

    return {
      difference,
      percentage,
    };
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addCoin,
        removeCoin,
        calculatePortfolioValue,
        calculatePortfolioDifference,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  return context;
}
