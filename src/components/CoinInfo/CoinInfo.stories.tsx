import type { Meta, StoryObj } from "@storybook/react";
import CoinInfo from "./CoinInfo";
import { action } from "@storybook/addon-actions";
import "@/app/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

const meta: Meta<typeof CoinInfo> = {
  component: CoinInfo,
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "The name of the coin.",
    },
    symbol: {
      description: "The symbol of the coin.",
    },
    priceUsd: {
      description: "The price of the coin in USD.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A component that displays basic information about a coin, including the name, symbol, and price in USD.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider theme={theme}>
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CoinInfo>;

// Default story with sample data
export const Default: Story = {
  args: {
    name: "Bitcoin",
    symbol: "BTC",
    priceUsd: "45000",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays information for Bitcoin with its current price in USD.",
      },
    },
  },
};

// Story with a very low price
export const LowPrice: Story = {
  args: {
    name: "Synthetix",
    symbol: "SNX",
    priceUsd: "0.01",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays information for a coin with a very low price.",
      },
    },
  },
};

// Story with a very high price
export const HighPrice: Story = {
  args: {
    name: "Ethereum",
    symbol: "ETH",
    priceUsd: "999999999999",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays information for a coin with an extremely high price.",
      },
    },
  },
};
