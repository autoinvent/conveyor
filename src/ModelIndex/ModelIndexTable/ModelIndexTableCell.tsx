import { useData } from '@/Data';
import { Lens, DataLens, useLenses } from '@/Lenses';
import { TableCell, TableCellProps } from '@/Table';

export interface ModelIndexTableCellProps
  extends Omit<TableCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableCell = ({
  fieldName,
  children,
  ...props
}: ModelIndexTableCellProps) => {
  const { setLens } = useLenses();
  const { data, setCurrentData } = useData((state) => state.current);
  const fieldData = data[fieldName];
  const displayData =
    typeof fieldData === 'object' ? JSON.stringify(fieldData) : fieldData;
  return (
    <TableCell
      columnId={fieldName}
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
              onChange={(e) => setCurrentData(fieldName, e.target.value)}
            />
          </Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
