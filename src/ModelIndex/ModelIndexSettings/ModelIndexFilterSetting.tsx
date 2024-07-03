import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/lib/components/ui/card';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { FormStoreProvider } from '@/Form';

import { useModelIndexStore } from '../useModelIndexStore';

import { ModelIndexFilterItem } from './ModelIndexFilterItem';

export const ModelIndexFilterSetting = () => {
  const filter = useModelIndexStore((state) => state.tableView?.filter);
  const filterLength = filter?.length ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Filtered items may satisfy any filter group.
        </CardDescription>
        <CardDescription>
          A filter group is matched when all filters within the group is
          satisfied.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-80">
          {filter?.map((filterGroup, i) => {
            const groupKey = `filter-group-${i}`;
            return (
              <div key={groupKey} className="space-y-2 p-3 hover:bg-muted/50">
                {filterGroup.map((filterItem, j) => {
                  const groupItemkey = `filter-item-group-${i}-index-${j}`;
                  return (
                    <FormStoreProvider
                      key={groupItemkey}
                      mode="onChange"
                      values={{ group: i, groupIndex: j, ...filterItem }}
                    >
                      <ModelIndexFilterItem showRemoveFilter showSaveFilter />
                    </FormStoreProvider>
                  );
                })}
              </div>
            );
          })}
        </ScrollArea>

        <div className={cn(filter && filter?.length > 0 && 'mt-2', 'p-2')}>
          <FormStoreProvider
            mode="onChange"
            values={{
              group: filterLength,
              groupIndex: 0,
              path: '',
              not: false,
              op: '',
              value: '',
            }}
          >
            <ModelIndexFilterItem showAddFilter />
          </FormStoreProvider>
        </div>
      </CardContent>
    </Card>
  );
};
