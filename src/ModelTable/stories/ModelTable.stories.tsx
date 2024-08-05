import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ActionParams, DataType, TableView } from '@/types';

import { ModelTable } from '../ModelTable';

const meta = {
  title: 'Models/ModelTable',
  component: ModelTable,
  tags: ['autodocs'],
  argTypes: {
    onUpdate: { control: false },
    onDelete: { control: false },
  },
  args: {
    fields: ['id', 'title', 'author', 'published', 'rating', 'genre'],
    data: [
      {
        id: '1',
        title: 'The House of the Scorpion',
        author: 'Nancy Farmer',
        published: '2002-01-01T01:56:34.926365',
        rating: 4.1,
        genre: 'fiction',
      },
    ],
    tableOptions: {
      columnOptions: {
        id: {
          editable: false,
          sortable: false,
          hidable: false,
        },
        title: {
          hidable: false,
          rules: { required: 'Title is required!' },
        },
        author: {
          sortable: false,
        },
        rating: {
          label: 'Rating ⭐',
        },
      },
    },
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
  render: ({ tableOptions, data, onUpdate, onDelete, ...args }) => {
    const [currData, setCurrData] = useState<undefined | DataType[]>(data);
    const [sortOrder, onSortOrderChange] =
      useState<TableView['sort']>(undefined);
    const [fieldOrder, onFieldOrderChange] = useState<string[] | undefined>(
      undefined,
    );

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
      columnOptions: {
        id: {
          editable: false,
          sortable: false,
          hidable: false,
        },
        title: {
          hidable: false,
          rules: { required: 'Title is required!' },
        },
        author: {
          sortable: false,
        },
        rating: {
          label: 'Rating ⭐',
        },
      },
    },
  },
};
