import type { Meta, StoryObj } from '@storybook/react';

import { ScalarTypes } from '@/types';

import { ModelIndex } from './ModelIndex';

const meta = {
  title: 'Model/ModelIndex/ModelIndex',
  component: ModelIndex,
  tags: ['autodocs'],
  args: {
    model: 'DisneyFelines',
    fields: [
      { name: 'id', type: ScalarTypes.STRING },
      'type',
      {
        name: 'name',
        type: ScalarTypes.STRING,
        editable: true,
        required: true,
      },
      { name: 'happy', type: ScalarTypes.BOOLEAN, editable: true },
      { name: 'released', type: ScalarTypes.DATETIME, editable: true },
    ],
    data: [
      {
        id: '1',
        type: 'Tiger',
        name: 'Tigger',
        happy: false,
        released: '1928-10-1',
      },
      {
        id: '2',
        type: 'Cat',
        name: 'Duchess',
        happy: true,
        released: '1994-06-24',
      },
      {
        id: '3',
        type: 'Lion',
        name: 'Simba',
        happy: true,
        released: '1970-12-24',
      },
    ],
  },
  argTypes: {
    showActions: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ModelIndex>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const NoFields: Story = {
  args: {
    fields: [],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};

export const DisableActions = {
  args: {
    showActions: false,
  },
};
