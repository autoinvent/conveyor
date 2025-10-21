import { Table, TableBody, TableCell, TableRow } from '@autoinvent/conveyor';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withPerformance } from '@/decorators/with-performance';

const meta = {
	title: 'Conveyor/Table/Table Peformance',
	component: Table,
	decorators: [withPerformance],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	render: () => {
		return (
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>hello</TableCell>
						<TableCell>World</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
