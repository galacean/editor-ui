import { resetStyle } from "@galacean/design-system"
import type { Preview } from "@storybook/react";

import '../src/index.css'

resetStyle();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#111",
        },
        {
          name: "light",
          value: "#fff",
        }
      ]
    },
    layout: "centered"
  },
};
 
export default preview;