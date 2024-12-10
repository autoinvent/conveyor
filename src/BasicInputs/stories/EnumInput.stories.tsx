import type { Meta, StoryObj } from '@storybook/react';

import { EnumInput } from '../EnumInput';

const meta = {
  title: 'Commons/BasicInputs/EnumInput',
  component: EnumInput,
  tags: ['autodocs'],
  args: {
    options: ['apple', 'banana', 'orange', 'kiwi', 'lemon'],
    onChange: (newVal) => console.log(newVal),
    value: 'kiwi',
  },
} satisfies Meta<typeof EnumInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {};

export const CreatableSelect: Story = {
  args: {
    isCreatable: true,
  },
};
