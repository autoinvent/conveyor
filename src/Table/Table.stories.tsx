import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import { useState } from 'react';

const meta = {
  title: 'Commons/Table/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    columnIds: ['firstname', 'lastname', 'username'],
    data: [
      { firstname: 'Robert', lastname: 'Hernandez', username: 'robert.hernandez' },
      { firstname: 'Jeffrey', lastname: 'Davis', username: 'jeffrey.davis' },
      { firstname: 'Aidan', lastname: 'Glenister', username: 'aidan.glenister' },
      { firstname: 'Conner', lastname: 'MacGray', username: 'conner.macgray' },
    ],
  },
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const NoColumns: Story = {
  args: {
    columnIds: [],
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

export const ColumnVisibility: Story = {
  render: (args) => {
    const givenColumns = args.columnIds;
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
        <Table {...args} columnIds={givenColumns.filter((column, i) => visibleColumns[i] === true)}/>
      </>
    );
  },
};
