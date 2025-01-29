import { Meta, StoryObj } from "@storybook/react";
import { PortfolioModalContent } from "../src/components/ModalPortfolio/ModalContent";
import { PortfolioCoin } from "@/types/portfolioCoin";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { action } from "@storybook/addon-actions";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "@/app/globals.css";

const meta: Meta<typeof PortfolioModalContent> = {
  title: "Components/ModalPortfolio/PortfolioModalContent",
  component: PortfolioModalContent,
  tags: ["autodocs"],
  argTypes: {
    portfolio: {
      description: "Array of coins in the user's portfolio.",
      control: "object",
    },
    handleRemoveCoin: {
      description: "Function to remove a coin from the portfolio.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Component for displaying and managing the portfolio coins.",
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

type PortfolioStory = StoryObj<typeof PortfolioModalContent>;

export const DefaultPortfolioModal: PortfolioStory = {
  args: {
    portfolio: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        quantity: 2,
        initialPriceUsd: 31000.5,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        quantity: 5,
        initialPriceUsd: 2000.2,
      },
    ] as PortfolioCoin[],
    handleRemoveCoin: action("handleRemoveCoin"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default state of the PortfolioModalContent component with a sample portfolio. Coins can be removed from the portfolio by calling the handleRemoveCoin function.",
      },
    },
  },
};
