import type { Meta, StoryObj } from '@storybook/react';

import { useDataStore } from '@/Data';
import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Checkbox } from '@/lib/components/ui/checkbox';
import { Label } from '@/lib/components/ui/label';
import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Table } from '../Table';
import TableStoryMeta from './Table.stories';

const meta = {
  title: 'Commons/Table/ResizingColumn',
  component: Table,
  tags: ['autodocs'],
  args: { ...TableStoryMeta.args },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const ResizableCellWrapper = ({
  content,
  resizeFunction,
  enable,
  showGrabber,
}: {
  content: any;
  resizeFunction: any;
  enable: boolean;
  showGrabber: boolean;
}) => {
  return (
    <div className="relative flex h-full flex-start items-center py-2">
      {content}
      <div className="flex-grow" />
      {enable ? (
        <div
          className={cn(
            showGrabber ? 'bg-border' : '',
            'absolute right-0 h-full w-4 cursor-ew-resize select-none',
          )}
          onMouseDown={resizeFunction}
        />
      ) : null}
    </div>
  );
};

const ResizableRowCell = ({
  resizeFunction,
  width,
  columnId,
  enable,
  showGrabber,
}: {
  columnId: string;
  width: number;
  resizeFunction: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  enable: boolean;
  showGrabber: boolean;
}) => {
  let data = useDataStore((state) => state[columnId]);
  if (!data) {
    const allData = useDataStore();
    data = `${allData.firstname}.${allData.lastname}`;
  }

  return (
    <Table.Cell
      columnId={columnId}
      style={{ width: width }}
      className="py-0 pr-0"
    >
      <ResizableCellWrapper
        content={data}
        resizeFunction={resizeFunction}
        enable={enable}
        showGrabber={showGrabber}
      />
    </Table.Cell>
  );
};

export const CustomTableCells: Story = {
  render: (props) => {
    const columnIds = props.columnIds;
    const defaultWidth = 200;

    const [showGrabber, setShowGrabber] = useState<boolean>(false);
    const [resizableColumns, setResizableColumns] = useState<{
      [columnID: string]: boolean;
    }>(
      Object.assign({}, ...columnIds.map((columnId) => ({ [columnId]: true }))),
    );
    const [widths, setWidths] = useState<{ [columnID: string]: number }>(
      Object.assign(
        {},
        ...columnIds.map((columnId) => ({ [columnId]: defaultWidth })),
      ),
    );
    const [resizingColumnId, setColumnResizingId] = useState<string | null>(
      null,
    );
    const [startX, setStartX] = useState<number>();
    const [startWidth, setStartWidth] = useState<number>();

    useEffect(() => {
      if (resizingColumnId !== null && startX && startWidth) {
        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);
      }
    }, [resizingColumnId, startX, startWidth]);

    const startResizing = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      columnId: string,
    ) => {
      setColumnResizingId(columnId);
      setStartX(e.clientX);
      setStartWidth(widths[columnId]);
    };

    const doResize = (e: MouseEvent) => {
      if (resizingColumnId !== null && startWidth && startX) {
        const copy = { ...widths };
        copy[resizingColumnId] = startWidth + (e.clientX - startX);
        setWidths(copy);
      }
    };

    const stopResize = () => {
      setColumnResizingId(null);
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    const changeColumnResizability = (index: string) => {
      const copy = { ...resizableColumns };
      copy[index] = !copy[index];
      setResizableColumns(copy);
    };

    const resetLayout = () => {
      setWidths(
        Object.assign(
          {},
          ...columnIds.map((columnId) => ({ [columnId]: defaultWidth })),
        ),
      );
    };

    const enableAllResizability = () => {
      setResizableColumns(
        Object.assign(
          {},
          ...columnIds.map((columnId) => ({ [columnId]: true })),
        ),
      );
    };

    const disableAllResizability = () => {
      setResizableColumns(
        Object.assign(
          {},
          ...columnIds.map((columnId) => ({ [columnId]: false })),
        ),
      );
    };

    const changeGrabberVisibility = () => {
      setShowGrabber(!showGrabber);
    };

    return (
      <>
        <Card className="my-2 w-1/2 min-w-[400px]">
          <CardHeader>
            <CardTitle className="text-center">Column Resizing</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {columnIds.map((val, index) => (
              <div key={`checkbox-${val}`} className="flex flex-row gap-2">
                <Checkbox
                  checked={resizableColumns[val]}
                  onCheckedChange={() => changeColumnResizability(val)}
                />
                <Label>{val}</Label>
              </div>
            ))}
            <div className="flex flex-row gap-2">
              <Checkbox
                checked={showGrabber}
                onCheckedChange={changeGrabberVisibility}
              />
              <Label>Grabber Visibility (not a column)</Label>
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
          <Table {...props} className="w-auto min-w-max">
            <Table.Header>
              <Table.HeaderRow>
                {columnIds.map((columnId) => (
                  <Table.Head
                    key={`headercell-${columnId}`}
                    columnId={columnId}
                    style={{ width: widths[columnId] }}
                    className="py-0 pr-0"
                  >
                    <ResizableCellWrapper
                      content={columnId}
                      resizeFunction={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                      ) => startResizing(e, columnId)}
                      enable={resizableColumns[columnId]}
                      showGrabber={showGrabber}
                    />
                  </Table.Head>
                ))}
              </Table.HeaderRow>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {columnIds.map((columnId) => (
                  <ResizableRowCell
                    key={`bodycell-${columnId}`}
                    columnId={columnId}
                    width={widths[columnId]}
                    resizeFunction={(e) => startResizing(e, columnId)}
                    enable={resizableColumns[columnId]}
                    showGrabber={showGrabber}
                  />
                ))}
              </Table.Row>
            </Table.Body>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </>
    );
  },
};

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
