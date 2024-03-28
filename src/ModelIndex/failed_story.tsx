// import type { Meta, StoryObj } from '@storybook/react';

// import { ModelIndex, Table } from '@/index';

// const meta = {
//     title: 'Models/ModelIndex',
//     component: ModelIndex,
//     parameters: {
//         layout: 'centered',
//     },
//     tags: ['autodocs'],
//     args: {
//         model: 'Survey',
//         fields: ['name', 'age', 'employed'],
//         data: [
//             { name: 'Ruben', age: '27', employed: 'yes' },
//             { name: 'Samantha', age: '43', employed: 'no' }
//         ]
//     },
//     argTypes: {
//         children: {
//             table: {
//                 disable: true
//             }
//         }
//     },
// } satisfies Meta<typeof ModelIndex>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const BasicUsage: Story = {};

// export const CustomTable: Story = {
//     render: (props) => {
//         return (
//             <ModelIndex {...props}>
//                 <ModelIndex.Title>
//                     Hello
//                 </ModelIndex.Title>
//                 <ModelIndex.Table>
//                     <Table.Head>
//                         <Table.Header field="employed">
//                             <i>Has Pets?</i>
//                         </Table.Header>
//                     </Table.Head>
//                     <Table.Body>
//                         <Table.Row>
//                             <Table.Cell field="name">
//                                 User
//                             </Table.Cell>
//                         </Table.Row>
//                     </Table.Body>
//                 </ModelIndex.Table>
//             </ModelIndex>
//         )
//     }
// };

// export const CustomTitle: Story = {
//     render: (props) => {
//         return (
//             <ModelIndex {...props}>
//                 <ModelIndex.Title>
//                     <h1><b>This is the Survey Roster</b></h1>
//                 </ModelIndex.Title>
//             </ModelIndex>
//         )
//     }
// };

// // export const CustomHeader: Story = {
// //     render: (props) => {
// //         return (
// //             <Table {...props}>
// //                 <Table.Head>
// //                     <Table.Header field="employed">
// //                         <i>Has Pets?</i>
// //                     </Table.Header>
// //                 </Table.Head>
// //             </Table>
// //         )
// //     }
// // };
