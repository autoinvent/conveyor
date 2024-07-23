import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/lib/components/ui/button';
import { Separator } from '@/lib/components/ui/separator';

import { type DataType, FieldTypes, type TableView } from '@/types';

import { ModelIndex } from './ModelIndex';

const meta = {
  title: 'Model/ModelIndex/ModelIndex',
  component: ModelIndex,
  tags: ['autodocs'],
  args: {
    title: 'Disney Cats',
    fields: [
      'id',
      'type',
      {
        name: 'name',
        type: FieldTypes.STRING,
        rules: { required: 'Name is required.' },
      },
      {
        name: 'isHappy',
        type: FieldTypes.BOOLEAN,
      },
      { name: 'released', type: FieldTypes.DATETIME },
      {
        name: 'bestBearFriend',
        type: FieldTypes.MODEL_ITEM,
        sortable: false,
      },
    ],
    data: [
      {
        id: '1',
        type: 'Tiger',
        name: 'Tigger',
        isHappy: false,
        released: null,
        bestBearFriend: { id: '1' },
      },
      {
        id: '2',
        type: 'Cat',
        name: 'Duchess',
        isHappy: true,
        released: '1994-06-24T01:56:34.926365',
        bestBearFriend: null,
      },
      {
        id: '3',
        type: 'Lion',
        name: 'Simba',
        isHappy: true,
        released: '1970-12-24T01:56:34.926365',
        bestBearFriend: null,
      },
    ],
    tableViewOptions: {
      tableView: {},
      onTableViewChange: () => {},
    },
    paginationOptions: {
      totalDataLength: 514,
    },
    readOnly: false,
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 3000)),
  },
  argTypes: {
    readOnly: {
      control: 'boolean',
    },
    onUpdate: { control: false },
    onDelete: { control: false },
  },
} satisfies Meta<typeof ModelIndex>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: ({
    data,
    onUpdate,
    tableViewOptions: defaultTableViewOptions,
    ...props
  }: any) => {
    const [tableView, onTableViewChange] = useState<TableView>({});
    const [currData, setCurrData] = useState<undefined | DataType[]>(data);
    return (
      <>
        <h2 className="ml-4">Data Actions</h2>
        <Button variant="outline" onClick={() => setCurrData(data)}>
          Get Data
        </Button>
        <Button variant="outline" onClick={() => setCurrData(undefined)}>
          Load Data
        </Button>
        <Separator className="my-4" />
        <ModelIndex
          data={currData}
          tableViewOptions={{
            tableView,
            onTableViewChange,
          }}
          onUpdate={(params) => {
            const id = params?.data?.id;
            if (params?.data) {
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
          }}
          onDelete={(data) => {
            const id = data?.id;
            if (data?.id) {
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
          }}
          {...props}
        />
      </>
    );
  },
};

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
    readOnly: true,
  },
};
