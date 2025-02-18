import { memo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../components/table';
import { useTableContext } from '../hooks/use-table-store';

const meta: Meta<typeof Table> = {
  title: 'Base UI/Table',
  component: Table,
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const Child = memo(() => {
  console.log('child1 rendered');
  return <div>Child</div>;
});

const Child2 = memo(() => {
  const x = useTableContext((state) => state.columnIds);
  console.log('child2 rendered');
  return <div> Child</div>;
});

export const BasicUsage: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [x, setX] = useState<string[]>([]);
    const [y, setY] = useState(['hello']);
    console.log('App rendered');
    y.push('hello');
    // const data = new Array(30);
    // data.fill({ name: faker.person.firstName() });
    // console.log(data);
    return (
      <>
        <Table columnIds={y}>
          {/* {data.map((d, i) => (
            <span key={i}>{d.name}</span>
          ))} */}
          <Child />
          <Child2 />
        </Table>
        <button
          type="button"
          onClick={() => {
            setCount(count + 1);
            setX(x.concat([`${count}`]));
          }}
        >
          Click
        </button>
      </>
    );
  },
};
