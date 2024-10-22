import React from 'react';

import type { StoryContext, StoryFn } from '@storybook/react';

export const DARK_MODE_BG = '#06080e';
export const LIGHT_MODE_BG = '#ffffff';

/**
 * Surrounds the stories with the correct background color in dark mode while on the docs page
 */
export const withDocsTheme = (StoryFn: StoryFn, context: StoryContext) => {
  if (context.viewMode === 'docs') {
    const theme = context.parameters.theme || context.globals.theme;
    return (
      <div
        style={{
          padding: '12px',
          backgroundColor:
            theme == null || theme.length === 0 || theme === 'light'
              ? LIGHT_MODE_BG
              : DARK_MODE_BG,
        }}
      >
        <StoryFn />
      </div>
    );
  }

  // Return the story as is if not on the docs page
  return <StoryFn />;
};

export default withDocsTheme;
