import { Meta, StoryObj } from "@storybook/react";
import Header from "../src/components/Header/Header";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "@/app/globals.css";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Header component showing popular coins and a portfolio button.",
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
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default Header with popular coins and portfolio button.",
      },
    },
  },
};
