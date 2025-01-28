import type { Meta, StoryObj } from "@storybook/react";
import CoinImage from "./CoinImage";

const meta: Meta<typeof CoinImage> = {
  component: CoinImage,
  tags: ["autodocs"],
  argTypes: {
    symbol: {
      description: "The symbol of the coin.",
    },
    size: {
      description: "The size of the coin image.",
      control: {
        type: "number",
        min: 10,
        max: 100,
        step: 5,
      },
      defaultValue: 20,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A component that displays a coin image based on the symbol. If the image cannot be loaded, a placeholder image is shown.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoinImage>;

export const Default: Story = {
  args: {
    symbol: "BTC",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays the Bitcoin logo at the default size (20px). If the image cannot be loaded, a placeholder image will be shown.",
      },
    },
  },
};

export const SmallerSize: Story = {
  args: {
    symbol: "ETH",
    size: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays the Ethereum logo at a smaller size (10px). This shows how the component adapts to different sizes.",
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    symbol: "LTC",
    size: 90,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays the Litecoin logo at a larger size (90px). The component should scale accordingly.",
      },
    },
  },
};

export const InvalidSymbol: Story = {
  args: {
    symbol: "INVALID",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays a placeholder image when the symbol is invalid or not found. This can be useful for error handling scenarios.",
      },
    },
  },
};
