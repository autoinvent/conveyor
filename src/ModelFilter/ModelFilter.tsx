import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import {
  type Field,
  FieldTypes,
  type FilterItem,
  ScalarTypes,
  type SelectOption,
} from '@/types';
import { humanizeText, useTableView, type TableViewOptions } from '@/utils';
import { ModelFilterItem } from './ModelFilterItem';

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

export interface ModelFilterProps {
  fields: Field[];
  tableViewOptions: TableViewOptions;
}

export const ModelFilter = ({
  fields,
  tableViewOptions: { tableView, onTableViewChange },
}: ModelFilterProps) => {
  const {
    tableView: { filter: tempFilter },
    onTableViewChange: tempTableViewOnChange,
  } = useTableView(tableView);
  const onFilterItemChange =
    (group: number, index: number) => (currFilterItem: FilterItem) => {
      tempTableViewOnChange((oldTempTableView) => {
        const newTempTableView = { ...oldTempTableView };
        if (newTempTableView?.filter) {
          newTempTableView.filter[group][index] = currFilterItem;
        }
        return newTempTableView;
      });
    };
  return (
    <Card>
      <CardHeader>
        <CardDescription>Show records where,</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-80">
          {tempFilter?.map((filterGroup, i) => {
            const groupKey = `filter-group-${i}`;
            return (
              <div key={groupKey}>
                {filterGroup.map((filterItem, j) => {
                  const groupItemkey = `filter-item-group-${i}-index-${j}`;
                  const fieldType = fields.find(
                    (field) => field.name === filterItem.path,
                  )?.type;
                  if (!fieldType) return null;
                  return (
                    <ModelFilterItem
                      key={groupItemkey}
                      filterItem={filterItem}
                      onFilterItemChange={onFilterItemChange(i, j)}
                      selectOptions={{
                        path: fields
                          .filter((field) =>
                            Object.values(
                              ScalarTypes as Record<string, string>,
                            ).includes(field.type),
                          )
                          .map((field) => ({
                            label: humanizeText(field.name),
                            value: field.name,
                          })),
                        not: [
                          { label: 'is', value: false },
                          { label: 'is not', value: true },
                        ],
                        op: FILTER_OPERATIONS[fieldType],
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button>Apply Filters</Button>
        <Button>Clear All Filters</Button>
        <Button>Close</Button>
      </CardFooter>
    </Card>
  );
};
