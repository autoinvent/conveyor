import type { Meta, StoryObj } from '@storybook/react';

import { Table, type TableProps } from '../components/table';
import { TableBody } from '../components/table-body';
import { faker } from '@faker-js/faker';
import { TableRow } from '../components/table-row';
import { TableCell } from '../components/table-cell';
import { useMemo, useState } from 'react';

import { Table as Table2 } from '@/Table';

import { withProfiler } from '@/../.storybook/decorators/profiler';

const meta: Meta<typeof Table> = {
  title: 'Base UI/Table',
  component: Table,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  decorators: [withProfiler],
  render: () => {
    const [count, setCount] = useState(0);

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
    const data = useMemo(
      () =>
        Array.from(Array(100), () => ({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          gender: faker.person.gender(),
          middleName: faker.person.middleName(),
          sex: faker.person.sex(),
          zodiacSign: faker.person.zodiacSign(),
        })),
      [count],
    );
    const internals = useMemo(
      () => ({
        TableCell,
        TableRow,
        TableBody,
      }),
      [],
    );

    const layout: TableProps<typeof internals>['layout'] = useMemo(() => {
      return ({ TableBody }) => {
        return (
          <>
            <TableBody />
          </>
        );
      };
    }, []);

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
        <Table
          columnIds={columnIds}
          data={data}
          internals={internals}
          layout={layout}
        />

        {/* <Table2 columnIds={columnIds} data={data} /> */}

        {/* {data.map((d, i) => {
          return (
            <div key={i}>
              {Object.keys(d).map((k, j) => {
                return <span key={j}>{d[k]}</span>;
              })}
            </div>
          );
        })} */}

        {/* <TempTable columnIds={columnIds} data={data} /> */}
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
      </>
    );
  },
};
