import type { Meta, StoryObj } from '@storybook/react';

import { ScalarTypes } from '@/types';

import { ModelForm } from './ModelForm';

const meta = {
  title: 'Model/ModelForm/ModelForm',
  component: ModelForm,
  tags: ['autodocs'],
  args: {
    title: 'Disney Cats',
    fields: [
      'id',
      'type',
      {
        name: 'name',
        type: ScalarTypes.STRING,
        editable: true,
        required: true,
      },
      { name: 'isHappy', type: ScalarTypes.BOOLEAN, editable: true },
      { name: 'released', type: ScalarTypes.DATETIME, editable: true },
      {
        name: 'bestBearFriend',
        type: 'DisneyBear',
        editable: true,
        sortable: false,
      },
    ],
    data: {
      id: '1',
      type: 'Tiger',
      name: 'Tigger',
      isHappy: false,
      released: null,
      bestBearFriend: { id: '1' },
    },
    onCreate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 3000)),
  },
  argTypes: {
    showActions: {
      control: 'boolean',
    },
    onCreate: { control: false },
    onUpdate: { control: false },
    onDelete: { control: false },
  },
  render: (props) => {
    return <ModelForm {...props} />;
  },
} satisfies Meta<typeof ModelForm>;
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
    data: {},
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
