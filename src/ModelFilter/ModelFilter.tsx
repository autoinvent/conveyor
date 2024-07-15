import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

import { FormStoreProvider } from '@/Form';
import type { Field } from '@/types';
import { useTableView, type TableViewOptions } from '@/utils';

export interface ModelFilterProps {
  fields: Field[];
  tableViewOptions: TableViewOptions;
}

export const ModelFilter = ({
  fields,
  tableViewOptions: { tableView, onTableViewChange },
}: ModelFilterProps) => {
  const tempTableViewOptions = useTableView(tableView)

  return (
  );
};
