import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator } from '@storybook/react';

export const withThemeTool: Decorator = withThemeByClassName({
  themes: {
    light: 'light',
    dark: 'dark',
  },
  defaultTheme: 'light',
});

export const withBackgroundTheme: Decorator = (Story) => {
  return (
    <div className="bg-background">
      <Story />
    </div>
  );
};
