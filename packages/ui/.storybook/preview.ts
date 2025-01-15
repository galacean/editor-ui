import { resetStyle } from '../src/design-system'
import type { Preview } from '@storybook/react'

resetStyle()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#111',
        },
        {
          name: 'light',
          value: '#fff',
        },
      ],
    },
    layout: 'centered',
  },
}

export default preview
