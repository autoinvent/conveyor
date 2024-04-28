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
    columnIds: ['firstname', 'lastname', 'username'],
  },
  argTypes: {},
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
        <Table {...props} columnIds={columnIds} />
        <button onClick={changeOrder}>Reorder</button>
      </>
    );
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    columnIds: ['firstname', 'lastname'],
  },
};

const CustomCell = ({ field }: { field: string }) => {
  const { data } = useData((state) => state.current);
  const fieldData = data?.[field];
  return <i>{fieldData}</i>;
};

const CustomCombinedCell = () => {
  const { data } = useData((state) => state.current);
  const combined = Object.entries(data)
    .map((entry: any) => entry[1])
    .join('.');
  return combined;
};

export const FullyCustomized: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.HeaderRow>
            <Table.HeaderCell columnId='firstname'>First Name</Table.HeaderCell>
            <Table.HeaderCell columnId='lastname'>Last Name</Table.HeaderCell>
            <Table.HeaderCell columnId='username'>User Name</Table.HeaderCell>
          </Table.HeaderRow>
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
          <Table.BodyFallback>Empty Body</Table.BodyFallback>
        </Table.Body>
      </>
    ),
  },
};
