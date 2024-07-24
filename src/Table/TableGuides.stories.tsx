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
import { Table } from './Table';
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
