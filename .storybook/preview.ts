import type { Preview } from "@storybook/react";
import { getRouter } from "@storybook/nextjs/router.mock";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
