import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ModelInput } from '../ModelInput';

const meta = {
  title: 'Commons/BasicInputs/ModelInput',
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
  component: ModelInput,
} satisfies Meta<typeof ModelInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {};

export const Creatable: Story = {
  args: {
    isCreatable: true,
  },
};

export const Multi: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <ModelInput
        value={value}
        onChange={setValue}
        options={[
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
        ]}
      />
    );
  },
};
