import { useStore } from '@tanstack/react-store';

import { Lens, DataLens } from '@/Lenses';
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
  // const conveyorStore = useConveyorStore();
  // const modelIndexStore = useModelIndexStore();
  // const models = useStore(conveyorStore, (state) => state.models);
  // const model = useStore(modelIndexStore, (state) => state.model);
  // const inputType = models[model]?.fields?.[field]?.update
  // const { data: { original } } = useForm();
  // const fieldData = original[field];
  // const displayData = typeof fieldData === 'object' ? JSON.stringify(fieldData) : fieldData;
  return (
    <TableCell columnId={field} {...props}>
      {/* {children === undefined ? inputType === undefined ? displayData : (
        <>
          <Lens lens={DataLens.DISPLAY}>{displayData}</Lens>
          <Lens lens={DataLens.EDITING}>
            <FormControl name={field}>
              <FormControl.Input type={inputType} />
            </FormControl>
          </Lens>
        </>
      ) : (
        children
      )} */}
    </TableCell>
  );
};
