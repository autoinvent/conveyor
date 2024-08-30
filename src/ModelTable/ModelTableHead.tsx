import { TableHead, type TableHeadProps } from '@/Table';
import { DndSortableWrapper, ResizableWrapper, humanizeText } from '@/utils';

import { DEFAULT_COLUMN_WIDTH } from './ModelTable';
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
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  const onWidthChange = useModelTableStore(
    (state) => state.tableOptions?.onWidthChange,
  );
  const resizable = useModelTableStore(
    (state) => state.columnOptions?.[field]?.resizable ?? true,
  );
  const label = useModelTableStore(
    (state) => state.columnOptions?.[field]?.label,
  );
  const width = useModelTableStore(
    (state) => state.columnOptions?.[field]?.width ?? DEFAULT_COLUMN_WIDTH,
  );

  return (
    <DndSortableWrapper draggable={draggable} dndId={field}>
      <TableHead columnId={field} {...tableHeadProps}>
        <ResizableWrapper
          resizable={resizable}
          width={width}
          onWidthChange={(width) => onWidthChange?.({ field, width })}
        >
          {children === undefined ? (
            <ModelTableHeadMenu field={field}>
              {label ?? humanizeText(field)}
            </ModelTableHeadMenu>
          ) : (
            children
          )}
        </ResizableWrapper>
      </TableHead>
    </DndSortableWrapper>
  );
};
