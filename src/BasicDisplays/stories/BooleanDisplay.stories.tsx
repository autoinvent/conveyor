import type { Meta, StoryObj } from '@storybook/react';

import { BooleanDisplay } from '../BooleanDisplay';

const meta = {
  title: 'Commons/Displays/BooleanDisplay',
  component: BooleanDisplay,
  tags: ['autodocs'],
} satisfies Meta<typeof BooleanDisplay>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    value: true,
  },
};

export const NullValue: Story = {
  args: {
    value: null,
  },
};
