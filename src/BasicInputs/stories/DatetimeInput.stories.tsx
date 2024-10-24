import type { Meta, StoryObj } from '@storybook/react';

import { DatetimeInput } from '../DatetimeInput';
import { useState } from 'react';

const meta = {
  title: 'Commons/DateTime',
  tags: ['autodocs'],
  render: () => {
    const [date, setDate] = useState<string|undefined>('2024-07-10T23:12:34');
    return (
      <DatetimeInput 
        value={date}
        onChange={setDate}
        granularity='Day'
        hourCycle={24}
      />
    )
  }
} satisfies Meta<typeof DatetimeInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
