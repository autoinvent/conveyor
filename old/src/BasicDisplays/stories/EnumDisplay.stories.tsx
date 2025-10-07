import type { Meta, StoryObj } from '@storybook/react';

import { EnumDisplay } from '../EnumDisplay';

const meta = {
  title: 'Commons/Displays/EnumDisplay',
  component: EnumDisplay,
  tags: ['autodocs'],
  args: {
    value: ['apple', 'banana', 'orange', 'kiwi', 'lemon'],
  },
} satisfies Meta<typeof EnumDisplay>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const getDisplayValue: Story = {
  args: {
    getDisplayValue: (value) => (
      <span key={value} className="bg-red-200">
        {value}
      </span>
    ),
  },
};

export const EmptyArrayValue: Story = {
  args: {
    value: [],
  },
};
