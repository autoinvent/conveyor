import { Lenses, DataLens } from '@/Lenses';
import { TableRow, TableRowProps } from '@/Table';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { useModelIndex } from './useModelIndex';

export interface ModelIndexTableRowProps extends TableRowProps {}

export const ModelIndexTableRow = ({
  prefilled,
  children,
  id,
  className,
  style,
}: ModelIndexTableRowProps) => {
  const { selected } = useModelIndex((state) => ({
    fields: state.fields,
    showActions: state.showActions,
  }));
  const fields: string[] = selected.fields;
  const showActions: boolean = selected.showActions;
  return (
    <Lenses activeLens={DataLens.DISPLAY}>
      <TableRow prefilled={false} id={id} className={className} style={style}>
        {children === undefined || prefilled ? (
          <>
            {fields.map((field) => {
              return <ModelIndexTableCell key={field} field={field} />;
            })}
            {children}
          </>
        ) : (
          children
        )}
        {showActions ? <ModelIndexTableActionCell /> : null}
      </TableRow>
    </Lenses>
  );
};
