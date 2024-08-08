import { TableHead, type TableHeadProps } from '@/Table';
import { DndSortableWrapper, humanizeText } from '@/utils';

import { ModelTableHeadMenu } from './ModelTableHeadMenu';
import { useModelTableStore } from './useModelTableStore';
import { useEffect, useRef, useState } from 'react';

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

  const cellRef = useRef<HTMLTableCellElement>(null);
  const [width, setWidth] = useState<number|undefined>();
  const [startX, setStartX] = useState<number>();
  const [startWidth, setStartWidth] = useState<number>();
  const [finishedResize, setFinishedResize] = useState<boolean>(false);

  if (!width && cellRef.current) {
    setWidth(cellRef.current.offsetWidth)
  }

  useEffect( () => {
    if (startX && startWidth) {
      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    }
  }, [startX, startWidth])

  useEffect( () => {
    if (finishedResize && cellRef?.current && width) {
      setFinishedResize(false);
      setWidth(Math.max(cellRef.current?.offsetWidth, width))
    }
  }, [finishedResize, width])

  const startResizing = (
    e : React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setStartX(e.clientX);
    setStartWidth(width);
  }

  const doResize = (e : MouseEvent) => {
    if (startWidth && startX) {
      console.log(startWidth + (e.clientX - startX))
      setWidth(startWidth + (e.clientX - startX))
    }
  }

  const stopResize = () => {
    document.removeEventListener("mousemove",doResize);
    document.removeEventListener("mouseup",stopResize);
    setFinishedResize(true);
  }

  return (
    <DndSortableWrapper draggable={draggable} dndId={field}>
      <TableHead columnId={field} {...tableHeadProps} ref={cellRef} style={{ width: width }}>
        {children === undefined ? (
          <div className='flex h-full flex-row'>
            <ModelTableHeadMenu field={field}>
              {label ?? humanizeText(field)}
            </ModelTableHeadMenu>
            <div className="flex-grow"/>
            <div className='z-50 h-full w-2 cursor-ew-resize select-none bg-red-100' onMouseDown={(e) => {
              startResizing(e)
              e.stopPropagation()
            }}/>
          </div>
        ) : (
          children
        )}
      </TableHead>
    </DndSortableWrapper>
  );
};
