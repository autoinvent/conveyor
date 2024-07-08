import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';
import { useModelIndexStore } from '../useModelIndexStore';
import { SortableList } from './components/SortableList';
import { useState } from 'react';

import type { Field } from '@/types';

export const ModelIndexSortSetting = () => {

  const sort = useModelIndexStore(state => state.tableView?.sort) // sort to be passed to magiql endpoint
  console.log(sort);
  const fields = useModelIndexStore(state => state.fields) // list of fields
  // each field type has a boolean sortable field inside of it 
  const sortedFields = fields.filter(field => field.sortable) // return array of sorted fields
  console.log(sortedFields);
  const [items, setItems] = useState<Field[]>(sortedFields);
  return (
    <Card>
      <CardHeader>
        <CardDescription>Sorting order applied:</CardDescription>
        <CardDescription>Sorted in order from top to bottom.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* <div className="space-y-1">ghello</div>
        <div className="space-y-1">workld</div> */}
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.name}>
            {item.name}
          </SortableList.Item>
        )}
      />
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
