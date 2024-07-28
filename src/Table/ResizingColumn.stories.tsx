import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import TableStoryMeta from './Table.stories';
import { useEffect, useState } from 'react';
import { useDataStore } from '@/Data';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Checkbox } from '@/lib/components/ui/checkbox';
import { Label } from '@/lib/components/ui/label';
import { Button } from '@/lib/components/ui/button';
import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const meta = {
  title: 'Commons/Table/ResizingColumn',
  component: Table,
  tags: ['autodocs'],
  args: { ...TableStoryMeta.args },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const ResizableWrapper = ({ content, resizeFunction, index, enable, showGrabber } : {
  content : any
  resizeFunction : any
  index: number
  enable: boolean
  showGrabber: boolean
}) => {
  return (
    <div className='relative flex h-full flex-start items-center py-2'>
      {content}
      <div className="flex-grow"/>
      {
        enable ? 
        <div 
          className={cn(
            showGrabber ? "bg-red-200" : "",
            'absolute right-0 h-full w-4 cursor-ew-resize select-none'
          )}
          onMouseDown={e => resizeFunction(e,index)}
        /> :
        null
      }
    </div>
  )
}

const ResizableHeaderCell = ({resizeFunction, index, width, columnId, enable, showGrabber } : {
  columnId: string
  index : number
  width: number
  resizeFunction: (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  enable: boolean
  showGrabber: boolean
}) => {
  return (
    <Table.HeaderCell columnId={columnId} style={{width: width}} className='py-0 pr-0'>
      <ResizableWrapper
        content={columnId}
        index={index}
        resizeFunction={resizeFunction}
        enable={enable}
        showGrabber={showGrabber}
      />
    </Table.HeaderCell>
  )
}

const ResizableRowCell = ({resizeFunction, index, width, columnId, enable, showGrabber} : {
  columnId: string
  index : number
  width: number
  resizeFunction: (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  enable: boolean
  showGrabber: boolean
}) => {
  let data = useDataStore((state) => state[columnId]);
  if (!data) {
    const allData = useDataStore();
    data = `${allData.firstname}.${allData.lastname}`
  }

  return (
    <Table.Cell columnId={columnId} style={{width: width}} className='py-0 pr-0'>
      <ResizableWrapper
        content={data}
        index={index}
        resizeFunction={resizeFunction}
        enable={enable}
        showGrabber={showGrabber}
      />
    </Table.Cell>
  )
}

export const CustomTableCells: Story = {
  render: (props) => {
    const columnIds = props.columnIds;
    const defaultWidth = 200;

    const [showGrabber, setShowGrabber] = useState<boolean>(false);
    const [resizableColumns, setResizableColumns] = useState<boolean[]>(Array(columnIds.length).fill(true))
    const [widths, setWidths] = useState<number[]>(Array(columnIds.length).fill(defaultWidth));
    const [resizingColumnI, setColumnResizingI] = useState<number|null>(null);
    const [startX, setStartX] = useState<number>();
    const [startWidth, setStartWidth] = useState<number>();

    useEffect( () => {
      if (resizingColumnI !== null && startX && startWidth) {
        document.addEventListener("mousemove", doResize);
        document.addEventListener("mouseup", stopResize);
      }
    }, [resizingColumnI, startX, startWidth])

    const startResizing = (
      e : React.MouseEvent<HTMLDivElement, MouseEvent>, columnI : number
    ) => {
      setColumnResizingI(columnI);
      setStartX(e.clientX);
      setStartWidth(widths[columnI]);
    }

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
      document.removeEventListener("mouseup",stopResize);
    }

    const changeColumnResizability = (index : number) => {
      const copy = [...resizableColumns];
      copy[index] = !copy[index]
      setResizableColumns(copy)
    }

    const resetLayout = () => {
      setWidths(Array(columnIds.length).fill(defaultWidth))
    }

    const enableAllResizability = () => {
      setResizableColumns(Array(columnIds.length).fill(true))
    }

    const disableAllResizability = () => {
      setResizableColumns(Array(columnIds.length).fill(false))
    }

    const changeGrabberVisibility = () => {
      setShowGrabber(!showGrabber)
    }

    return (
      <>
        <Card className='my-2 w-1/2 min-w-[400px]'>
          <CardHeader>
            <CardTitle className="text-center">Enabled Column Resizing</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {columnIds.map( (val,index) => (
              <div key={`checkbox-${val}`} className='flex flex-row gap-2'>
                <Checkbox
                  checked={resizableColumns[index]}
                  onCheckedChange={() => changeColumnResizability(index)}
                />
                <Label>{val}</Label>
              </div>
            ))}
            <div className='flex flex-row gap-2'>
              <Checkbox
                  checked={showGrabber}
                  onCheckedChange={changeGrabberVisibility}
                />
                <Label>Grabber Visibility</Label>
            </div>
            <Button onClick={disableAllResizability} className="max-w-[300px]">
              Disable All Column Resizability
            </Button>
            <Button onClick={enableAllResizability} className="max-w-[300px]">
              Enable All Column Resizability
            </Button>
            <Button onClick={resetLayout} className="max-w-[300px]">
              Reset Column Widths
            </Button>
          </CardContent>
        </Card>
        <ScrollArea>
          <Table {...props} className='w-auto min-w-max'>
            <Table.Head>
              <Table.HeaderRow>
                {columnIds.map( (val,index) => (
                  <ResizableHeaderCell
                    key={`headercell-${val}`}
                    columnId={val}
                    index={index}
                    width={widths[index]}                
                    resizeFunction={(e) => startResizing(e,index)}
                    enable={resizableColumns[index]}
                    showGrabber={showGrabber}
                  />
                ))}
              </Table.HeaderRow>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                {columnIds.map( (val,index) => (
                  <ResizableRowCell
                    key={`bodycell-${val}`}
                    columnId={val}
                    index={index}
                    width={widths[index]}
                    resizeFunction={(e) => startResizing(e,index)}
                    enable={resizableColumns[index]}
                    showGrabber={showGrabber}
                  />
                ))}
              </Table.Row>
            </Table.Body>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
