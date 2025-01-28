import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "antd";
import { action } from "@storybook/addon-actions";
import ModalFooter from "./ModalFooter";

const meta: Meta<typeof ModalFooter> = {
  component: ModalFooter,
  tags: ["autodocs"],
  argTypes: {
    onCancel: {
      description: "Callback triggered when cancel is clicked.",
    },
    onSubmit: {
      description: "Callback triggered when submit is clicked.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Footer of a modal that turns on the action buttons.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalFooter>;

export const DefaultFooter: Story = {
  args: {
    onCancel: action("onCancel"),
    onSubmit: action("onSubmit"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A default footer of a modal  with the 'Cancel' and 'Submit' buttons.",
      },
    },
  },
};
