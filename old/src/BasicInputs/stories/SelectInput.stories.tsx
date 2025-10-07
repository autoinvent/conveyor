import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SelectInput } from '../SelectInput';

const meta = {
  title: 'Commons/BasicInputs/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'mountain', label: 'Mountain' },
      { value: 'ocean', label: 'Ocean' },
      { value: 'whisper', label: 'Whisper' },
      { value: 'butterfly', label: 'Butterfly' },
      { value: 'galaxy', label: 'Galaxy' },
      { value: 'harmony', label: 'Harmony' },
      { value: 'puzzle', label: 'Puzzle' },
      { value: 'symphony', label: 'Symphony' },
      { value: 'labyrinth', label: 'Labyrinth' },
    ],
  },
  render: (props) => {
    const [values, setValues] = useState<any>(props.value);
    return (
      <div className="space-y-2">
        <div>Value: {JSON.stringify(values)}</div>
        <SelectInput {...props} value={values} onChange={setValues} />
      </div>
    );
  },
} satisfies Meta<typeof SelectInput>;
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
