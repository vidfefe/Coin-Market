import { Meta, StoryObj } from "@storybook/react";
import { ModalPortfolio } from "../src/components/ModalPortfolio/ModalPortfolio";
import { AddCoinModalContent } from "../src/components/ModalPortfolio/ModalContent";
import { CoinsData } from "@/types/coinsData";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { action } from "@storybook/addon-actions";
import ModalFooter from "../src/components/ModalPortfolio/ModalFooter";
import "@/app/globals.css";

const meta: Meta<typeof ModalPortfolio> = {
  title: "Components/ModalPortfolio/ModalAddCoin",
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
          "A modal that allows adding a new coin to the portfolio, with customizable content and footer.",
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

export const DefaultAddCoinModal: ModalPortfolioStory = {
  args: {
    visible: true,
    title: "Add Coin to Portfolio",
    onCancel: action("onCancel"),
    content: (
      <AddCoinModalContent
        coin={
          {
            id: "bitcoin",
            name: "Bitcoin",
            priceUsd: "29000.5",
            symbol: "BTC",
          } as CoinsData
        }
        quantity={10}
        setQuantity={action("setQuantity")}
      />
    ),
    footer: (
      <ModalFooter
        onCancel={action("onCancel")}
        onSubmit={action("onSubmit")}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A modal for adding a new coin to the portfolio, including a quantity input and an action to update the quantity.",
      },
    },
  },
};
