import type { Meta, StoryObj } from '@storybook/react';

import { ModelDisplay } from '../ModelDisplay';

const meta = {
  title: 'Commons/Displays/ModelDisplay',
  component: ModelDisplay,
  tags: ['autodocs'],
} satisfies Meta<typeof ModelDisplay>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    value: [
      { displayValue: 'forest' },
      { displayValue: 'waterfall' },
      { displayValue: 'boulder' },
    ],
  },
};

export const getDisplayValue: Story = {
  args: {
    getDisplayValue: (value) => (
      <span key={value.displayValue} className="bg-red-200">
        {value.displayValue}
      </span>
    ),
    value: [
      { displayValue: 'forest' },
      { displayValue: 'waterfall' },
      { displayValue: 'boulder' },
    ],
  },
};
