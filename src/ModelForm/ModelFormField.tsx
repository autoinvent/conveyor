import type { ReactNode } from 'react';

import { useConveyorStore } from '@/Conveyor';
import { FormControl, FormDisplay, FormError } from '@/Form';
import { Lens } from '@/Lenses';
import { Slot } from '@/Slots';
import { DataLens, ScalarType } from '@/types';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormFieldProps {
  field: string;
  children?: ReactNode;
}

export const ModelFormField = ({ field, children }: ModelFormFieldProps) => {
  const type = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.type ?? ScalarType.STRING,
  );
  const editable = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.editable ?? true,
  );
  const rules = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.rules,
  );
  const valueOptions = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.valueOptions ?? [],
  );
  const DisplayComponent = useConveyorStore(
    (state) => state.typeOptions?.[type]?.DisplayComponent ?? (() => null),
  );
  const InputComponent = useConveyorStore(
    (state) => state.typeOptions?.[type]?.InputComponent ?? (() => null),
  );
  return (
    <Slot slotKey={field}>
      {children === undefined ? (
        editable ? (
          <>
            <Lens lens={DataLens.DISPLAY}>
              <FormDisplay name={field}>
                <DisplayComponent />
              </FormDisplay>
            </Lens>
            <Lens lens={DataLens.INPUT}>
              <FormControl name={field} options={valueOptions} rules={rules}>
                <InputComponent />
              </FormControl>
              <FormError name={field} />
            </Lens>
          </>
        ) : (
          <FormDisplay name={field}>
            <DisplayComponent />
          </FormDisplay>
        )
      ) : (
        children
      )}
    </Slot>
  );
};
