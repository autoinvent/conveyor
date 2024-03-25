import type { Meta, StoryObj } from '@storybook/react';

import { Table, useTableRowData } from '@/Table';
import { useContext } from 'react';
import { SetActiveLensContext } from '@/Lenses';

const meta = {
  title: 'Commons/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    data: [
      { name: 'mimi', specie: 'dog' },
      { name: 'thai', specie: 'cat' },
    ],
    columns: [{ id: 'name' }, { id: 'specie' }],
  },
  argTypes: {
    data: { control: 'object' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    return (
      <>
        <Table {...props}>
          <Table.Body>
            <Table.Row>
              <Table.Cell columnId="name">
                <CustomCell field={'name'} />
              </Table.Cell>
              <Table.Cell columnId="specie">
                <CustomCell field={'specie'} />
              </Table.Cell>
            </Table.Row>
            <Table.RowFallback>
              <Table.CellFallback>No data found</Table.CellFallback>
            </Table.RowFallback>
          </Table.Body>
        </Table>
      </>
    );
  },
};

const CustomCell = ({ field }: { field: string }) => {
  const fieldData = useTableRowData((state) => state[field]);
  return fieldData;
};
