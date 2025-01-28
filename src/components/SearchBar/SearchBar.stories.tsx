import type { Meta, StoryObj, Preview } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import SearchBar from "./SearchBar";
import "@/app/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    onSearch: {
      description:
        "Callback function triggered when the search is performed. The search value is passed as an argument.",
    },
    placeholder: {
      description: "Text placeholder displayed in the search bar.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A search bar component that triggers a callback function when the user performs a search.",
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
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: "Search coin by name",
    onSearch: action("onSearch"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A default search bar with a fixed placeholder. The placeholder cannot be changed in this story.",
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Type something...",
    onSearch: action("onSearch"),
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "A search bar where the placeholder can be customized",
      },
    },
  },
};
