import { Lenses, DataLens } from '@/Lenses';
import { TableRow, TableRowProps } from '@/Table';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { useModelIndex } from './useModelIndex';
import { ACTION_SLOT } from './constants';

export interface ModelIndexTableRowProps extends TableRowProps {}

export const ModelIndexTableRow = ({
  prefilled,
  children,
  id,
  className,
  style,
}: ModelIndexTableRowProps) => {
  const { selected: fields } = useModelIndex((state) => state.fields)
  return (
    <Lenses activeLens={DataLens.DISPLAY}>
      <TableRow prefilled={false} id={id} className={className} style={style}>
        {children === undefined || prefilled ? (
          <>
            {fields.map((field: string) => {
              if (field === ACTION_SLOT) return <ModelIndexTableActionCell />
              return <ModelIndexTableCell key={field} field={field} />;
            })}
            {children}
          </>
        ) : (
          children
        )}
      </TableRow>
    </Lenses>
  );
};
