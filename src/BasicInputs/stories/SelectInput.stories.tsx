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
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <SelectInput
        value={value}
        onChange={setValue}
        isCreatable
        options={[
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
        ]}
      />
    );
  },
};

export const PortalTarget: Story = {
  render: (props) => {
    return (
      <div className="flex h-80 items-center justify-center bg-black">
        <div
          id="select-portal"
          className="relative flex h-72 w-full items-end justify-center bg-blue-300"
        >
          <div className="absolute h-24 bg-green-300">
            <SelectInput
              {...props}
              maxMenuHeight={100}
              menuPortalTarget={document.getElementById('select-portal')}
            />
          </div>
        </div>
      </div>
    );
  },
};
