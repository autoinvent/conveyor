import type { Meta, StoryObj } from '@storybook/react';

import { EnumInput } from '../EnumInput';
import { useState } from 'react';

const meta = {
  title: 'Commons/BasicInputs/EnumInput',
  component: EnumInput,
  tags: ['autodocs'],
  args: {
    options: ['apple', 'banana', 'orange', 'kiwi', 'lemon'],
  },
  render: (props) => {
    const [values, setValues] = useState<any>(props.value);
    console.log(values);
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
