import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ScalarTypes } from '@/types';

import { ModelIndex } from './ModelIndex';
import { useTableView } from './useTableView';

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
        type: ScalarTypes.STRING,
        rules: { required: 'Name is required.' },
      },
      {
        name: 'isHappy',
        type: ScalarTypes.BOOLEAN,
      },
      { name: 'released', type: ScalarTypes.DATETIME },
      {
        name: 'bestBearFriend',
        type: 'DisneyBear',
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
    onCreate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    paginationOptions: {
      totalDataLength: 514,
    },
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
    const tableViewOptions = useTableView();
    return <ModelIndex {...props} {...tableViewOptions} />;
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

export const LoadedData = {
  render: ({ data, ...props }: any) => {
    const tableViewOptions = useTableView();
    const [currData, setCurrData] = useState(undefined);

    return (
      <>
        <button type="button" onClick={() => setCurrData(data)}>
          Get Data
        </button>
        <button type="button" onClick={() => setCurrData(undefined)}>
          Load Data
        </button>
        <ModelIndex data={currData} {...props} {...tableViewOptions} />
      </>
    );
  },
};
