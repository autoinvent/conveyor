import { TableHead, type TableHeadProps } from '@/Table';
import { humanizeText } from '@/utils';

import { ModelTableHeadOptions } from './ModelTableHeadOptions';

export interface ModelTableHeadProps extends Omit<TableHeadProps, 'columnId'> {
  field: string;
}

export const ModelTableHead = ({ field, children }: ModelTableHeadProps) => {
  return (
    <TableHead columnId={field}>
      {children === undefined ? (
        <ModelTableHeadOptions field={field}>
          {humanizeText(field)}
        </ModelTableHeadOptions>
      ) : (
        children
      )}
    </TableHead>
  );
};
