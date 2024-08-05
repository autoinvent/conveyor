import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import ModelTableStoryMeta from '@/ModelTable/stories/ModelTable.stories';
import type { ActionParams, DataType, TableView } from '@/types';

import { Header } from '@/Header';
import { Pagination } from '@/Pagination';
import { Button } from '@/lib/components/ui/button';
import { Plus } from 'lucide-react';
import { FieldVisibility } from '../FieldVisibility';
import { ModelTable } from '../ModelTable';

const meta = {
  title: 'Models/ModelTable/ModelIndexPage',
  component: ModelTable,
  tags: ['autodocs'],
  argTypes: ModelTableStoryMeta.argTypes,
  args: ModelTableStoryMeta.args,
  render: ({ tableOptions, data, onUpdate, onDelete, ...args }) => {
    const [tableView, setTableView] = useState<TableView>({});
    const [currData, setCurrData] = useState<undefined | DataType[]>(data);
    const [fieldOrder, onFieldOrderChange] = useState(args.fields);

    const onUpdateHandler = async (params: ActionParams<DataType>) => {
      await onUpdate?.(params);
      const id = params?.data?.id;
      if (id) {
        setCurrData((oldData) => {
          const idx = oldData?.findIndex((d: DataType) => d.id === id);
          if (idx !== undefined && idx >= 0 && oldData) {
            const newData = [...oldData];
            newData[idx] = params.data;
            return newData;
          }
          return oldData;
        });
      }
    };

    const onDeleteHandler = async (d: DataType) => {
      await onDelete?.(d);
      const id = d?.id;
      if (id) {
        setCurrData((oldData) => {
          const idx = oldData?.findIndex((d: DataType) => d.id === id);
          if (idx !== undefined && idx >= 0 && oldData) {
            const newData = [...oldData];
            newData.splice(idx, 1);
            return newData;
          }
          return oldData;
        });
      }
    };

    return (
      <div>
        <Header>
          <Header.Title>Task List</Header.Title>
          <Header.Actions>
            <FieldVisibility
              fields={args.fields}
              fieldOrder={fieldOrder}
              onFieldOrderChange={onFieldOrderChange}
              options={tableOptions?.columnOptions}
            />
            <Button variant="outline" size="sm" className="h-8">
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </Header.Actions>
        </Header>
        <ModelTable
          data={currData}
          tableOptions={{
            ...tableOptions,
            sortOrder: tableView.sort,
            onSortOrderChange: (newSortOrder) => {
              setTableView((oldTableView) => ({
                ...oldTableView,
                sort: newSortOrder,
              }));
            },
            fieldOrder,
            onFieldOrderChange,
          }}
          onUpdate={onUpdateHandler}
          onDelete={onDeleteHandler}
          {...args}
        />
        <Pagination
          totalDataLength={500}
          page={tableView.page}
          onPageChange={(newPage) => {
            setTableView((oldTableView) => ({
              ...oldTableView,
              page: newPage,
            }));
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof ModelTable>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
