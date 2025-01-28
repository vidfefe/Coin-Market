import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import PriceChart from "./PriceChart";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import "@/app/globals.css";

const meta: Meta<typeof PriceChart> = {
  component: PriceChart,
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "The price data to be displayed on the chart.",
    },
    currentPrice: {
      description:
        "The current price of the asset, displayed as a reference line.",
    },
    interval: {
      description:
        "The time interval for the chart data (e.g., 'h1' for 1 day).",
    },
    onIntervalChange: {
      description:
        "Callback function triggered when the interval is changed. The selected interval is passed as an argument.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A price chart component that displays the price of an asset over time. It includes controls to select the time interval and a reference line showing the current price.",
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
type Story = StoryObj<typeof PriceChart>;

export const Default: Story = {
  args: {
    data: [
      { time: Date.now() - 86400000 * 5, priceUsd: 4300 },
      { time: Date.now() - 86400000 * 4, priceUsd: 4300 },
      { time: Date.now() - 86400000 * 3, priceUsd: 3200 },
      { time: Date.now() - 86400000 * 2, priceUsd: 5590 },
      { time: Date.now() - 86400000, priceUsd: 3300 },
      { time: Date.now(), priceUsd: 3350 },
    ],
    currentPrice: 3300,
    interval: "m5",
    onIntervalChange: action("onIntervalChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A default story showing the price chart with 12-hour data (interval 'm30'). The user can select a different interval.",
      },
    },
  },
};

export const IntervalM5: Story = {
  args: {
    data: [
      { time: Date.now() - 3600000 * 5, priceUsd: 5200 },
      { time: Date.now() - 3600000 * 4, priceUsd: 3250 },
      { time: Date.now() - 3600000 * 3, priceUsd: 4300 },
      { time: Date.now() - 3600000 * 2, priceUsd: 3350 },
      { time: Date.now() - 3600000 * 4, priceUsd: 3250 },
      { time: Date.now(), priceUsd: 3450 },
    ],
    currentPrice: 3300,
    interval: "m5",
    onIntervalChange: action("onIntervalChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The price chart with a 1-hour interval ('m5'). The user can interact with the interval selector to change the view.",
      },
    },
  },
};

export const IntervalM30: Story = {
  args: {
    data: [
      { time: Date.now() - 7200000 * 5, priceUsd: 3500 },
      { time: Date.now() - 7200000 * 4, priceUsd: 3600 },
      { time: Date.now() - 7200000 * 3, priceUsd: 3750 },
      { time: Date.now() - 7200000 * 2, priceUsd: 3300 },
      { time: Date.now() - 7200000, priceUsd: 3350 },
      { time: Date.now(), priceUsd: 3400 },
    ],
    currentPrice: 3250,
    interval: "m30",
    onIntervalChange: action("onIntervalChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The price chart with a 12-hour interval ('m30'). The chart displays the price data over the selected period.",
      },
    },
  },
};

export const IntervalH1: Story = {
  args: {
    data: [
      { time: Date.now() - 86400000 * 7, priceUsd: 3000 },
      { time: Date.now() - 86400000 * 6, priceUsd: 3100 },
      { time: Date.now() - 86400000 * 5, priceUsd: 3150 },
      { time: Date.now() - 86400000 * 4, priceUsd: 3200 },
      { time: Date.now() - 86400000 * 3, priceUsd: 3250 },
      { time: Date.now() - 86400000 * 2, priceUsd: 3300 },
      { time: Date.now() - 86400000, priceUsd: 3350 },
      { time: Date.now(), priceUsd: 3400 },
    ],
    currentPrice: 3200,
    interval: "h1",
    onIntervalChange: action("onIntervalChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The price chart with a 1-day interval ('h1'). The chart shows the price changes throughout the day.",
      },
    },
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
    currentPrice: 0,
    interval: "m30",
    onIntervalChange: action("onIntervalChange"),
  },
  parameters: {
    docs: {
      description: {
        story: "This story shows the price chart with no data available.",
      },
    },
  },
};
