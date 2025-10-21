import Table from '....'
import FormState from '...'


const useTable = createTableHook({
  innerComponents: {
    TableCell,
    TableBody,
    TableRow
  }
})


const CommonTable = ({children}) => {
  const {Table, tableState} = useTable({tableName: "", columns: {}, columnOrder: []})
  return (
    <div>
    <Table>
      <Table.Body target="" innerWrappers={[]} outerWrappers={[]} replace empty>
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



const createModelTableHook = ({innerComponents, plugins}) => {
  const useTable = createTableHook({innerComponents})
  const useModelTable = ({model, fields, fieldOrder, ctx, data}) => {
    const Table = useTable({columns: fields, columnOrder: fieldOrder, ctx, data})
    const NewTable = (children) => {
      return (
        <Table empty>
          <Table.Body>
            for...
          </Table.Body>
          {children}
        </Table>
      )
    }
    const X =  Object.assign(NewTable, Table)
    plugins.reduce((plugin) => { 
      plugin(X)
    })
  }
}

const Plugin = (X) => {
  const NewBody = ({innerWrappers, ...props}) => {
    return <X.Body innerWrappers={}  />
  }
}

const ModelTableCell = () => {
  return <TableCell />
}

const CustomModelTableRow = (props) => {
  <ModelTableCell innerWrappers={[withReactHookForm, ]} />
}



export const useModelTable = createModelTableHook({
  innerComponents: {
    TableCell: TableCell,
    TableBody: () => {}
    TableRow: () => {}
  },
})






T




//** Model Table */
const Book = {
  author: {hidden: true, disable: true, typeName: "string"},
  id: {}
}

const Author = {
  book: {hidden: true, disable: true, typeName: "book"},
  id: {}
}

const App = () => {
  return (
    <Conveyor 
      models={{Book, Author}}  
      types={
        {
          string: {
            type: v.string(),
            render: StringDisplay,
          },
          book: {
            type: v.object(),
          }
        }
      } 
    />
  )
}

const StringRender = (ctx) => {
  const x = useStore(ctx.modelStore, state => state.current.data)
}

const StringDisplay = () => {
  return (
    <div>{val}</div>
  )
}

const StringInput = (val: String, ctx) => {
  // TODO: Form stuff
  return (
    <div>{val}</div>
  )
}

const BookDisplay = (book: v.object) => {
  //TODO: Book stuff
  return (
    <div>{val}</div>
  )
}

const BookTable = () => {
  const data = ['']
  const Table = useModelTable({
    model: "Book",
    fields: {
      title: {
        required: true
      }
    },
    data,
    fieldOrder: [],
    ctx: {}
  })

  
  return (
    <Table>
      <Table.Body>
        <Table.Cell field="title" content={CustomTitle} />
      </Table.Body>
    </Table>
  )
}

const CustomTitle = ({fieldName, value, ctx}) => {
  const x = useStore(ctx.tableStore, state => state.cell.fieldName)
  const y = useStore(ctx.formStore, state => state.form.fieldName)
  const z = useStore(ctx.modelStore, state => state.data.[fieldName])


  return (
    <FormState>
      <FormState.Display>
        <StringInput {...} />       
      </FormState.Display>
      <FormState.Input>
        
      </FormState.Input>
    </FormState>
  )
}

const CustomAuthor = (store) => {
  useModelTableStore(store, state => state.)
}