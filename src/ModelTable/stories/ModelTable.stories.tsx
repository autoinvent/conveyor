import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Action, type ActionParams } from '@/Actions/ActionContext';
import { type DataType, FieldType, type TableView } from '@/types';

import { ModelTable } from '../ModelTable';

const meta = {
  title: 'Models/ModelTable/General',
  component: ModelTable,
  tags: ['autodocs'],
  args: {
    model: 'Task',
    fields: ['id', 'message', 'user', 'created_at', 'points', 'done'],
    fieldOrder: [], // dummy
    onFieldOrderChange: () => null, // dummy
    tableOptions: {
      // readOnly: true
    },
    data: [
      {
        id: '1',
        message: 'Make Table Scroll',
        user: { id: '00000001', displayValue: 'robxbob' },
        created_at: '2024-07-10T01:56:34.926365',
        points: 1,
        done: true,
      },
      {
        id: '2',
        message: 'Resizable Columns',
        user: { id: '00000002', displayValue: 'nicklitvin' },
        created_at: '2024-08-01T01:56:34.926365',
        points: 3,
        done: null,
      },
      {
        id: '3',
        message: 'Feature: Column DnD',
        user: { id: '00000001', displayValue: 'robxbob' },
        created_at: '2024-07-29T01:56:34.926365',
        points: 4,
        done: true,
      },
      {
        id: '4',
        message: 'Feature: React Select',
        user: { id: '00000003', displayValue: 'cmacgray14' },
        created_at: '2024-08-14T01:56:34.926365',
        points: 2,
        done: false,
      },
    ],
    columnOptions: {
      id: {
        editable: false,
        sortable: false,
        hidable: false,
        hidden: true,
      },
      user: {
        type: FieldType.MODEL,
        inputProps: {
          options: [
            { displayValue: 'robxbob', id: '00000001' },
            { displayValue: 'nicklitvin', id: '00000002' },
            { displayValue: 'cmacgray14', id: '00000003' },
            { displayValue: 'None', id: null },
          ],
        },
      },
      message: {
        required: true,
      },
      created_at: {
        sortable: false,
        type: FieldType.DATETIME,
        // width: 100
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
    actionOptions: {
      actions: {
        [Action.SUBMIT]: () =>
          new Promise((resolve) => setTimeout(resolve, 2000)),
        [Action.DELETE]: () =>
          new Promise((resolve) => setTimeout(resolve, 2000)),
      },
    },
  },
  render: ({
    fields,
    fieldOrder: dummyFieldOrder,
    onFieldOrderChange: dummyOnFieldOrderChange,
    tableOptions,
    data,
    actionOptions,
    ...args
  }) => {
    const [currData, setCurrData] = useState<DataType[]>(data);
    const [sortOrder, onSortOrderChange] =
      useState<TableView['sort']>(undefined);
    const [fieldOrder, onFieldOrderChange] = useState([...fields]);

    const onSubmitHandler = async (params: ActionParams<DataType>) => {
      await actionOptions?.actions?.[Action.SUBMIT]?.(params);
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
        params.onCancelEdit();
      }
    };

    const onDeleteHandler = async (params: ActionParams<DataType>) => {
      await actionOptions?.actions?.[Action.DELETE]?.(params);
      const id = params?.data?.id;
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
        params.onCancelEdit();
      }
    };

    return (
      <ModelTable
        fields={fields}
        fieldOrder={fieldOrder}
        onFieldOrderChange={onFieldOrderChange}
        data={currData}
        tableOptions={{
          ...tableOptions,
          sortOrder,
          onSortOrderChange,
        }}
        actionOptions={{
          actions: {
            [Action.SUBMIT]: onSubmitHandler,
            [Action.DELETE]: onDeleteHandler,
          },
        }}
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

export const ReadOnly: Story = {
  args: {
    actionOptions: {
      showActions: false,
    },
  },
};

export const RowsAccented = {
  args: {
    tableOptions: {
      selectedRows: ['1', '3'],
    },
  },
};

export const OnUpdateIsUndefined: Story = {
  render: ({
    fields,
    fieldOrder: dummyFieldOrder,
    onFieldOrderChange: dummyOnFieldOrderChange,
    tableOptions,
    data,
    actionOptions,
    ...args
  }) => {
    const [currData, setCurrData] = useState<DataType[]>(data);
    const [sortOrder, onSortOrderChange] =
      useState<TableView['sort']>(undefined);
    const [fieldOrder, onFieldOrderChange] = useState([...fields]);

    const onDeleteHandler = async (params: ActionParams<DataType>) => {
      await actionOptions?.actions?.[Action.DELETE]?.(params);
      const id = params?.data?.id;
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
        params.onCancelEdit();
      }
    };

    return (
      <ModelTable
        fields={fields}
        fieldOrder={fieldOrder}
        onFieldOrderChange={onFieldOrderChange}
        data={currData}
        tableOptions={{
          ...tableOptions,
          sortOrder,
          onSortOrderChange,
        }}
        actionOptions={{
          actions: {
            [Action.DELETE]: onDeleteHandler,
          },
        }}
        {...args}
      />
    );
  },
};
