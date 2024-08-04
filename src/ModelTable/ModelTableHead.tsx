import { TableHead, type TableHeadProps } from '@/Table';
import { DndSortableWrapper, humanizeText } from '@/utils';

import { ModelTableHeadMenu } from './ModelTableHeadMenu';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableHeadProps extends Omit<TableHeadProps, 'columnId'> {
  field: string;
}

export const ModelTableHead = ({
  field,
  className,
  children,
  ...tableHeadProps
}: ModelTableHeadProps) => {
  const label = useModelTableStore(
    (state) =>
      state.tableOptions?.columnOptions?.[field]?.label ?? humanizeText(field),
  );
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );

  return (
    <DndSortableWrapper draggable={draggable} dndId={field}>
      <TableHead columnId={field} {...tableHeadProps}>
        {children === undefined ? (
          <ModelTableHeadMenu field={field}>{label}</ModelTableHeadMenu>
        ) : (
          children
        )}
      </TableHead>
    </DndSortableWrapper>
  );
};
