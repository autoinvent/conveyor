import { useRef } from 'react'

const useTableStore = (s: any) => {
	return ''
}
const useTable = (p: any) => {
	const T = (p: any) => <div></div>
	const TI = { Cell: T, Row: T, Body: T }
	return Object.assign(T, TI)
}
const createTableHook = (p: any) => {
	return useTable
}
const TableCell = (p: any) => <div></div>
const TableRow = (p: any) => <div></div>
const TableBody = (p: any) => <div></div>

const SomeWrapper = (p: any) => {
	return <div></div>
}

// ** Initial Demo 1_1*/

const useTable1 = createTableHook({})

const UserTable1_1 = () => {
	const data = [{ id: '', firstName: 'Robert', lastName: 'Hernandez' }]
	const columnOrder = ['lastName']
	// explained in 2_1
	const columns = { firstName: { readOnly: true } }
	const ctx = {}

	const Table = useTable1({ data, columns, columnOrder, ctx })
	return <Table />
}
// ** 1_2 */
const UserTable1_2 = () => {
	const data = [{ id: '', firstName: 'Robert', lastName: 'Hernandez' }]
	const columnOrder = ['lastName']
	const columns = { firstName: { readOnly: true } }
	const ctx = {}

	const Table = useTable1({ data, columns, columnOrder, ctx })
	return (
		<Table>
			<Table.Body>
				<Table.Row>
					<Table.Cell
						target="firstName"
						content={() => {
							return value
						}}
					/>
				</Table.Row>
			</Table.Body>
		</Table>
	)
}

// ** 1_3 */
const CustomFirstNameCell = ({ ctx, target, value, column }: any) => {
	const firstname = useTableStore((state) => state.rowData.firstName)
}

const UserTable1_3 = () => {
	const data = [{ id: '', firstName: 'Robert', lastName: 'Hernandez' }]
	const columnOrder = ['lastName']
	const columns = { firstName: { readOnly: true } }

	const Table = useTable1({ data, columns, columnOrder })
	return (
		<Table>
			<Table.Body>
				<Table.Row>
					<Table.Cell target="firstName" content={CustomFirstNameCell} />
				</Table.Row>
			</Table.Body>
		</Table>
	)
}

//** 1_5 Custom Project Table: Inner Components and Layout */
const FormProvider = (p: any) => {
	return <div>{p.children}</div>
}

const withForm = ({ children }: any) => {
	return <FormProvider>{children}</FormProvider>
}

const CustomActionCell = () => {
	return <button type="button">save</button>
}

const withActionColumn = ({ children }: any) => {
	return (
		<>
			{children}
			<TableCell target="action" />
		</>
	)
}

const CustomTableRow = ({ Table }: any) => {
	const defaultInnerWrappers = [withForm, withActionColumn]
	return ({ innerWrappers, ...p }: any) => (
		<Table.Row
			{...p}
			innerWrappers={defaultInnerWrappers.concat(innerWrappers)}
		/>
	)
}

const Layout = ({
	data,
	ctx,
	columns,
	columnOrder,
	Table,
}: {
	data: any
	Table: ReturnType<typeof useTable>
	columns: any
	columnOrder: any
	ctx: any
}) => {
	return (
		<div>
			<h1>{ctx.tableName}</h1>
			<Table className="">
				<Table.Body replace={{ children: true }}>
					{data.map((d: any, idx: any) => {
						return (
							<Table.Row key={d.idx} innerWrappers={[withForm]}>
								{columnOrder.map((column: any) => {
									return <Table.Cell key={column} target={column} />
								})}
								<Table.Cell target="action" content={CustomActionCell} />
							</Table.Row>
						)
					})}
				</Table.Body>
			</Table>
		</div>
	)
}

const useTable1_5 = createTableHook({
	factories: {
		Layout: ({ Table }) => Layout,
		TableRow: ({ Table }) => CustomTableRow,
		TableBody: ({ Table }) => Table.Body,
	},
})

//** PLUGINS: 1_6 */
const conveyorTable = (p: any) => {}

const useTable1_6 = createTableHook({
	plugins: [conveyorTable({})],
	factories: {
		Layout: ({ Table }) => Layout,
		TableRow: ({ Table }) => CustomTableRow,
		TableBody: ({ Table }) => Table.Body,
	},
})
