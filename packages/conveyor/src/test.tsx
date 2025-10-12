import Table from '....'

const BookFields = {
  author: 
}



export const fn = () => {
  return (
    <Table data={} columns>
      <Table.Body>
        <Table.Row className="" outerWrapper={} innerWrapper={} replace>
          <Table.Cell column="name" replace />
        </Table.Row>
      </Table.Body>
    </Table>
  )
}


const CommonTable = ({children}) => {
  return (
    <Table >
      <Table.Body>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Body>
      {children}
    </Table>
  )
}

const TableCell = () => {
  return TableCell
}