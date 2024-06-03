import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Slots } from './Slots';
import { Slot } from './Slot';

const meta = {
  title: 'Commons/Slots/Slots',
  component: Slots,
  tags: ['autodocs'],
  args: {
    slotKeys: ['top-bun', 'pickles', 'cheese', 'beefpatty', 'bottom-bun'],
  },
} satisfies Meta<typeof Slots>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col text-center">
        <Slots {...args}>
          <Slot slotKey="top-bun">
            <div className="text-orange-300">TOP BUN</div>
          </Slot>
          <Slot slotKey="pickles">
            <div className="text-lime-400">PICKLES</div>
          </Slot>
          <Slot slotKey="cheese">
            <div className="text-yellow-200">CHEESE</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-rose-900">BEEF PATTY</div>
          </Slot>
          <Slot slotKey="bottom-bun">
            <div className="text-orange-400">BOTTOM BUN</div>
          </Slot>
        </Slots>
      </div>
    );
  },
};

export const SlotsWithNonSlots: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col text-center">
        <Slots {...args}>
          <div className="text-orange-300">TOP BUN</div>
          <Slot slotKey="pickles">
            <div className="text-lime-400">PICKLES</div>
          </Slot>
          <Slot slotKey="cheese">
            <div className="text-yellow-200">CHEESE</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-rose-900">BEEF PATTY</div>
          </Slot>
          <div className="text-orange-400">BOTTOM BUN</div>
        </Slots>
      </div>
    );
  },
};

export const DuplicateSlots: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col text-center">
        <Slots {...args}>
          <Slot slotKey="top-bun">
            <div className="text-orange-300">TOP BUN</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-lime-400">PICKLES</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-yellow-200">CHEESE</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-rose-900">BEEF PATTY</div>
          </Slot>
          <Slot slotKey="bottom-bun">
            <div className="text-orange-400">BOTTOM BUN</div>
          </Slot>
        </Slots>
      </div>
    );
  },
};

export const DynamicSlots: Story = {
  render: () => {
    const ingredients = [
      'BOTTOM BUN',
      'BEEF PATTY',
      'CHEESE',
      'PICKLES',
      'TOP BUN',
    ];
    const colorList = [
      'text-orange-400',
      'text-rose-900',
      'text-yellow-200',
      'text-lime-400',
      'text-orange-300',
    ];
    const [contents, setContents] = useState<string[]>([]);
    return (
      <div className="flex flex-col text-center">
        <div className="margin-auto width-[100px]">
          {contents.length < ingredients.length && (
            <button
              type="button"
              onClick={() =>
                setContents(ingredients.slice(0, contents.length + 1))
              }
            >
              Add {ingredients[contents.length]}
            </button>
          )}
          {contents.length > 0 && (
            <button
              type="button"
              onClick={() =>
                setContents(ingredients.slice(0, contents.length - 1))
              }
            >
              Remove {ingredients[contents.length - 1]}
            </button>
          )}
        </div>
        <Slots slotKeys={contents}>
          {contents.reverse().map((item, index) => (
            <Slot key={item} slotKey={item}>
              <div className={`${colorList[contents.length - 1 - index]}`}>
                {item}
              </div>
            </Slot>
          ))}
        </Slots>
      </div>
    );
  },
};

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
// <div>
//   <Slots slotOrder={slotOrder}>
//     <Slot slot="slot1">
//       <div>It's </div>
//     </Slot>
//     <Slot slot="slot2">
//       <div>a </div>
//     </Slot>
//     <Slot slot="slot3">
//       <div>
//         <button onClick={onClick}>Beaver!</button>
//       </div>
//     </Slot>
//     <Slot slot="secret-slot">
//       <div>Or is it?!</div>
//     </Slot>
//   </Slots>
// </div>
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
