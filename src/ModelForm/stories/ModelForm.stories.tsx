import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Action } from '@/Actions/ActionContext';
import { DataLens, type DataType, FieldType } from '@/types';

import { ModelForm } from '../ModelForm';

const meta = {
  title: 'Models/ModelForm/General',
  component: ModelForm,
  tags: ['autodocs'],
  args: {
    model: 'Task',
    fields: ['id', 'message', 'user', 'created_at', 'points', 'done'],
    fieldOptions: {
      id: {
        editable: false,
        hidden: true,
      },
      user: {
        type: FieldType.MODEL,
        inputProps: {
          options: [
            { label: 'robxbob', value: '00000001' },
            { label: 'nicklitvin', value: '00000002' },
            { label: 'cmacgray14', value: '00000003' },
            { label: 'None', value: '' },
          ],
        },
      },
      message: {
        required: true,
      },
      created_at: {
        type: FieldType.DATETIME,
      },
      points: {
        type: FieldType.INT,
      },
      done: {
        label: 'FINISHED 🏁',
        type: FieldType.BOOLEAN,
      },
    },
    data: {
      id: '1',
      message: 'Make Table Scrollable',
      user: { id: '00000001', displayValue: 'robxbob' },
      created_at: '2024-07-10T01:56:34.926365',
      points: 1,
      done: true,
    },
    initialLens: DataLens.INPUT,
    actionOptions: {
      actions: {
        [Action.SUBMIT]: () =>
          new Promise((resolve) => setTimeout(resolve, 2000)),
        [Action.DELETE]: () =>
          new Promise((resolve) => setTimeout(resolve, 2000)),
        [Action.CANCEL_EDIT]: () =>
          new Promise((resolve) => setTimeout(resolve, 2000)),
      },
      actionProps: {
        [Action.SUBMIT]: { children: 'CREATE', variant: 'ghost-success' },
      },
    },
  },
  render: ({ data, ...args }) => {
    const [currData] = useState<DataType>(data);

    return <ModelForm data={currData} {...args} />;
  },
} satisfies Meta<typeof ModelForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
