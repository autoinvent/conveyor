import { useState } from 'react';

import { Plus } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';

import { Action, type ActionParams } from '@/Actions/ActionContext';
import { RawDisplay } from '@/BasicDisplays';
import { Conveyor } from '@/Conveyor';
import { FormDisplay } from '@/Form';
import { Header } from '@/Header';
import ModelTableStoryMeta from '@/ModelTable/stories/ModelTable.stories';
import { Pagination } from '@/Pagination';
import { Button } from '@/lib/components/ui/button';
import { type DataType, ScalarType, type TableView } from '@/types';

import { FieldVisibility } from '../FieldVisibility';
import { ModelTable } from '../ModelTable';

const meta = {
  title: 'Models/ModelTable/ModelIndexPage',
  component: ModelTable,
  tags: ['autodocs'],
  args: ModelTableStoryMeta.args,
  render: ({
    fields,
    fieldOrder: dummyFieldOrder,
    onFieldOrderChange: dummyOnFieldOrderChange,
    tableOptions,
    data,
    actionOptions,
    columnOptions,
    ...args
  }) => {
    // const [errors, setErrors] = useState({});
    const [tableView, setTableView] = useState<TableView>({});
    const [currData, setCurrData] = useState<DataType[]>(data);
    const [fieldOrder, onFieldOrderChange] = useState([...fields]);
    const [perPage, setPerPage] = useState<number | undefined>(10);

    const onSubmitHandler = async (params: ActionParams<DataType>) => {
      await actionOptions?.actions?.[Action.SUBMIT]?.(params);
      const id = params?.data?.id;
      console.log(params);
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
        params.onCancelEdit();
      }
    };

    const onDeleteHandler = async (params: ActionParams<DataType>) => {
      await actionOptions?.actions?.[Action.DELETE]?.(params);
      const id = params?.data?.id;
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
      <div className="flex h-[300px] w-full flex-col">
        <Conveyor
          typeOptions={{
            [ScalarType.STRING]: {
              DisplayComponent: (props) => (
                <span className="text-cyan-400">{props.value}</span>
              ),
            },
          }}
        >
          <Header>
            <Header.Title>Task List</Header.Title>
            <Header.Actions>
              <FieldVisibility
                fields={fields}
                fieldOrder={fieldOrder}
                onFieldOrderChange={onFieldOrderChange}
                options={columnOptions}
              />
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="mr-2 h-4 w-4" />
                Create
              </Button>
            </Header.Actions>
          </Header>
          <ModelTable
            fields={fields}
            fieldOrder={fieldOrder}
            onFieldOrderChange={onFieldOrderChange}
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
            }}
            columnOptions={columnOptions}
            actionOptions={{
              actions: {
                [Action.SUBMIT]: onSubmitHandler,
                [Action.DELETE]: onDeleteHandler,
              },
            }}
            {...args}
          >
            <ModelTable.Header />
            <ModelTable.Body>
              <ModelTable.Row prefilled>
                <ModelTable.Cell field="points">
                  <FormDisplay name="points">
                    <RawDisplay className="text-yellow-300" />
                  </FormDisplay>
                </ModelTable.Cell>
              </ModelTable.Row>
            </ModelTable.Body>
            <ModelTable.Fallback />
          </ModelTable>
          <Pagination
            totalDataLength={currData.length}
            page={tableView.page}
            onPageChange={(newPage) => {
              setTableView((oldTableView) => ({
                ...oldTableView,
                page: newPage,
              }));
            }}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </Conveyor>
      </div>
    );
  },
} satisfies Meta<typeof ModelTable>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
