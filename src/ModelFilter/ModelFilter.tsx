import { CircleX } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

import type { TableViewOptions } from '@/ModelIndex';

import {
  type Field,
  FieldTypes,
  type FilterItem,
  ScalarTypes,
  type SelectOption,
} from '@/types';
import { humanizeText } from '@/utils';
import { ModelFilterItem } from './ModelFilterItem';
import { addFilter, changeFilter, removeFilter } from './utils';

export const FILTER_OPERATIONS: Record<string, SelectOption[]> = {
  [FieldTypes.ID]: [{ label: 'equal to', value: 'eq' }],
  [FieldTypes.STRING]: [
    { label: 'equal to', value: 'eq' },
    { label: 'like', value: 'like' },
  ],
  [FieldTypes.BOOLEAN]: [{ label: 'equal to', value: 'eq' }],
  [FieldTypes.INT]: [
    { label: 'equal to', value: 'eq' },
    { label: 'less than', value: 'lt' },
    { label: 'less than or equal to', value: 'le' },
    { label: 'greater than', value: 'gt' },
    { label: 'greater than or equal to', value: 'ge' },
  ],
  [FieldTypes.FLOAT]: [
    { label: 'equal to', value: 'eq' },
    { label: 'less than', value: 'lt' },
    { label: 'less than or equal to', value: 'le' },
    { label: 'greater than', value: 'gt' },
    { label: 'greater than or equal to', value: 'ge' },
  ],
  [FieldTypes.DATETIME]: [
    { label: 'equal to', value: 'eq' },
    { label: 'less than', value: 'lt' },
    { label: 'less than or equal to', value: 'le' },
    { label: 'greater than', value: 'gt' },
    { label: 'greater than or equal to', value: 'ge' },
  ],
};

export interface ModelFilterProps extends ComponentProps<typeof Card> {
  fields: Field[];
  tableViewOptions: TableViewOptions;
  handleOnSave?: (onSave: () => void) => void;
  handleOnClear?: (onClear: () => void) => void;
}

export const ModelFilter = ({
  fields,
  tableViewOptions: { tableView, onTableViewChange },
  handleOnSave = (onSave) => onSave(),
  handleOnClear = (onClear) => onClear(),
  ...cardProps
}: ModelFilterProps) => {
  const [{ filter: tempFilter }, onTempTableViewChange] = useState(tableView);
  const filterableFields = fields.filter((field) =>
    Object.values(ScalarTypes as Record<string, string>).includes(field.type),
  );
  const pathOptions = filterableFields.map((field) => ({
    label: humanizeText(field.name),
    value: field.name,
  }));
  const notOptions = [
    { label: 'is', value: false },
    { label: 'is not', value: true },
  ];
  const defaultFilterItem =
    filterableFields.length > 0
      ? {
          path: filterableFields[0].name,
          not: notOptions[0].value,
          op: FILTER_OPERATIONS[filterableFields[0].type][0].value as string,
          value: '',
        }
      : null;
  const onFilterItemChange =
    (group: number, index: number) => (changedFilterItem: FilterItem) => {
      const newFilter = changeFilter(
        tempFilter,
        changedFilterItem,
        group,
        index,
      );
      onTempTableViewChange((oldTableView) =>
        Object.assign({}, oldTableView, { filter: newFilter }),
      );
    };
  return (
    <Card {...cardProps}>
      <CardHeader className="p-2">
        <CardDescription>
          Filters within the same group are combined to show results that meet
          all of the selected criteria.
        </CardDescription>
        <CardDescription>
          Results will match any of the criteria set in different filter groups.
        </CardDescription>
        <CardDescription>
          Create groups of filters to narrow down your results.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {defaultFilterItem ? (
          <>
            <ScrollArea className="max-h-80">
              {tempFilter?.map((filterGroup, i) => {
                const groupKey = `filter-group-${i}`;
                return (
                  <Card key={groupKey} className="m-2 p-1 hover:bg-muted/50">
                    <CardContent className="space-y-2 p-2">
                      {filterGroup.map((filterItem, j) => {
                        const groupItemkey = `filter-item-group-${i}-index-${j}`;
                        const fieldType = fields.find(
                          (field) => field.name === filterItem.path,
                        )?.type;
                        if (!fieldType) return null;
                        return (
                          <div key={groupItemkey} className="flex gap-2">
                            <ModelFilterItem
                              filterItem={filterItem}
                              onFilterItemChange={onFilterItemChange(i, j)}
                              selectOptions={{
                                path: pathOptions,
                                not: notOptions,
                                op: FILTER_OPERATIONS[fieldType],
                              }}
                            />
                            <Button
                              variant="outline-destructive"
                              className="px-2"
                              onClick={() => {
                                const newFilter = removeFilter(
                                  tempFilter,
                                  i,
                                  j,
                                );
                                onTempTableViewChange((oldTableView) =>
                                  Object.assign({}, oldTableView, {
                                    filter: newFilter,
                                  }),
                                );
                              }}
                            >
                              <CircleX />
                            </Button>
                          </div>
                        );
                      })}
                    </CardContent>
                    <CardDescription>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newFilter = addFilter(
                            tempFilter,
                            defaultFilterItem,
                            i,
                          );
                          onTempTableViewChange((oldTableView) =>
                            Object.assign({}, oldTableView, {
                              filter: newFilter,
                            }),
                          );
                        }}
                      >
                        Add Filter . . .
                      </Button>
                    </CardDescription>
                  </Card>
                );
              })}
            </ScrollArea>
            <div className="p-3">
              <Button
                variant="outline"
                className=" w-full p-3 text-muted-foreground text-sm"
                onClick={() => {
                  const fieldType = fields.find(
                    (field) => field.name === pathOptions[0].value,
                  )?.type;
                  if (fieldType) {
                    const newFilter = addFilter(
                      tempFilter,
                      defaultFilterItem,
                      tempFilter?.length ?? 0,
                    );
                    onTempTableViewChange((oldTableView) =>
                      Object.assign({}, oldTableView, { filter: newFilter }),
                    );
                  }
                }}
              >
                Add a filter group . . .
              </Button>
            </div>
          </>
        ) : (
          'No fields can be filtered.'
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="outline"
          onClick={() =>
            handleOnClear(() =>
              onTempTableViewChange((oldTableView) =>
                Object.assign({}, oldTableView, { filter: [] }),
              ),
            )
          }
        >
          Clear
        </Button>
        <Button
          onClick={() =>
            handleOnSave(() =>
              onTableViewChange((oldTableView) =>
                Object.assign({}, oldTableView, { filter: tempFilter }),
              ),
            )
          }
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
