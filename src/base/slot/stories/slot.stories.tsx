import type { Meta, StoryObj } from '@storybook/react';

import { faker } from '@faker-js/faker';

import { SlotProvider } from '../contexts/slot-context';

const meta: Meta<typeof SlotProvider> = {
  title: 'Base UI/Slot',
  component: SlotProvider,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: () => {},
};
