import type { ComponentProps } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Label } from '@/lib/components/ui/label';
import { cn } from '@/lib/utils';

import { useConveyorStore } from '@/Conveyor';
import { FormError, FormInput, FormValue, useFormStore } from '@/Form';
import { Lens } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { Slot } from '@/Slots';
import { DataLens, type ID, ScalarType } from '@/types';
import { humanizeText } from '@/utils';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormFieldProps extends ComponentProps<'div'> {
  field: string;
}

export const ModelFormField = ({
  field,
  children,
  className,
  ...htmlProps
}: ModelFormFieldProps) => {
  const dataId: ID = useModelFormStore((state) => state.data.id);
  const formFieldId = `${field}-${dataId}`;
  const formErrorMessageId = `${formFieldId}-error-message-${dataId}`;
  const fieldError = useFormStore((state) => state.formState.errors?.[field]);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const fieldLabel = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.label ?? humanizeText(field),
  );
  const fieldType = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.type ?? ScalarType.STRING,
  );
  const fieldEditable = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.editable ?? true,
  );
  const fieldRules = useModelFormStore(
    (state) => state.fieldOptions?.[field]?.rules,
  );
  const inputFn = useConveyorStore(
    useShallow(
      (state) => state.typeOptions?.[fieldType]?.inputRenderFn ?? (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) => state.typeOptions?.[fieldType]?.valueRenderFn ?? (() => null),
    ),
  );

  return (
    <Slot slotKey={field}>
      <div className={cn('m-2 ml-0 space-y-2', className)} {...htmlProps}>
        {children === undefined ? (
          <>
            <Label
              htmlFor={formFieldId}
              className={cn(
                !!fieldError && 'text-destructive',
                fieldRules?.required && 'after:content-["*"]',
                'mr-2 whitespace-nowrap after:text-destructive',
              )}
            >
              {fieldLabel}
            </Label>
            <div>
              {fieldEditable ? (
                <>
                  <Lens lens={DataLens.VALUE}>
                    <FormValue name={field} render={valueFn} />
                  </Lens>
                  <Lens lens={DataLens.INPUT}>
                    <FormInput
                      name={field}
                      rules={fieldRules}
                      render={({ inputProps, inputState, formState }) => {
                        const extraInputProps = Object.assign(inputProps, {
                          id: formFieldId,
                          disabled: isLoading,
                          required: !!fieldRules?.required,
                          'aria-describedby': !inputState?.invalid
                            ? `${formFieldId}`
                            : `${formFieldId} ${formErrorMessageId}`,
                          'aria-invalid': inputState?.invalid,
                        });
                        return inputFn({
                          inputProps: extraInputProps,
                          inputState,
                          formState,
                        });
                      }}
                    />
                  </Lens>
                </>
              ) : (
                <FormValue name={field} render={valueFn} />
              )}
            </div>
            <p
              id={formErrorMessageId}
              className="font-medium text-destructive text-sm"
            >
              <FormError name={field} />
            </p>
          </>
        ) : (
          children
        )}
      </div>
    </Slot>
  );
};
