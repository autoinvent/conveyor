import type { Meta, StoryObj } from '@storybook/react';
import { DatetimeInput2 } from '../DatetimeInput2';

const meta = {
  title: 'Commons/DateTime',
  tags: ['autodocs'],
  component: DatetimeInput2,
} satisfies Meta<typeof DatetimeInput2>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
