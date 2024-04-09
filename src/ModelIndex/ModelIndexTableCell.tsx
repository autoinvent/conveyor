import { ChangeEvent, useMemo } from 'react'
import { useStore } from '@tanstack/react-store';

import { useConveyorStore } from '@/Conveyor';
import { FlexibleInput } from '@/FlexibleInput';
import { useFormStore } from '@/Form';
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
  const { original, FormController } = useFormStore((state) => ({
    original: state.data.original,
    FormController: state.FormController
  }));
  const originalFieldData = original?.[field];
  const displayData =
    typeof originalFieldData === 'object' ? JSON.stringify(originalFieldData) : originalFieldData;
  // console.log(data.current)
  return (
    <TableCell columnId={field} id={id} className={className} style={style}>
      {children === undefined ? (
        <>
          <Lens lens={DataLens.DISPLAY}>{displayData}</Lens>
          <Lens lens={DataLens.EDITING}>
            <FormController
              name={field}
              children={(formField: any) => {
                const inputProps = useMemo(() => ({
                  name: formField.name,
                  value: formField.state.value,
                  onChange: (e: ChangeEvent<HTMLInputElement>) => formField.handleChange(e.target.value),
                  onBlur: formField.handleBlur,
                }), [formField.state.value])
                console.log('rendered', field, formField.state.value)
                return (
                  // <input type="text" value={formField.state.value ?? ''}
                  //   onChange={(e: any) => formField.handleChange(e.target.value)} />
                  <FlexibleInput
                    type={models[model]?.fields?.[field]?.update ?? ''}
                    inputProps={inputProps}
                  />
                )
              }}
            />
          </Lens>
        </>
      ) : (
        children
      )}
    </TableCell>
  );
};
