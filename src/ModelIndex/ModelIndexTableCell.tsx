import { useStore } from '@tanstack/react-store';

import { useConveyorStore } from '@/Conveyor';
import { FormControl, useForm } from '@/Form';
import { Lens, DataLens } from '@/Lenses';
import { TableCell } from '@/Table';
import { CommonProps, WrapperProp } from '@/types';

import { useModelIndexStore } from './useModelIndexStore';

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
  const conveyorStore = useConveyorStore();
  const modelIndexStore = useModelIndexStore();
  const models = useStore(conveyorStore, (state) => state.models);
  const model = useStore(modelIndexStore, (state) => state.model);
  const inputType = models[model]?.fields?.[field]?.update
  const { data: { original } } = useForm();
  const fieldData = original[field];
  const displayData = typeof fieldData === 'object' ? JSON.stringify(fieldData) : fieldData;
  return (
    <TableCell columnId={field} id={id} className={className} style={style}>
      {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>{displayData}</Lens>
          {inputType !== undefined ?
            <Lens lens={DataLens.EDITING}>
              <FormControl name={field}>
                <FormControl.Input
                  type={inputType}
                />
              </FormControl>
            </Lens>
            : null}
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
