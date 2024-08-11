import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  type ActionParams,
  type DataType,
  FieldType,
  type TableView,
} from '@/types';

import { ModelTable } from '../ModelTable';

const meta = {
  title: 'Models/ModelTable/General',
  component: ModelTable,
  tags: ['autodocs'],
  argTypes: {
    onUpdate: { control: false },
    onDelete: { control: false },
  },
  args: {
    fields: ['id', 'message', 'created_at', 'points', 'done'],
    // fields: ['id', 'message', 'user', 'created_at', 'points', 'done'],
    data: [
      {
        id: '1',
        message: 'Make Table Scrollable',
        user: { id: '1' },
        created_at: '2024-07-10T01:56:34.926365',
        points: 1,
        done: true,
      },
      {
        id: '2',
        message: 'Resizable Columns',
        user: { id: '3' },
        created_at: '2024-08-01T01:56:34.926365',
        points: 3,
        done: false,
      },
      {
        id: '3',
        message: 'Feature: Column DnD',
        user: { id: '2' },
        created_at: '2024-07-29T01:56:34.926365',
        points: 4,
        done: true,
      },
    ],
    tableOptions: {
      fieldOrder: [], // dummy
      onFieldOrderChange: () => null, // dummy
      columnOptions: {
        id: {
          editable: false,
          sortable: false,
          hidden: true,
        },
        user: {
          type: FieldType.MODEL_ITEM,
        },
        message: {
          rules: { required: 'Message is required!' },
        },
        created_at: {
          sortable: false,
          type: FieldType.DATETIME,
        },
        points: {
          type: FieldType.INT,
        },
        done: {
          label: 'FINISHED 🏁',
          type: FieldType.BOOLEAN,
          hidable: false,
        },
      },
    },
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  render: ({ fields, tableOptions, data, onUpdate, onDelete, ...args }) => {
    const [currData, setCurrData] = useState<undefined | DataType[]>(data);
    const [sortOrder, onSortOrderChange] =
      useState<TableView['sort']>(undefined);
    const [fieldOrder, onFieldOrderChange] = useState([...fields]);

    const onUpdateHandler = async (params: ActionParams<DataType>) => {
      await onUpdate?.(params);
      const id = params?.data?.id;
      if (id) {
        setCurrData((oldData) => {
          const idx = oldData?.findIndex((d: DataType) => d.id === id);
          if (idx !== undefined && idx >= 0 && oldData) {
            const newData = [...oldData];
            newData[idx] = params.data;
            return newData;
          }
          return oldData;
        });
      }
    };

    const onDeleteHandler = async (d: DataType) => {
      await onDelete?.(d);
      const id = d?.id;
      if (id) {
        setCurrData((oldData) => {
          const idx = oldData?.findIndex((d: DataType) => d.id === id);
          if (idx !== undefined && idx >= 0 && oldData) {
            const newData = [...oldData];
            newData.splice(idx, 1);
            return newData;
          }
          return oldData;
        });
      }
    };

    return (
      <ModelTable
        fields={fields}
        data={currData}
        tableOptions={{
          ...tableOptions,
          sortOrder,
          onSortOrderChange,
          fieldOrder,
          onFieldOrderChange,
        }}
        onUpdate={onUpdateHandler}
        onDelete={onDeleteHandler}
        {...args}
      />
    );
  },
} satisfies Meta<typeof ModelTable>;
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

export const ReadOnly = {
  args: {
    tableOptions: {
      readOnly: true,
      columnOptions: meta.args.tableOptions.columnOptions,
    },
  },
};
