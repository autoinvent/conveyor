import { useMemo, useState } from 'react';

import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import { withProfiler } from '@/../.storybook/decorators/profiler';

import { Table as DefaultTable } from '../components/table';
import { createTableHook } from '../utils/create-table-hook';
import { TableCell, type TableCellProps } from '../components/table-cell';
import type { Data } from '@/base/types';

const meta: Meta<typeof DefaultTable> = {
  title: 'Base UI/Table',
  component: DefaultTable,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

interface CustomCellProps<TColumn extends string, TData extends Data>
  extends TableCellProps<TColumn, TData> {
  background?: string;
}
const CustomCell = <TColumn extends string, TData extends Data>({
  background = 'blue',
  ...tableCellProps
}: CustomCellProps<TColumn, TData>) => {
  return (
    <TableCell
      className={`text-blue-400 text-red-400 text-${background}-400`}
      {...tableCellProps}
    />
  );
};
const CustomCell2 = <TColumn extends string, TData extends Data>({
  background = 'red',
  ...tableCellProps
}: CustomCellProps<TColumn, TData>) => {
  return (
    <TableCell
      className={`text-blue-400 text-red-400 text-${background}-400`}
      {...tableCellProps}
    />
  );
};

const useTable = createTableHook({ Cell: CustomCell });

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
  const Table = useTable({ columns, data, components: { Cell: CustomCell2 } });
  return (
    <Table>
      <Table.Header />
      <Table.Body>
        <Table.Row>
          <Table.Cell
            background="red"
            column="firstName"
            render={({ columnData }) => `hello ${columnData}`}
          />
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
