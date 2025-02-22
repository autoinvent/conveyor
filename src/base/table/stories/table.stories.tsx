import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { Table, TableProps } from '../components/table';
import { Table as Table2 } from '../../../Table';
import { TableBody } from '../components/table-body';
import { faker } from '@faker-js/faker';
import { TableRow } from '../components/table-row';
import { TableCell, TableCellProps } from '../components/table-cell';
import { memo, Profiler, useEffect, useMemo, useState } from 'react';
import { id } from 'date-fns/locale';
import { useTableRowStore } from '../hooks/use-table-row-store';
import { useTableStore } from '../hooks/use-table-store';
import { useShallow } from 'zustand/shallow';

const meta: Meta<typeof Table> = {
  title: 'Base UI/Table',
  component: Table,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

let x = 0;

export const BasicUsage: Story = {
  render: () => {
    const columnIds = useMemo(
      () => [
        'firstName',
        'middleName',
        'lastName',
        'gender',
        'sex',
        'zodiacSign',
      ],
      [],
    );
    const data = Array.from(Array(100), () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      gender: faker.person.gender(),
      middleName: faker.person.middleName(),
      sex: faker.person.sex(),
      zodiacSign: faker.person.zodiacSign(),
    }));

    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log(x / count);
    }, [count]);
    return (
      <>
        <Profiler
          id="hello"
          onRender={(id, phase, actualDuration) => {
            if (phase !== 'mount') {
              x = x + actualDuration;
            }
          }}
        >
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            press
          </button>
          {/* {data.map((d, i) => {
            return (
              <div key={i}>
                {Object.keys(d).map((k, j) => {
                  return <span key={j}>{d[k]}</span>;
                })}
              </div>
            );
          })} */}
          <TempTable columnIds={columnIds} data={data} />
          {/* <Table2 columnIds={columnIds} data={data}>
            <Table2.Body>
              <Table2.Row>
                <Table2.Cell columnId="firstName">
                  <CustomCell columnId="firstName" />
                </Table2.Cell>
                <Table2.Cell columnId="lastName">
                  <CustomCell columnId="lastName" />
                </Table2.Cell>
                <Table2.Cell columnId="gender">
                  <CustomCell columnId="gender" />
                </Table2.Cell>
                <Table2.Cell columnId="middleName">
                  <CustomCell columnId="middleName" />
                </Table2.Cell>
                <Table2.Cell columnId="sex">
                  <CustomCell columnId="sex" />
                </Table2.Cell>
                <Table2.Cell columnId="zodiacSign">
                  <CustomCell columnId="zodiacSign" />
                </Table2.Cell>
              </Table2.Row>
            </Table2.Body>
          </Table2> */}
        </Profiler>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pressBtn = await canvas.getByRole('button');
    // const x = await canvas.findBy;
    await userEvent.click(pressBtn);
  },
};

const TempTable = ({ columnIds, data }: TableProps) => {
  const x = useMemo(
    () => (
      <TableRow>
        <TableCell columnId="firstName">
          <CustomCell columnId="firstName" />
        </TableCell>
        <TableCell columnId="lastName">
          <CustomCell columnId="lastName" />
        </TableCell>
        <TableCell columnId="gender">
          <CustomCell columnId="gender" />
        </TableCell>
        <TableCell columnId="middleName">
          <CustomCell columnId="middleName" />
        </TableCell>
        <TableCell columnId="sex">
          <CustomCell columnId="sex" />
        </TableCell>
        <TableCell columnId="zodiacSign">
          <CustomCell columnId="zodiacSign" />
        </TableCell>
      </TableRow>
    ),
    [],
  );
  return (
    <Table columnIds={columnIds} data={data}>
      <TableBody>
        <TableRow>
          <TableCell columnId="firstName">
            <CustomCell columnId="firstName" />
          </TableCell>
          <TableCell columnId="lastName">
            <CustomCell columnId="lastName" />
          </TableCell>
          <TableCell columnId="gender">
            <CustomCell columnId="gender" />
          </TableCell>
          <TableCell columnId="middleName">
            <CustomCell columnId="middleName" />
          </TableCell>
          <TableCell columnId="sex">
            <CustomCell columnId="sex" />
          </TableCell>
          <TableCell columnId="zodiacSign">
            <CustomCell columnId="zodiacSign" />
          </TableCell>
        </TableRow>
        {/* {x} */}
      </TableBody>
    </Table>
  );
};

const CustomCell = memo(({ columnId }: TableCellProps) => {
  const rowIndex = useTableRowStore((state) => state.rowIndex);
  const columnData = useTableStore(
    useShallow((state) => state.data?.[rowIndex][columnId]),
  );
  return <div>hello, {columnData}</div>;
});
