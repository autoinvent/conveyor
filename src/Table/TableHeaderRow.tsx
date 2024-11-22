import { useEffect, useRef, type ComponentProps } from 'react';

import { Slots } from '@/Slots';
import { TableRow as STableRow } from '@/lib/components/ui/table';

import { TableHead } from './TableHead';
import { useTableStore } from './useTableStore';
import { useModelTableStore } from '@/ModelTable';

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

  useEffect( () => {
    setTimeout( () => {
      if (ref.current && columnOptions) {
        const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
        const columnWidth = Object.values(columnOptions).reduce( 
          (prev, curr) => prev + (curr?.hidden ? 0 : (curr?.width || 200) + 2*rem), 
          0
        )
        const actionWidth = [onUpdate, onDelete].filter( val => val).length * 3*rem
        const diff = ref.current.scrollWidth - columnWidth - actionWidth;

        const first = Object.values(columnOptions)[3];
        if (first && diff > 0) {
          first.width = ( first?.width || 200 ) + diff 
        }
        console.log(columnOptions, first)
      }
    }, 0)
  }, [columnOptions, onDelete, onUpdate])

  return (
    <STableRow ref={ref} {...htmlProps}>
      <Slots slotKeys={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return <TableHead key={columnId} columnId={columnId} />;
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
