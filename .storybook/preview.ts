import { faker } from '@faker-js/faker';
import type { Preview } from '@storybook/react';
import { withBackgroundTheme, withThemeTool } from './decorators/theme';

import '../src/styles/tailwind.css';

faker.seed(123);

const preview: Preview = {
  decorators: [withThemeTool, withBackgroundTheme],
  parameters: {
    backgrounds: { disabled: true },
  },
  tags: ['autodocs'],
};

export default preview;
