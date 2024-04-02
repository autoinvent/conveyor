import { Lens, DataLens } from '@/Lenses';
import { TableCell } from '@/Table';
import { CommonProps, WrapperProp } from '@/types';

export interface ModelIndexTableCellProps extends CommonProps, WrapperProp {
  field: string;
}

export const ModelIndexTableCell = ({
  field,
  children,
  id,
  className,
  style,
}: ModelIndexTableCellProps) => {
  return (
    <TableCell columnId={field} id={id} className={className} style={style}>
      {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>display</Lens>
          <Lens lens={DataLens.EDITING}>editing</Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
