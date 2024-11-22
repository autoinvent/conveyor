import { useEffect, useRef, type ComponentProps } from 'react';

import { Slots } from '@/Slots';
import { TableRow as STableRow } from '@/lib/components/ui/table';

import { TableHead } from './TableHead';
import { useTableStore } from './useTableStore';
import { ColumnOptions, useModelTableStore } from '@/ModelTable';

export interface TableHeaderRowProps extends ComponentProps<typeof STableRow> {
  prefilled?: boolean;
}

export const TableHeaderRow = ({
  prefilled,
  children,
  ...htmlProps
}: TableHeaderRowProps) => {
  const columnIds = useTableStore((state) => state.columnIds);
  const columnOptions = useModelTableStore((state) => state.columnOptions);
  const ref = useRef<HTMLTableRowElement>(null);

  const onUpdate = useModelTableStore((state) => state.onUpdate);
  const onDelete = useModelTableStore((state) => state.onDelete);
  const readOnly = useModelTableStore((state) => state.tableOptions?.readOnly);
  const onWidthChange = useModelTableStore(
    (state) => state.tableOptions?.onWidthChange,
  );

  // useEffect( () => {
  //   setTimeout( () => {
  //     if (ref.current && columnOptions) {
  //       const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  //       const columnWidth = Object.values(columnOptions).reduce( 
  //         (prev, curr) => prev + (curr?.hidden ? 0 : (curr?.width || 200) + 2*rem), 
  //         0
  //       )
  //       const actionWidth = readOnly ? 0 : [onUpdate, onDelete].filter( val => val).length * 3*rem
  //       const diff = ref.current.scrollWidth - columnWidth - actionWidth;

  //       let mainColumn : [string, ColumnOptions|undefined];
  //       for (const column of Object.entries(columnOptions)) {
  //         console.log(column);
  //         if ([undefined, true].includes(column[1]?.resizable) === undefined && !column[1]?.hidden) {
  //           mainColumn = column;
  //           break;
  //         }
  //       }
  //       // console.log(mainColumn)

  //       // const first = Object.entries(columnOptions)[3];
  //       // if (first[1] && diff > 0) {
  //       //   first[1].width = ( first[1]?.width || 200 ) + diff 
  //       //   onWidthChange?.({ field: first[0], width : first[1]?.width })
  //       // }
  //     }
  //   }, 0)
  // }, [columnOptions, onDelete, onUpdate, onWidthChange, readOnly])

  return (
    <STableRow ref={ref} {...htmlProps}>
      <Slots slotKeys={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return <TableHead key={columnId} columnId={columnId}/>;
            })}
            {children}
          </>
        ) : (
          children
        )}
      </Slots>
    </STableRow>
  );
};
