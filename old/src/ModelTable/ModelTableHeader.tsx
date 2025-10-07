import type { TableHeaderProps } from '@/Table';
import { TableHeader as STableHeader } from '@/lib/components/ui/table';

import { ModelTableHeaderRow } from './ModelTableHeaderRow';

export interface ModelTableHeaderProps extends TableHeaderProps {}

export const ModelTableHeader = ({
  children,
  ...tableHeaderProps
}: ModelTableHeaderProps) => {
  return (
    <STableHeader {...tableHeaderProps}>
      {children === undefined ? <ModelTableHeaderRow /> : children}
    </STableHeader>
  );
};
