import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ModelInput } from '../ModelInput';

const meta = {
  title: 'Commons/BasicInputs/ModelInput',
  component: ModelInput,
  tags: ['autodocs'],
  args: {
    options: [
      { id: 'apple', displayValue: 'Apple' },
      { id: 'mountain', displayValue: 'Mountain' },
      { id: 'ocean', displayValue: 'Ocean' },
      { id: 'whisper', displayValue: 'Whisper' },
      { id: 'butterfly', displayValue: 'Butterfly' },
      { id: 'galaxy', displayValue: 'Galaxy' },
      { id: 'harmony', displayValue: 'Harmony' },
      { id: 'puzzle', displayValue: 'Puzzle' },
      { id: 'symphony', displayValue: 'Symphony' },
      { id: 'labyrinth', displayValue: 'Labyrinth' },
    ],
  },
  render: (props) => {
    const [values, setValues] = useState<any>(props.value);
    return (
      <div className="space-y-2">
        <div>Value: {JSON.stringify(values)}</div>
        <ModelInput {...props} value={values} onChange={setValues} />
      </div>
    );
  },
} satisfies Meta<typeof ModelInput>;
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
