import Table from '....'

const BookFields = {
  author: 
}



export const fn = () => {
  const rowid = '23hjjbjub32'
  return (
    <Table data={} columns>
      <Table.Body target="default" empty>
        <Table.Row target={rowid} className="" outerWrapper={} innerWrapper={} meta={} replace>
          <Table.Cell target="name" replace />
        </Table.Row>
      </Table.Body>
    </Table>
  )
}


const CommonTable = ({children}) => {
  return (
    <div>
    <Table >
      <Table.Body>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Body>
      <Table.Footer/>
      <Table.Caption/>
      {children}
    </Table>
    </div>
  )
}

export const Table = createTable({
  TableCell: () => {}
  TableBody: () => {}
})