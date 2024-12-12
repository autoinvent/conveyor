import type { Meta, StoryObj } from '@storybook/react';

import { EnumInput } from '../EnumInput';
import { useState } from 'react';

const meta = {
  title: 'Commons/BasicInputs/EnumInput',
  tags: ['autodocs'],
  args: {
    options: ['apple', 'banana', 'orange', 'kiwi', 'lemon'],
  },
  component: EnumInput,
} satisfies Meta<typeof EnumInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {};

export const CreatableSelect: Story = {
  args: {
    isCreatable: true,
  },
};

export const MultiSelect: Story = {
  args: {
    isMulti: true,
  },
};

export const MultiSelectWithValueInference: Story = {
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);
    return <EnumInput {...args} value={values} onChange={setValues} />;
  },
};
