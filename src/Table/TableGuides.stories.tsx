import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import TableStoryMeta from './Table.stories';

const meta = {
  title: 'Commons/Table/TableGuide',
  component: Table,
  tags: ['autodocs'],
  args: { ...TableStoryMeta.args },
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ColumnReordering: Story = {
  render: (args) => {
    const [columnIds, setColumnIds] = useState(args.columnIds);
    return (
      <div className="flex flex-col">
        <Table {...args} columnIds={columnIds} />
        <button
          className="m-auto mt-4"
          type="button"
          onClick={() => {
            setColumnIds((oldOrder) => {
              const firstColumnId = oldOrder.shift();
              return firstColumnId === undefined
                ? []
                : [...oldOrder, firstColumnId];
            });
          }}
        >
          reorder
        </button>
      </div>
    );
  },
};
