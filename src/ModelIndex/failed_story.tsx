import type { Meta, StoryObj } from '@storybook/react';

import { Conveyor, ModelIndex, MQLFetcher } from '@/index';

const fetcher: MQLFetcher = ({ document, variables, operationName }) => {
    switch (operationName) {
        case 'organism_list':
            return Promise.resolve({
                [operationName]: {

                }
            })
        default:
            return Promise.reject(new Error('Invalid operation name'))
    }


}

const meta = {
    title: 'Conveyor/ModelIndex',
    component: ModelIndex,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        // fields: ['name', 'age', 'employed'],
        data: [
            { name: 'Ruben', age: '27', employed: 'yes' },
            { name: 'Samantha', age: '43', employed: 'no' }
        ]
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        }
    },
    render: (props) => {
        return (
            <Conveyor fetcher={fetcher}>
                <ModelIndex {...props} />
            </Conveyor>
        )
    }
} satisfies Meta<typeof ModelIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
    args: {
        children: (
            <>
                <ModelIndex.Table>

                </ModelIndex.Table>
            </>
        )
    }
};

export const CustomTable: Story = {
};

