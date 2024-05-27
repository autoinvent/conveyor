// import type { Meta, StoryObj } from '@storybook/react';

// import { Lens, Lenses, useLenses } from '@/Lenses';

// const meta = {
//   title: 'Commons/Lenses',
//   component: Lenses,
//   parameters: {
//     layout: 'centered',
//   },
//   tags: ['autodocs'],
//   args: {
//     activeLens: 'blue',
//     AvailableLenses: { BLUE: 'blue', RED: 'red' },
//   },
// } satisfies Meta<typeof Lenses>;

// export default meta;
// type Story = StoryObj<typeof meta>;

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
