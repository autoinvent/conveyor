const useTableStore = (s: any) => {
	return ''
}
const useCTable = (p: any) => {
	const T = (p: any) => <div></div>
	const TI = { Cell: T, Row: T, Body: T }
	return Object.assign(T, TI)
}
const createTableHook = (p: any) => {
	return useCTable
}
const TableCell = (p: any) => <div></div>
const TableRow = (p: any) => <div></div>
const TableBody = (p: any) => <div></div>

const SomeWrapper = (p: any) => {
	return <div></div>
}

























const useTable =  createTableHook({})

const CustomTable = () => {
  const data = [{firstName: 'Robert', lastName: 'Hernandez'}]
  const {Table} = useTable({data, columnOrder: ['firstName'], columns: {firstName: { readOnly: true }}})
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="blue" target="firstName" content={({value, target, column}) => <span className={column.readOnly ? 'red': 'blue'} >{value}</span> } />
        </TableRow>
      </TableBody>
    </Table>
  )
} 