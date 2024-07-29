import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/lib/components/ui/button';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Checkbox } from '@/lib/components/ui/checkbox';
import { Label } from '@/lib/components/ui/label';
import { Separator } from '@/lib/components/ui/separator';
import { Table } from '../Table';
import TableStoryMeta from './Table.stories';

const meta = {
  title: 'Commons/Table/TableGuide',
  component: Table,
  tags: ['autodocs'],
  args: { ...TableStoryMeta.args },
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ColumnReordering: Story = {
  render: ({ columnIds: argsColumnIds, ...rest }) => {
    const [columnIds, setColumnIds] = useState(argsColumnIds);

    useEffect(() => {
      setColumnIds(argsColumnIds);
    }, [argsColumnIds]);

    return (
      <div className="flex flex-col">
        <Table {...rest} columnIds={columnIds} />
        <Button
          variant="outline"
          className="m-auto mt-4 border border-border px-2 py-1"
          onClick={() => {
            setColumnIds((oldOrder) => {
              const newOrder = [...oldOrder];
              const firstColumnId = newOrder.shift();
              return firstColumnId === undefined
                ? []
                : [...newOrder, firstColumnId];
            });
          }}
        >
          reorder
        </Button>
      </div>
    );
  },
};

export const ColumnVisibility: Story = {
  render: ({ columnIds, ...props }) => {
    const [columnVisibility, setColumnVisibility] = useState(
      Object.fromEntries(columnIds.map((columnId) => [columnId, true])),
    );
    const isAllColumnsVisible = Object.values(columnVisibility).every((v) => v);

    const toggleColumnVisibility = (columnId: string) => () =>
      setColumnVisibility((oldColumnVisibility) =>
        Object.assign({}, oldColumnVisibility, {
          [columnId]: !oldColumnVisibility[columnId],
        }),
      );
    const toggleAllColumnVisibility = () => {
      setColumnVisibility(
        Object.fromEntries(
          columnIds.map((columnId) => [columnId, !isAllColumnsVisible]),
        ),
      );
    };

    return (
      <>
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-center">Column Visibility</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="toggle-all"
                checked={isAllColumnsVisible}
                onCheckedChange={toggleAllColumnVisibility}
              />
              <Label htmlFor="toggle-all">Toggle All</Label>
            </div>
            <Separator />
            {columnIds.map((columnId) => (
              <div key={columnId} className="flex items-center gap-2">
                <Checkbox
                  id={columnId}
                  checked={columnVisibility[columnId]}
                  onCheckedChange={toggleColumnVisibility(columnId)}
                />
                <Label htmlFor={columnId}>{columnId}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
        <Table
          {...props}
          columnIds={columnIds.filter((columnId) => columnVisibility[columnId])}
        />
      </>
    );
  },
};

// needed for table body level scope DnD setup
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { cn } from '@/lib/utils';
// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';

const DraggableTableHeader = ({ columnId }: { columnId: string }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: columnId,
    });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Table.HeaderCell
      className={cn(isDragging && 'z-10 opacity-80')}
      columnId={columnId}
      ref={setNodeRef}
      style={style}
    >
      {columnId}
      <button {...attributes} {...listeners}>
        🟰
      </button>
    </Table.HeaderCell>
  );
};

const DragAlongCell = ({ columnId }: { columnId: string }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: columnId,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Table.Cell
      className={cn(isDragging && 'z-10 opacity-80')}
      columnId={columnId}
      ref={setNodeRef}
      style={style}
    />
  );
};

export const ColumnDnD: Story = {
  render: ({ columnIds: argsColumnIds, ...rest }) => {
    const [columnIds, setColumnIds] = useState(argsColumnIds);

    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        setColumnIds((columnOrder) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);
          return arrayMove(columnOrder, oldIndex, newIndex);
        });
      }
    }

    const sensors = useSensors(
      useSensor(MouseSensor, {}),
      useSensor(TouchSensor, {}),
      useSensor(KeyboardSensor, {}),
    );

    return (
      // NOTE: This provider creates div elements, so don't nest inside of <table> elements
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Table {...rest} columnIds={columnIds}>
          <Table.Head>
            <Table.HeaderRow>
              <SortableContext
                items={columnIds}
                strategy={horizontalListSortingStrategy}
              >
                {columnIds.map((columnId) => (
                  <DraggableTableHeader key={columnId} columnId={columnId} />
                ))}
              </SortableContext>
            </Table.HeaderRow>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <SortableContext
                items={columnIds}
                strategy={horizontalListSortingStrategy}
              >
                {columnIds.map((columnId) => (
                  <DragAlongCell key={columnId} columnId={columnId} />
                ))}
              </SortableContext>
            </Table.Row>
          </Table.Body>
        </Table>
      </DndContext>
    );
  },
};
