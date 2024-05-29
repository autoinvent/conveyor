import type { Meta, StoryObj } from '@storybook/react';

import { ModelIndex } from './ModelIndex';

const meta = {
  title: 'Model/ModelIndex/ModelIndex',
  component: ModelIndex,
  tags: ['autodocs'],
  args: {
    model: 'Feline',
    fields: ['type', 'name', 'food'],
    data: [
      { type: 'Tiger', name: 'Tigger', food: 'fish' },
      { type: 'Cat', name: 'Duchess', food: 'chicken' },
      { type: 'Lion', name: 'Simba', food: 'Zebra' },
    ],
  },
} satisfies Meta<typeof ModelIndex>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const NoFields: Story = {
  args: {
    fields: [],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};
