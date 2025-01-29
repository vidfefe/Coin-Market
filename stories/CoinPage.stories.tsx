import { Meta, StoryObj } from "@storybook/react";
import CoinDetailsPage from "../src/app/coin/[coinId]/page";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import React, { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "@/app/globals.css";

const meta: Meta<typeof CoinDetailsPage> = {
  component: CoinDetailsPage,
  title: "CoinDetailsPage",
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          "The CoinDetailsPage displays detailed information about a specific coin.",
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={theme}>
          <PortfolioProvider>
            <Story />
          </PortfolioProvider>
        </ConfigProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof CoinDetailsPage>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/coin/[coinId]",

        segments: [["coinId", "bitcoin"]],
      },
    },
    docs: {
      description: "Displays the details of a valid cryptocurrency (Bitcoin).",
    },
  },
};

export const InvalidCoinId: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/coin/[coinId]",
        segments: [["coinId", "NoCoinId"]],
      },
    },
    docs: {
      description:
        "Simulates the case where an invalid or non-existent coin ID is provided.",
    },
  },
};

export const WithLoadingState: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/coin/[coinId]",
        segments: [["coinId", "bitcoin"]],
      },
    },
    docs: {
      description:
        "Simulates a loading state where data is being fetched. A loader is displayed for 3 seconds before showing the coin details.",
    },
  },
  decorators: [
    (Story) => {
      const [isLoading, setIsLoading] = useState(true);

      setTimeout(() => setIsLoading(false), 3000);

      return (
        <ConfigProvider theme={theme}>
          <PortfolioProvider>
            {isLoading ? <Loader /> : <Story />}
          </PortfolioProvider>
        </ConfigProvider>
      );
    },
  ],
};
