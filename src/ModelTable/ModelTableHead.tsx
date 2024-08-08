import { TableHead, type TableHeadProps } from '@/Table';
import { DndSortableWrapper, humanizeText } from '@/utils';

import { ModelTableHeadMenu } from './ModelTableHeadMenu';
import { useModelTableStore } from './useModelTableStore';
import { useRef, useState } from 'react';
import { ResizeWrapper } from '@/utils/components/ResizeWrapper';

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
    (state) => state.tableOptions.columnOptions?.[field]?.label,
  );
  const draggable = useModelTableStore(
    (state) => state.tableOptions.draggable ?? true,
  );
  const resizable = useModelTableStore(
    (state) => state.tableOptions?.columnOptions?.[field]?.resizable ?? true
  )
  const fieldWidth = useModelTableStore(
    (state) => state.tableOptions?.columnOptions?.[field]?.width ?? 0
  )

  const cellRef = useRef<HTMLTableCellElement>(null);
  const [width, setWidth] = useState<number>(fieldWidth);

  return (
    <DndSortableWrapper draggable={draggable} dndId={field}>
      <TableHead columnId={field} {...tableHeadProps} ref={cellRef} style={{ width: width }}>
        <ResizeWrapper cellRef={cellRef} width={width} setWidth={setWidth} resizable={resizable}>
          {children === undefined ? (
            <ModelTableHeadMenu field={field}>
              {label ?? humanizeText(field)}
            </ModelTableHeadMenu>
          ) : (
            children
          )}
        </ResizeWrapper>
      </TableHead>
    </DndSortableWrapper>
  );
};
