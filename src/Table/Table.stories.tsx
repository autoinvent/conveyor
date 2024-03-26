import type { Meta, StoryObj } from '@storybook/react';

import { Table, useTableRow } from '@/Table';
import { useData } from '@/Data';
import { useEffect, useState } from 'react';

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
    columnIds: ['name', 'specie', 'combined', 'non']
  },
  argTypes: {
    data: { control: 'object' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    const [co, sco] = useState(props.columnIds)
    const changeOrder = () => {
      sco((state) => {
        const [first, ...rest] = state
        return [...rest, first]
      })
    }

    useEffect(() => {
      if (JSON.stringify(props.columnIds) !== JSON.stringify(co))
        sco(props.columnIds)
    }, [props.columnIds])

    return (
      <>
        <Table data={props.data} columnIds={co} >
          <Table.Head>
            <Table.Header columnId="name">Name</Table.Header>
            <Table.Header columnId="specie">TYPE</Table.Header>
            <Table.Header columnId="combined">Combined</Table.Header>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell columnId="name">
                <CustomCell field='name' />
              </Table.Cell>
              <Table.Cell columnId="specie">
                <CustomCell field='specie' />
              </Table.Cell>
              <Table.Cell columnId="combined">
                <CustomCombinedCell />
              </Table.Cell>
            </Table.Row>
            <Table.RowFallback>
              <Table.CellFallback>No data found</Table.CellFallback>
            </Table.RowFallback>
          </Table.Body>
        </Table>
        <button onClick={changeOrder}>changeorder</button>
      </>
    );
  },
};

const CustomCell = ({ field }: { field: string }) => {
  const row = useTableRow();
  const fieldData = row?.original?.[field]
  return fieldData;
};

const CustomCombinedCell = () => {
  const row = useTableRow();
  const data = row?.original ?? {}
  const combined = Object.entries(data).map((entry: any) => entry[1]).join()
  return combined;
};
