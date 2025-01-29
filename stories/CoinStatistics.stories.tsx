import type { Meta, StoryObj } from "@storybook/react";
import CoinStatistics from "../src/components/CoinStatistics/CoinStatistics";
import "@/app/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

const meta: Meta<typeof CoinStatistics> = {
  component: CoinStatistics,
  tags: ["autodocs"],
  argTypes: {
    supply: {
      description: "The current circulating supply of the coin.",
    },
    maxSupply: {
      description: "The maximum supply of the coin (if available).",
    },
    marketCapUsd: {
      description: "The market capitalization of the coin in USD.",
    },
    rank: {
      description: "The rank of the coin in the market.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A component that displays various statistics of a coin, including supply, max supply, market cap, and rank.",
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
type Story = StoryObj<typeof CoinStatistics>;

export const Default: Story = {
  args: {
    supply: "21000000",
    maxSupply: "21000000",
    marketCapUsd: "42000000000",
    rank: "1",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the statistics for a coin with standard data.",
      },
    },
  },
};

export const MissingMaxSupply: Story = {
  args: {
    supply: "21000000",
    maxSupply: null,
    marketCapUsd: "42000000000",
    rank: "2",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the statistics for a coin with no max supply.",
      },
    },
  },
};

export const LowRank: Story = {
  args: {
    supply: "500000000",
    maxSupply: "1000000000",
    marketCapUsd: "1000000000",
    rank: "500",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the statistics for a coin with a low rank.",
      },
    },
  },
};

export const SmallSupply: Story = {
  args: {
    supply: "100000",
    maxSupply: "10000000",
    marketCapUsd: "500000000",
    rank: "50",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the statistics for a coin with a small supply.",
      },
    },
  },
};
