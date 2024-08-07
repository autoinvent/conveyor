import type { TableHeaderProps } from '@/Table';

import * as Shadcn from '../lib/components/ui/table';

import { ModelTableHeaderRow } from './ModelTableHeaderRow';

export interface ModelTableHeaderProps extends TableHeaderProps {}

export const ModelTableHeader = ({
  children,
  ...tableHeaderProps
}: ModelTableHeaderProps) => {
  return (
    <Shadcn.TableHeader {...tableHeaderProps}>
      {children === undefined ? <ModelTableHeaderRow /> : children}
    </Shadcn.TableHeader>
  );
};
