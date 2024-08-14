import { TableHead, type TableHeadProps } from '@/Table';
import { DndSortableWrapper, humanizeText } from '@/utils';

import { ModelTableHeadMenu } from './ModelTableHeadMenu';
import { useModelTableStore } from './useModelTableStore';
import { useRef, useState } from 'react';
import { ResizableWrapper } from '@/utils';

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
    (state) => state.tableOptions.draggable ?? true,
  );
  const onWidthChange = useModelTableStore(
    (state) => state.tableOptions?.onWidthChange,
  );
  const resizable = useModelTableStore(
    (state) => state.tableOptions?.columnOptions?.[field]?.resizable ?? true,
  );
  const label = useModelTableStore(
    (state) => state.tableOptions.columnOptions?.[field]?.label,
  );
  const width = useModelTableStore(
    (state) => state.tableOptions?.columnOptions?.[field]?.width ?? 200,
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
