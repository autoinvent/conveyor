import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import TableStoryMeta from './Table.stories';
import { useEffect, useState } from 'react';
import { useDataStore } from '@/Data';

const meta = {
  title: 'Commons/Table/ResizingColumn',
  component: Table,
  tags: ['autodocs'],
  args: { ...TableStoryMeta.args },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const ResizableWrapper = ({ content, resizeFunction, index } : {
  content : any
  resizeFunction : any
  index: number
}) => {
  return (
    <div className='flex h-full flex-start'>
      {content}
      <div className="flex-grow"/>
      <div 
        className='h-full w-1/5 cursor-ew-resize'
        onMouseDown={e => resizeFunction(e,index)}
      />
    </div>
  )
}

const ResizableHeaderCell = ({resizeFunction, index, width, columnId} : {
  columnId: string,
  index : number,
  width: number, 
  resizeFunction: (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {
  return (
    <Table.HeaderCell columnId={columnId} style={{width: width}} className="border pr-0">
      <ResizableWrapper
        content={columnId}
        index={index}
        resizeFunction={resizeFunction}
      />
    </Table.HeaderCell>
  )
}

const ResizableRowCell = ({resizeFunction, index, width, columnId} : {
  columnId: string,
  index : number,
  width: number, 
  resizeFunction: (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {
  let data = useDataStore((state) => state[columnId]);
  if (!data) {
    const allData = useDataStore();
    data = `${allData.firstname}.${allData.lastname}`
  }

  return (
    <Table.Cell columnId={columnId} style={{width: width}} className='border pr-0'>
      <ResizableWrapper
        content={data}
        index={index}
        resizeFunction={resizeFunction}
      />
    </Table.Cell>
  )
}

export const CustomTableCells: Story = {
  render: (props) => {
    const [widths, setWidths] = useState<number[]>([200,300,500]);
    const [resizingColumnI, setColumnResizingI] = useState<number|null>(null);
    const [startX, setStartX] = useState<number>();
    const [startWidth, setStartWidth] = useState<number>();

    const startResizing = (
      e : React.MouseEvent<HTMLDivElement, MouseEvent>, columnI : number
    ) => {
      setColumnResizingI(columnI);
      setStartX(e.clientX);
      setStartWidth(widths[columnI]);
    }

    useEffect( () => {
      if (resizingColumnI !== null && startX && startWidth) {
        document.addEventListener("mousemove", doResize);
        document.addEventListener("mouseup", stopResize);
      }
    }, [resizingColumnI, startX, startWidth])

    const doResize = (e : MouseEvent) => {
      if (resizingColumnI !== null && startWidth && startX) {
        const copy = [...widths]
        copy[resizingColumnI] = startWidth + (e.clientX - startX)
        setWidths(copy);
      }
    }

    const stopResize = () => {
      setColumnResizingI(null);
      document.removeEventListener("mousemove",doResize);
      document.removeEventListener("mouseup",stopResize)
    }

    return (
      <>
        <Table {...props}>
          <Table.Head>
            <Table.HeaderRow className=''>
              {props.columnIds.map( (val,index) => (
                <ResizableHeaderCell
                  key={`headercell-${val}`}
                  columnId={val}
                  index={index}
                  width={widths[index]}                
                  resizeFunction={(e) => startResizing(e,index)}
                />
              ))}
            </Table.HeaderRow>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              {props.columnIds.map( (val,index) => (
                <ResizableRowCell
                  key={`bodycell-${val}`}
                  columnId={val}
                  index={index}
                  width={widths[index]}
                  resizeFunction={(e) => startResizing(e,index)}
                />
              ))}
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    )
  }
}



export const NoColumns: Story = {
  args: {
    columnIds: [],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};
