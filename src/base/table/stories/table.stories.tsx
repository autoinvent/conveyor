import { useMemo, useState } from 'react';

import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import { withProfiler } from '@/../.storybook/decorators/profiler';

import { Table as DefaultTable } from '../components/table';
import { createTableHook } from '../utils/create-table-hook';
import { TableRow } from '@/Table';
// import type { TableInternals } from '../types';

const meta: Meta<typeof DefaultTable> = {
  title: 'Base UI/Table',
  component: DefaultTable,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const useTable = createTableHook({ Table: DefaultTable, Row: TableRow, Monkey: () => 'monkey' });

export const BasicUsage: Story = {
  decorators: [withProfiler],
  render: () => {
    const [count, setCount] = useState(0);

    const columnIds = useMemo(
      () => ['firstName', 'middleName', 'lastName', 'sex', 'zodiacSign'],
      [],
    );
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const data = useMemo(
      () =>
        Array.from(Array(100), () => ({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          middleName: faker.person.middleName(),
          sex: faker.person.sex(),
          zodiacSign: faker.person.zodiacSign(),
        })),
      [count],
    );

    const Table = useTable({ columnIds, data, components: {} });

    return (
      <>
        <button
          type="button"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          press
        </button>
        <Table>
          <Table./>
        </Table>
      </>
    );
  },
};
