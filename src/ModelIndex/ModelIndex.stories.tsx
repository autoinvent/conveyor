import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ModelIndex, useData } from '@/index';

const meta = {
  title: 'Model/ModelIndex',
  component: ModelIndex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Users',
    data: [
      { firstname: 'Robert', lastname: 'Hernandez' },
      { firstname: 'Jeffrey', lastname: 'Davis' },
      { firstname: 'Aidan', lastname: 'Glenister' },
    ],
    fields: ['firstname', 'lastname', 'username'],
  },
  argTypes: {},
  render: (props) => {
    const [fields, setFields] = useState(props.fields);
    const changeOrder = () => {
      setFields((state) => {
        const [first, ...rest] = state;
        return [...rest, first];
      });
    };

    useEffect(() => {
      if (JSON.stringify(props.fields) !== JSON.stringify(fields))
        setFields(props.fields);
    }, [props.fields]);

    return (
      <div className="w-[800px]">
        <ModelIndex {...props} fields={fields} />
        <button onClick={changeOrder}>Reorder</button>
      </div>
    );
  },
} satisfies Meta<typeof ModelIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

// const CustomCell = ({ field }: { field: string }) => {
//     const { data } = useData((state) => state.current);
//     const fieldData = data?.[field];
//     return <i>{fieldData}</i>;
// };

// const CustomCombinedCell = () => {
//     const { data } = useData((state) => state.current);
//     const combined = Object.entries(data)
//         .map((entry: any) => entry[1])
//         .join('.');
//     return combined;
// };

// export const FullyCustomized: Story = {
//     args: {
//         children: (
//             <>
//                 <Table.Head>
//                     <Table.HeaderRow>
//                         <Table.HeaderCell columnId='firstname'>First Name</Table.HeaderCell>
//                         <Table.HeaderCell columnId='lastname'>Last Name</Table.HeaderCell>
//                         <Table.HeaderCell columnId='username'>User Name</Table.HeaderCell>
//                     </Table.HeaderRow>
//                 </Table.Head>
//                 <Table.Body>
//                     <Table.Row>
//                         <Table.Cell columnId='firstname'>
//                             <CustomCell field='firstname' />
//                         </Table.Cell>
//                         <Table.Cell columnId='lastname'>
//                             <CustomCell field='lastname' />
//                         </Table.Cell>
//                         <Table.Cell columnId='username'>
//                             <CustomCombinedCell />
//                         </Table.Cell>
//                     </Table.Row>
//                     <Table.BodyFallback>Empty Body</Table.BodyFallback>
//                 </Table.Body>
//             </>
//         ),
//     },
// };
