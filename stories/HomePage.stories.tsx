import { Meta, StoryObj } from "@storybook/react";
import Home from "../src/app/page";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import React from "react";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "@/app/globals.css";

const meta: Meta<typeof Home> = {
  component: Home,
  title: "HomePage",
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          "The HomePage component is the main page of the application.",
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

type Story = StoryObj<typeof Home>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
      docs: {
        description:
          "Displays the main page with an overview of the header, user's portfolio, allowing interaction with the portfolio and table of coins.",
      },
    },
  },
};
