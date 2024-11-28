import type { Meta, StoryObj } from '@storybook/react';

import { EnumInput } from '../EnumInput';
import { useState } from 'react';

const meta = {
  title: 'Commons/BasicInputs/EnumInput',
  tags: ['autodocs'],
} satisfies Meta<typeof EnumInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    const options = ['apple', 'banana', 'orange', 'kiwi', 'lemon'];

    return (
      <EnumInput
        options={options}
        value={value}
        onChange={(newVals) => setValue(newVals)}
      />
    )
  }
};

export const CreatableSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    const options = ['apple', 'banana', 'orange', 'kiwi', 'lemon'];

    return (
      <EnumInput
        isCreatable
        options={options}
        value={value}
        onChange={(newVals) => setValue(newVals)}
      />
    )
  }
};

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    const options = ['apple', 'banana', 'orange', 'kiwi', 'lemon'];

    return (
      <EnumInput
        isCreatable
        options={options}
        value={values}
        onChange={(newVals) => setValues(newVals)}
      />
    )
  }
}
