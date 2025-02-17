import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { EnumInput } from '../EnumInput';

const meta = {
  title: 'Commons/BasicInputs/EnumInput',
  component: EnumInput,
  tags: ['autodocs'],
  args: {
    options: ['apple', 'banana', 'orange', 'kiwi', 'lemon'],
  },
  render: (props) => {
    const [values, setValues] = useState<any>(props.value);
    return (
      <div className="space-y-2">
        <div>Value: {JSON.stringify(values)}</div>
        <EnumInput {...props} value={values} onChange={setValues} />
      </div>
    );
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

export const MultiSelect: Story = {
  args: {
    isMulti: true,
  },
};

export const CreatableMultiSelect: Story = {
  args: {
    isMulti: true,
    isCreatable: true,
  },
};

export const MultiSelectWithValueInference: Story = {
  args: {
    value: [],
  },
};

export const CustomOptions: Story = {
  args: {
    options: [
      { label: <span className="bg-red-400">APPLE</span>, value: 'apple' },
      'banana',
    ],
  },
};
