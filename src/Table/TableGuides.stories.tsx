import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/lib/components/ui/button';

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
        <Button
          variant="outline"
          className="m-auto mt-4 border border-border px-2 py-1"
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
        </Button>
      </div>
    );
  },
};

export const ColumnVisibility: Story = {
  render: (props) => {
    const givenColumns = props.columnIds;
    const [visibleColumns, setVisibleColumns] = useState<boolean []>(Array(givenColumns.length).fill(true));
    // const [visibleColumns, setVisibleColumns] = useState<string []>(givenColumns); //initialize object with columns

    function isColumnVisible(column: string): boolean {
      return visibleColumns[givenColumns.indexOf(column)];
    };

    function allColumnsVisible(): boolean {
      return visibleColumns.every((b) => b === true);
    };

    function handleCheckboxChange(column: string) {
      const newVisibleColumns = [...visibleColumns];
      if (isColumnVisible(column) === true) {
        newVisibleColumns[givenColumns.indexOf(column)] = false;
      }
      else {
        newVisibleColumns[givenColumns.indexOf(column)] = true;
      }
      setVisibleColumns(newVisibleColumns);
    };

    function handleToggleAllChange() {
      if (allColumnsVisible() === true) {
        setVisibleColumns(Array(givenColumns.length).fill(false));
      }
      else {
        setVisibleColumns(Array(givenColumns.length).fill(true));
      }
    }

    return (
      <>
        <div className='inline-block rounded border border-black shadow'>
          <div className='border-black border-b px-1'>
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: allColumnsVisible(),
                  onChange: () => handleToggleAllChange(),
                }}
              />{' '}
              Toggle All
            </label>
          </div>
          {givenColumns.map((column) => {
            return ( 
              <div key={column} className="px-1">
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      checked: isColumnVisible(column),
                      onChange: () => handleCheckboxChange(column)
                    }}
                  />{' '}
                  {column}
                </label>
              </div>
            );
          })}
        </div>
        <Table {...props} columnIds={givenColumns.filter((column, i) => visibleColumns[i] === true)}/>
      </>
    );
  },
};
