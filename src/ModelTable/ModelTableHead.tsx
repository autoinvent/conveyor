import { TableHead, type TableHeadProps } from '@/Table';
import { humanizeText } from '@/utils';

import { ModelTableHeadOptions } from './ModelTableHeadOptions';
import { useModelTableStore } from './useModelTableStore';
import { DndSortableWrapper } from './Wrappers/DnDSortableWrapper';

export interface ModelTableHeadProps extends Omit<TableHeadProps, 'columnId'> {
  field: string;
}

export const ModelTableHead = ({
  field,
  className,
  children,
  ...tableHeadProps
}: ModelTableHeadProps) => {
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );

  return (
    <DndSortableWrapper draggable={draggable} dndId={field}>
      <TableHead columnId={field} {...tableHeadProps}>
        {children === undefined ? (
          <ModelTableHeadOptions field={field}>
            {humanizeText(field)}
          </ModelTableHeadOptions>
        ) : (
          children
        )}
      </TableHead>
    </DndSortableWrapper>
  );
};
