import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../components/table';
import { TableBody } from '../components/table-body';
import { faker } from '@faker-js/faker';
import { TableRow } from '../components/table-row';
import { TableCell } from '../components/table-cell';

const meta: Meta<typeof Table> = {
  title: 'Base UI/Table',
  component: Table,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: () => {
    const columnIds = ['firstName', 'lastName'];
    const data = Array.from(Array(5), () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }));
    console.log(data);
    return (
      <>
        <Table columnIds={columnIds} data={data}>
          <TableBody>
            <TableRow>
              <TableCell columnId={'firstName'}>hello</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  },
};
