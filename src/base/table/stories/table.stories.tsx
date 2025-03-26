import { useMemo, useState } from 'react';

import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import { withProfiler } from '@/../.storybook/decorators/profiler';

import { Table as DefaultTable } from '../components/table';
import { createTableHook } from '../utils/create-table-hook';

const meta: Meta<typeof DefaultTable> = {
  title: 'Base UI/Table',
  component: DefaultTable,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const useTable = createTableHook({});

type Person = {
  firstName: string;
  lastName: string;
  middleName: string;
  sex: string;
  zodiacSign: string;
};

export const BasicUsage: Story = {
  decorators: [withProfiler],
  render: () => {
    const [count, setCount] = useState(0);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const data: Person[] = useMemo(
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
        <Custom data={data} />
      </>
    );
  },
};

const columns = [
  'firstName',
  'middleName',
  'lastName',
  'sex',
  'zodiacSign',
  'monkey',
] as const;
const Custom = ({ data }: { data: Person[] }) => {
  const Table = useTable({ columns, data, components: {} });
  return (
    <Table>
      <Table.Header />
      <Table.Body>
        <Table.Row>
          <Table.Cell
            column="firstName"
            render={({ column, rowData, columnData }) => `hello ${columnData}`}
          />
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
