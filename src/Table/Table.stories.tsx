import type { Meta, StoryObj } from '@storybook/react';

import { Table, slotify } from '@/index';
import { useState } from 'react';

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
        const [actions, setActions] = useState(true)
        const [content, setContent] = useState<any>(null)
        const newProps = {
            ...props,
            actionsConfig: {
                showActions: actions
            }
        }
        // const {addSlot} = useSlots()
        return (
            <>
                <Table {...newProps} >
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell field="name">
                                {content}
                            </Table.Cell>
                            <CustomCell />
                        </Table.Row>
                    </Table.Body>
                </Table>
                <button onClick={() => setActions(!actions)}>Click</button>
                <button onClick={() => setContent(content === 'hello' ? null : 'hello')}>ME</button>
            </>
        )
    }
};