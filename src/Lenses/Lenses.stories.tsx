import { useEffect, useState, memo } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Lenses } from './LensesStoreContext';
import { Lens } from './Lens';
import { useLensesStore } from './useLensesStore';

const meta = {
  title: 'Commons/Lenses',
  component: Lenses,
  tags: ['autodocs'],
} satisfies Meta<typeof Lenses>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    initialLens: 'green',
  },
  render: (args) => {
    const [activeLens, setActiveLens] = useState(args.activeLens);

    useEffect(() => {
      setActiveLens(args.activeLens);
    }, [args.activeLens]);

    return (
      <div className="flex flex-col">
        <Lenses initialLens={args.initialLens} activeLens={activeLens}>
          <Lens lens="red">
            <div className="bg-red-600 text-center">Red Lens</div>
          </Lens>
          <Lens lens="blue">
            <div className="bg-blue-600 text-center">Blue Lens</div>
          </Lens>
          <Lens lens="green">
            <div className="bg-green-600 text-center">
              (Inital Lens) Green Lens
            </div>
          </Lens>
          <TestComp />
          <TestComp2 />
        </Lenses>
        <button
          className="m-auto mt-4"
          type="button"
          onClick={() => {
            setActiveLens(activeLens === 'red' ? 'blue' : 'red');
          }}
        >
          Change colors
        </button>
      </div>
    );
  },
};

const TestComp = memo(() => {
  const x = useLensesStore((state) => state.setLens);
  console.log('test rendered');
  return <div>hello</div>;
});

const TestComp2 = memo(() => {
  const setLens = useLensesStore((state) => state.setLens);
  console.log('test2 rendered');
  return (
    <button type="button" onClick={() => setLens('green')}>
      hello
    </button>
  );
});

// export const BasicUsage: Story = {
//   render: (props) => {
//     return (
//       <p>
//         My favorite color is:
//         <Lenses {...props}>
//           <BlueLens />
//           <RedLens />
//         </Lenses>
//       </p>
//     );
//   },
// };

// const BlueLens = () => {
//   const { AvailableLenses, setLens } = useLenses();
//   return (
//     <Lens lens={AvailableLenses.BLUE}>
//       <button
//         style={{ backgroundColor: 'blue', color: 'white' }}
//         onClick={() => setLens(AvailableLenses.RED)}
//       >
//         BLUE
//       </button>
//     </Lens>
//   );
// };

// const RedLens = () => {
//   const { AvailableLenses, setLens } = useLenses();
//   return (
//     <Lens lens={AvailableLenses.RED}>
//       <button
//         style={{ backgroundColor: 'red' }}
//         onClick={() => setLens(AvailableLenses.BLUE)}
//       >
//         RED
//       </button>
//     </Lens>
//   );
// };
