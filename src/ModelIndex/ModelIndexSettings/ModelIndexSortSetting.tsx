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

export const ModelIndexSortSetting = () => {

  const sort = useModelIndexStore(state => state.tableView?.sort) // sort to be passed to magiql endpoint
  const fields = useModelIndexStore(state => state.fields) // list of fields
  const sortedFieldNames = fields.filter(field => field.sortable).map(item => item.name); // sort fields then get their names (unique identifiers)
  const [items, setItems] = useState<string[]>(sortedFieldNames);
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
        <Button>Apply sorting order</Button>
      </CardFooter>
    </Card>
  );
};
