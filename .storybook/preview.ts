import { withThemeByClassName  } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import '../src/styles/tailwind.css';

import {DARK_MODE_BG, LIGHT_MODE_BG, withDocsTheme} from './with-docs-theme'

const preview: Preview = {
  decorators: [
    withDocsTheme,
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'dark',
          value: DARK_MODE_BG
        },
        {
          name: 'light',
          value: LIGHT_MODE_BG
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs']
};



export default preview;

