import type { Meta, StoryObj } from '@storybook/react';

import { flexRender } from '@tanstack/react-table'
import { Table, useTableRow } from '@/Table'
import { useContext } from 'react';
import { SetActiveLensContext } from '@/Lenses';

const meta = {
    title: 'Commons/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        data: [{ 'name': 'mimi', 'specie': 'dog' }, { 'name': 'thai', 'specie': 'cat' }]
    },
    argTypes: {
        data: { control: 'object' }
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
    render: (props) => {
        return (
            <>
                <Table {...props} >
                    <Table.Head>
                        <Table.Header columnId="name">
                            name
                        </Table.Header>
                        <Table.Header columnId="specie">
                            Specie
                        </Table.Header>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><CustomCell field={'name'} /></Table.Cell>
                            <Table.Cell><CustomCell field={'specie'} /></Table.Cell>
                        </Table.Row>
                        <Table.RowFallback>
                            <Table.CellFallback>No data found</Table.CellFallback>
                        </Table.RowFallback>
                    </Table.Body>
                </Table>
            </>
        )
    }
};

const CustomCell = ({ field }: { field: string }) => {
    const row = useTableRow()
    const l = useContext(SetActiveLensContext)
    const data = row.original
    return <button onClick={() => l((curr) => curr === 0 ? 1 : 0)}>{data[field]}</button>
}