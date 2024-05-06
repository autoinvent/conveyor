import { useData } from '@/Data';
import { Lens, DataLens, useLenses } from '@/Lenses';
import { TableCell, TableCellProps } from '@/Table';

export interface ModelIndexTableCellProps
  extends Omit<TableCellProps, 'columnId'> {
  field: string;
}

export const ModelIndexTableCell = ({
  field,
  children,
  ...props
}: ModelIndexTableCellProps) => {
  const { setLens } = useLenses();
  const { data, setCurrentData } = useData((state) => state.current);
  const fieldData = data[field];
  const displayData =
    typeof fieldData === 'object' ? JSON.stringify(fieldData) : fieldData;
  return (
    <TableCell
      columnId={field}
      {...props}
      onDoubleClick={() => setLens(DataLens.EDITING)}
    >
      {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>{displayData}</Lens>
          <Lens lens={DataLens.EDITING}>
            <input
              className="w-full bg-[--bg-accent]"
              value={displayData}
              onChange={(e) => setCurrentData(field, e.target.value)}
            />
          </Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
