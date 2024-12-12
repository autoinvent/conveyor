import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { DatetimeInput } from '../DatetimeInput';

const meta = {
  title: 'Commons/BasicInputs/DateTime',
  tags: ['autodocs'],
  render: () => {
    const [date, setDate] = useState<string | undefined | null>(
      '2024-07-10T23:12:34',
    );
    return <DatetimeInput value={date} onChange={setDate} hourCycle={12} />;
  },
} satisfies Meta<typeof DatetimeInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
