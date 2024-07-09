import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';
import { useState } from 'react';
import { useModelIndexStore } from '../useModelIndexStore';
import { SortableList } from './components/SortableList';

export const ModelIndexSortSetting = () => {

  const sort = useModelIndexStore(state => state.tableView?.sort) // sort to be passed to magiql endpoint
  const fieldNames = useModelIndexStore(state => state.fields).map(item => item.name); // get names of all fields (unique identifiers)
  const [items, setItems] = useState<string[]>(fieldNames);
  return (
    <Card>
      <CardHeader>
        <CardDescription>Sorting order applied:</CardDescription>
        <CardDescription>Sorted in order from top to bottom.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
      <SortableList
        items={items}
        setItems={setItems}
      />
      </CardContent>
      <CardFooter>
        <Button>Apply Sorting Order</Button>
      </CardFooter>
    </Card>
  );
};
