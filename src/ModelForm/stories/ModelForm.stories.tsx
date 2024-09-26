import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { type ActionParams, DataLens, type DataType, FieldType } from '@/types';

import { ModelForm } from '../ModelForm';

const meta = {
  title: 'Models/ModelForm/General',
  component: ModelForm,
  tags: ['autodocs'],
  argTypes: {
    onCreate: { control: false },
    onUpdate: { control: false },
    onDelete: { control: false },
  },
  args: {
    model: 'Task',
    fields: ['id', 'message', 'user', 'created_at', 'points', 'done'],
    fieldOptions: {
      id: {
        editable: false,
        hidden: true,
      },
      user: {
        type: FieldType.MODEL_ITEM,
        valueOptions: [
          { label: 'robxbob', value: '00000001' },
          { label: 'nicklitvin', value: '00000002' },
          { label: 'cmacgray14', value: '00000003' },
          { label: 'None', value: '' },
        ],
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
      user: { id: '00000001', _display_value: 'robxbob' },
      created_at: '2024-07-10T01:56:34.926365',
      points: 1,
      done: true,
    },
    initialLens: DataLens.INPUT,
    onCreate: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  render: ({ data, onCreate, onUpdate, onDelete, ...args }) => {
    const [currData] = useState<DataType>(data);

    const onUpdateHandler = async (params: ActionParams<DataType>) => {
      await onUpdate?.(params);
    };

    const onDeleteHandler = async (params: ActionParams<DataType>) => {
      await onUpdate?.(params);
    };

    return (
      <ModelForm
        data={currData}
        // onCreate={onCreateHandler}
        onUpdate={onUpdateHandler}
        onDelete={onDeleteHandler}
        {...args}
      />
    );
  },
} satisfies Meta<typeof ModelForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const OnUpdateIsUndefined: Story = {
  render: ({ data, onCreate, onUpdate, onDelete, ...args }) => {
    const [currData] = useState<DataType>(data);
    return <ModelForm onDelete={onDelete} data={currData} {...args} />;
  },
};

// export const NoFields: Story = {
//   args: {
//     fields: [],
//   },
// };

// export const NoData: Story = {
//   args: {
//     data: [],
//   },
// };

// export const UndefinedData: Story = {
//   args: {
//     data: undefined,
//   },
// };

// export const ReadOnly = {
//   args: {
//     tableOptions: {
//       readOnly: true,
//       columnOptions: meta.args.tableOptions.columnOptions,
//     },
//   },
// };
