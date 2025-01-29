import { Meta, StoryObj } from "@storybook/react";
import { ModalPortfolio } from "../src/components/ModalPortfolio/ModalPortfolio";
import { PortfolioModalContent } from "../src/components/ModalPortfolio/ModalContent";
import { PortfolioCoin } from "@/types/portfolioCoin";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { action } from "@storybook/addon-actions";
import "@/app/globals.css";
import React from "react";

const meta: Meta<typeof ModalPortfolio> = {
  title: "Components/ModalPortfolio/ModalPortfolio",
  component: ModalPortfolio,
  tags: ["autodocs"],
  argTypes: {
    visible: {
      description: "Controls the visibility of the modal.",
      control: "boolean",
    },
    title: {
      description: "The title of the modal.",
      control: "text",
    },
    onCancel: {
      description: "Callback function to handle closing the modal.",
    },
    content: {
      description: "The content to be displayed inside the modal.",
    },
    footer: {
      description:
        "The footer content of the modal, including action buttons like 'Cancel' and 'Submit'.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A modal that displays the user's portfolio, allowing removal of coins and displaying portfolio details.",
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

type ModalPortfolioStory = StoryObj<typeof ModalPortfolio>;

export const DefaultPortfolioModal: ModalPortfolioStory = {
  args: {
    visible: true,
    title: "Your Portfolio",
    onCancel: action("onCancel"),
    content: (
      <PortfolioModalContent
        portfolio={
          [
            {
              id: "bitcoin",
              name: "Bitcoin",
              symbol: "BTC",
              quantity: 2,
              initialPriceUsd: 29000.5,
            },
            {
              id: "ethereum",
              name: "Ethereum",
              symbol: "ETH",
              quantity: 5,
              initialPriceUsd: 2000.2,
            },
          ] as PortfolioCoin[]
        }
        handleRemoveCoin={action("handleRemoveCoin")}
      />
    ),
    footer: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A modal that displays the user's portfolio, allowing removal of coins and displaying portfolio details.",
      },
    },
  },
};
