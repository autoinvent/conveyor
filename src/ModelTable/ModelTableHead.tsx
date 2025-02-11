import { useEffect, useState } from 'react';

import { TableHead, type TableHeadProps } from '@/Table';
import { DndSortableWrapper, ResizableWrapper, humanizeText } from '@/utils';

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
    (state) => state.columnOptions?.[field]?.width,
  );

<<<<<<< HEAD
  // set width table styles to render columns and for resizable wrapper
  const [onLoadWidth, setOnLoadWidth] = useState<number | undefined>(width);
=======
  // set width to apply during initial table render
  const [onLoadWidth, setOnLoadWidth] = useState(width && width + 32);
>>>>>>> 25c5045e (fixed format)
  useEffect(() => {
    setOnLoadWidth(undefined);
  }, []);

  return (
    <DndSortableWrapper draggable={draggable} dndId={field}>
      <TableHead
        style={{ width: onLoadWidth }}
        columnId={field}
        {...tableHeadProps}
      >
        <ResizableWrapper
          resizable={resizable}
          width={onLoadWidth}
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
