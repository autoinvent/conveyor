// import { useEffect, useState } from 'react';
// import type { Meta, StoryObj } from '@storybook/react';

// import { Slots, Slot, useIsFirstRender } from '@/index';

// const meta = {
//   title: 'Commons/Slots',
//   component: Slots,
//   parameters: {
//     layout: 'centered',
//   },
//   tags: ['autodocs'],
//   args: {
//     slotOrder: ['slot1', 'slot2', 'slot3'],
//   },
//   argTypes: {
//     children: {
//       table: {
//         disable: true,
//       },
//     },
//   },
// } satisfies Meta<typeof Slots>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const BasicUsage: Story = {
//   render: (props) => {
//     const isFirstRender = useIsFirstRender();
//     const [slotOrder, setSlotOrder] = useState(props.slotOrder);
//     const onClick = () => {
//       setSlotOrder((state) => [...state, 'secret-slot']);
//     };

//     useEffect(() => {
//       if (!isFirstRender.current) {
//         setSlotOrder(props.slotOrder);
//       }
//     }, [props.slotOrder]);
//     return (
//       <div>
//         <Slots slotOrder={slotOrder}>
//           <Slot slot="slot1">
//             <div>It's </div>
//           </Slot>
//           <Slot slot="slot2">
//             <div>a </div>
//           </Slot>
//           <Slot slot="slot3">
//             <div>
//               <button onClick={onClick}>Beaver!</button>
//             </div>
//           </Slot>
//           <Slot slot="secret-slot">
//             <div>Or is it?!</div>
//           </Slot>
//         </Slots>
//       </div>
//     );
//   },
// };

// export const DuplicateSlots: Story = {
//   render: (props) => (
//     <div>
//       <Slots {...props}>
//         <Slot slot="slot3">
//           <div>It's </div>
//         </Slot>
//         <Slot slot="slot3">
//           <div>a </div>
//         </Slot>
//         <Slot slot="slot3">
//           <div>Beaver!</div>
//         </Slot>
//       </Slots>
//     </div>
//   ),
// };

// export const SlotsWithNonSlotChildren: Story = {
//   render: (props) => (
//     <div>
//       <Slots {...props}>
//         <div>Not a Slot (Top)</div>
//         <Slot slot="slot1">
//           <div>It's </div>
//         </Slot>
//         <Slot slot="slot2">
//           <div>a </div>
//         </Slot>
//         <Slot slot="slot3">
//           <div>Beaver!</div>
//         </Slot>
//         <div>Not a Slot (Bottom)</div>
//       </Slots>
//     </div>
//   ),
// };

// export const SlotsInDepth: Story = {
//   render: (props) => (
//     <div>
//       <Slots {...props}>
//         <div>
//           Yes,
//           <span>
//             <Slot slot="slot1">
//               <div>It's</div>
//             </Slot>
//           </span>
//         </div>
//         <Slot slot="slot2">
//           <div>a </div>
//         </Slot>
//         <Slot slot="slot3">
//           <div>Beaver!</div>
//         </Slot>
//       </Slots>
//     </div>
//   ),
// };

// export const DynamicSlots: Story = {
//   render: (props) => {
//     const [isBeaver, setIsBeaver] = useState(true);
//     return (
//       <div>
//         <Slots {...props}>
//           <Slot slot="slot1">
//             <div>It's</div>
//           </Slot>
//           <Slot slot="slot2">
//             <div>a </div>
//           </Slot>
//           {isBeaver ? (
//             <Slot slot="slot3">
//               <div>Beaver!</div>
//             </Slot>
//           ) : (
//             <div>Racooon!</div>
//           )}
//         </Slots>
//         <button onClick={() => setIsBeaver(!isBeaver)}>Swap</button>
//       </div>
//     );
//   },
// };
