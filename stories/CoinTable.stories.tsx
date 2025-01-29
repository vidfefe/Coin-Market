import { Meta, StoryObj } from "@storybook/react";
import CoinTable from "../src/components/CoinTable/CoinTable";
import theme from "@/theme/themeConfig";
import React from "react";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { ConfigProvider } from "antd";
import "@/app/globals.css";

const meta: Meta<typeof CoinTable> = {
  component: CoinTable,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
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

type Story = StoryObj<typeof CoinTable>;

export const Default: Story = {
  args: {
    searchCoin: "",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/coins",
        query: {},
      },
    },
  },
};

export const WithSearch: Story = {
  args: {
    searchCoin: "Bitcoin",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/coins",
        query: { searchCoin: "Bitcoin" },
      },
    },
  },
};
