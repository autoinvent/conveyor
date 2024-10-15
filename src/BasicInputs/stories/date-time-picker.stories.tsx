import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from '@/lib/components/ui/date-time-picker';

const meta = {
  title: 'Commons/DateTime',
  component: DateTimePicker,
  tags: ['autodocs'],
  args: {
    date: undefined,
    // date: new Date('2024-10-15T16:25:43.192Z'),
    setDate: () => null
  }
} satisfies Meta<typeof DateTimePicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
