import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table, useData } from '@/index';

const meta = {
  title: 'Commons/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    data: [
      { firstname: 'Robert', lastname: 'Hernandez' },
      { firstname: 'Jeffrey', lastname: 'Davis' },
      { firstname: 'Aidan', lastname: 'Glenister' },
    ],
    columnIds: ['firstname', 'lastname', 'username', 'non'],
  },
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    const [columnIds, setColumnIds] = useState(props.columnIds);
    const changeOrder = () => {
      setColumnIds((state) => {
        const [first, ...rest] = state;
        return [...rest, first];
      });
    };

    useEffect(() => {
      if (JSON.stringify(props.columnIds) !== JSON.stringify(columnIds))
        setColumnIds(props.columnIds);
    }, [props.columnIds]);

    return (
      <>
        <Table data={props.data} columnIds={columnIds}>
          <Table.Head>
            <Table.Row>
              <Table.Header columnId='firstname'>First Name</Table.Header>
              <Table.Header columnId='lastname'>Last Name</Table.Header>
              <Table.Header columnId='username'>User Name</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell columnId='firstname'>
                <CustomCell field='firstname' />
              </Table.Cell>
              <Table.Cell columnId='lastname'>
                <CustomCell field='lastname' />
              </Table.Cell>
              <Table.Cell columnId='username'>
                <CustomCombinedCell />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.BodyFallback>
            <Table.RowFallback>
              <Table.CellFallback>No data found</Table.CellFallback>
            </Table.RowFallback>
          </Table.BodyFallback>
        </Table>
        <button onClick={changeOrder}>Reorder</button>
      </>
    );
  },
};

const CustomCell = ({ field }: { field: string }) => {
  const { current } = useData();
  const fieldData = current?.[field];
  return fieldData;
};

const CustomCombinedCell = () => {
  const { current } = useData();
  const combined = Object.entries(current)
    .map((entry: any) => entry[1])
    .join('.');
  return combined;
};
