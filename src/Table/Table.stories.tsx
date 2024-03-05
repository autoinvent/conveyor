import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '@/index';

const meta = {
    title: 'Commons/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        fields: ['name', 'age', 'employed'],
        data: [
            { name: 'Ruben', age: '27', employed: 'yes' },
            // { name: 'Samantha', age: '43', employed: 'no' }
        ],
        actionsConfig: {
            showActions: true,
        }
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        }
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
    render: (props) => {
        return (
            <Table {...props}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell field="name">
                            hello
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }
};