import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { Table } from '../components/table';
import { Table as Table2 } from '../../../Table';
import { TableBody } from '../components/table-body';
import { faker } from '@faker-js/faker';
import { TableRow } from '../components/table-row';
import { TableCell } from '../components/table-cell';
import { Profiler, useEffect, useMemo, useState } from 'react';
import { id } from 'date-fns/locale';

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
          <Table columnIds={columnIds} data={data}>
            {/* <TableBody>
              <TableRow>
                <TableCell columnId="firstName" />
                <TableCell columnId="lastName" />
                <TableCell columnId="gender" />
                <TableCell columnId="middleName" />
                <TableCell columnId="sex" />
                <TableCell columnId="zodiacSign" />
              </TableRow>
            </TableBody> */}
          </Table>
          {/* <Table2 columnIds={columnIds} data={data} /> */}
        </Profiler>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pressBtn = await canvas.getByRole('button');
    const x = await canvas.findBy;
    await userEvent.click(pressBtn);
  },
};
