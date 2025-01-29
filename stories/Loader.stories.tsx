import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Loader from "../src/components/Loader/Loader";
import "@/app/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A loader component centered vertically and horizontally",
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
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "The default loader that displays a centered spinner.",
      },
    },
  },
};
