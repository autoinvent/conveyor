import type { ComponentProps, ReactNode } from 'react';

import { useConveyorStore } from '@/Conveyor';
import { FormControl, FormDisplay, FormError, FormLabel } from '@/Form';
import { Lens } from '@/Lenses';
import { Slot } from '@/Slots';
import { cn } from '@/lib/utils';
import { DataLens, ScalarType } from '@/types';
import { humanizeText } from '@/utils';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormFieldProps extends ComponentProps<'div'> {
  field: string;
  children?: ReactNode;
}

export const ModelFormField = ({
  field,
  children,
  className,
  ...divProps
}: ModelFormFieldProps) => {
  const label = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.label ?? humanizeText(field),
  );
  const type = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.type ?? ScalarType.STRING,
  );
  const editable = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.editable ?? true,
  );
  const rules = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.rules,
  );
  const required = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.required,
  );
  const valueOptions = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.valueOptions ?? [],
  );
  const inputProps = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.inputProps,
  );
  const displayProps = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.displayProps,
  );
  const DisplayComponent = useConveyorStore(
    (state) => state.typeOptions?.[type]?.DisplayComponent ?? (() => null),
  );
  const InputComponent = useConveyorStore(
    (state) => state.typeOptions?.[type]?.InputComponent ?? (() => null),
  );

  return (
    <Slot slotKey={field}>
      <div className={cn('flex flex-col space-y-2', className)} {...divProps}>
        {children === undefined ? (
          <>
            <FormLabel name={field} required={required}>
              {label}
            </FormLabel>
            {editable ? (
              <>
                <Lens lens={DataLens.DISPLAY}>
                  <FormDisplay name={field}>
                    <DisplayComponent {...displayProps} />
                  </FormDisplay>
                </Lens>
                <Lens lens={DataLens.INPUT}>
                  <FormControl
                    name={field}
                    selectoptions={valueOptions}
                    rules={{
                      required: required && `${label} is required.`,
                      ...rules,
                    }}
                  >
                    <InputComponent {...inputProps} />
                  </FormControl>
                  <FormError name={field} />
                </Lens>
              </>
            ) : (
              <FormDisplay name={field}>
                <DisplayComponent {...displayProps} />
              </FormDisplay>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </Slot>
  );
};
