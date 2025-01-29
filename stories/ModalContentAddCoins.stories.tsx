import { Meta, StoryObj } from "@storybook/react";
import { AddCoinModalContent } from "../src/components/ModalPortfolio/ModalContent";
import { CoinsData } from "@/types/coinsData";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { action } from "@storybook/addon-actions";
import "@/app/globals.css";
import React from "react";

const metaAddCoin: Meta<typeof AddCoinModalContent> = {
  title: "Components/ModalPortfolio/AddCoinModalContent",
  component: AddCoinModalContent,
  tags: ["autodocs"],
  argTypes: {
    coin: {
      description: "The coin object to be added to the portfolio.",
      control: "object",
    },
    quantity: {
      description: "The quantity of the coin to be added.",
      control: "number",
    },
    setQuantity: {
      description: "Function to update the quantity of the coin.",
      action: "quantity updated",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Component for adding a new coin with quantity input.",
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

export default metaAddCoin;

type AddCoinStory = StoryObj<typeof AddCoinModalContent>;

export const DefaultAddCoinModal: AddCoinStory = {
  args: {
    coin: {
      id: "bitcoin",
      name: "Bitcoin",
      priceUsd: "29000.5",
      symbol: "BTC",
    } as CoinsData,
    quantity: 10,
    setQuantity: action("setQuantity"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default state of the AddCoinModalContent component for adding a coin to the portfolio. It displays the coin information and allows the user to set the quantity.",
      },
    },
  },
};
