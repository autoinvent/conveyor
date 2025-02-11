import type { Meta, StoryObj } from '@storybook/react';

import { ModelSearchbar } from './ModelSearchbar';

const meta = {
  title: 'Model/ModelSearchbar/ModelSearchbar',
  component: ModelSearchbar,
  tags: ['autodocs'],
  args: {
    onSearch: () => {},
  },
} satisfies Meta<typeof ModelSearchbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
