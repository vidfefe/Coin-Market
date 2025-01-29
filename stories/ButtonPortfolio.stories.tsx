import { Meta, StoryObj } from "@storybook/react";
import ButtonPortfolio from "../src/components/ButtonPortfolio/ButtonPortfolio";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import React from "react";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { CoinsData } from "@/types/coinsData";
import "@/app/globals.css";

const mockCoin: CoinsData = {
  id: "bitcoin",
  rank: "1",
  symbol: "BTC",
  name: "Bitcoin",
  priceUsd: "31000.50",
  marketCapUsd: "580000000000",
  changePercent24Hr: "3.45",
};

const meta: Meta<typeof ButtonPortfolio> = {
  component: ButtonPortfolio,
  tags: ["autodocs"],
  argTypes: {
    coin: {
      description: "Coin data to be displayed in the button",
    },
    isAddCoinMode: {
      description: "Defines if the button is in 'add coin' mode",
      control: "boolean",
    },
    isPortfolioMode: {
      description: "Defines if the button is in 'portfolio' mode",
      control: "boolean",
    },
    size: {
      description: "Size of the button",
      control: "radio",
      options: ["small", "middle", "large"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A button component that can add a coin to the portfolio or show portfolio details.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider theme={theme}>
        <PortfolioProvider>
          <Story />
        </PortfolioProvider>
      </ConfigProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ButtonPortfolio>;

export const AddCoinMode: Story = {
  args: {
    coin: mockCoin,
    isAddCoinMode: true,
    size: "middle",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Button in 'Add Coin' mode. Allows adding coins to the portfolio.",
      },
    },
  },
  play: async ({ args }) => {},
};

export const PortfolioMode: Story = {
  args: {
    isPortfolioMode: true,
    size: "middle",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Button in 'Portfolio' mode. Displays portfolio details and changes.",
      },
    },
  },
  play: async () => {},
};
export const SmallButton: Story = {
  args: {
    coin: mockCoin,
    isAddCoinMode: true,
    size: "small",
  },
  parameters: {
    docs: {
      description: {
        story: "Button in 'Add Coin' mode with a smaller size.",
      },
    },
  },
};

export const LargeButton: Story = {
  args: {
    coin: mockCoin,
    isAddCoinMode: true,
    size: "large",
  },
  parameters: {
    docs: {
      description: {
        story: "Button in 'Add Coin' mode with a larger size.",
      },
    },
  },
};
