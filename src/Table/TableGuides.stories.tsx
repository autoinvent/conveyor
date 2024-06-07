import { useEffect, useState } from 'react';

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
  render: ({ columnIds: argsColumnIds, ...rest }) => {
    const [columnIds, setColumnIds] = useState(argsColumnIds);

    useEffect(() => {
      setColumnIds(argsColumnIds);
    }, [argsColumnIds]);

    return (
      <div className="flex flex-col">
        <Table {...rest} columnIds={columnIds} />
        <button
          className="m-auto mt-4"
          type="button"
          onClick={() => {
            setColumnIds((oldOrder) => {
              const newOrder = [...oldOrder];
              const firstColumnId = newOrder.shift();
              return firstColumnId === undefined
                ? []
                : [...newOrder, firstColumnId];
            });
          }}
        >
          reorder
        </button>
      </div>
    );
  },
};
