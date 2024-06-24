import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import TableStoryMeta from './Table.stories';

const meta = {
  title: 'Commons/Table/CustomizingTable',
  component: Table,
  tags: ['autodocs'],
  args: { ...TableStoryMeta.args },
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CustomTableCells: Story = {
  render: (props) => {
    return (
      <Table {...props}>
        <Table.Head>
          <Table.HeaderRow prefilled={true}>
            <Table.HeaderCell columnId="username">
              Username (f.l)
            </Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Head>
        <Table.Body>
          <Table.Row prefilled={true}>
            <Table.Cell columnId="username">Hello</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

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
