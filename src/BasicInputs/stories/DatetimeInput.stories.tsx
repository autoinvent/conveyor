import type { Meta, StoryObj } from '@storybook/react';
import { DatetimeInput } from '../DatetimeInput';

const meta = {
  title: 'Commons/DateTime',
  tags: ['autodocs'],
  component: DatetimeInput,
  args: {
    value: '2024-07-10T23:12:34',
    granularity: 'Minute',
    hourCycle: 12,
  },
} satisfies Meta<typeof DatetimeInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
