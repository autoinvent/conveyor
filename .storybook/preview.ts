import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: getComputedStyle(document.body).getPropertyValue('--bg-color'),
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
