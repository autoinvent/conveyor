import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';

import { FormStoreProvider } from '@/Form';

import { useModelIndexStore } from '../useModelIndexStore';

import { ModelIndexFilterItem } from './ModelIndexFilterItem';

export const ModelIndexFilterSetting = () => {
  const fields = useModelIndexStore((state) => state.fields);
  const filter = useModelIndexStore((state) => state.tableView?.filter);
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Filtered items may satisfy any filter group; A filter group is macthed
          when all filters within the group is satisfied.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul>
          <li>
            <div>
              <FormStoreProvider
                mode="onChange"
                defaultValues={{
                  path: '',
                  not: false,
                  op: '',
                  value: '',
                }}
              >
                <ModelIndexFilterItem />
              </FormStoreProvider>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
