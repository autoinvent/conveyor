import { type ComponentProps, useId } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Label } from '@/lib/components/ui/label';
import { cn } from '@/lib/utils';

import { useConveyorStore } from '@/Conveyor';
import { FormError, FormInput, FormValue, useFormStore } from '@/Form';
import { Lens } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { Slot } from '@/Slots';
import { DataLens, type DataType, type Field, FieldTypes } from '@/types';
import { humanizeText } from '@/utils';

import type { ModelFormState } from './ModelFormStoreContext';
import { useModelFormStore } from './useModelFormStore';

export interface ModelFormFieldProps extends ComponentProps<'div'> {
  fieldName: string;
}

export const ModelFormField = ({
  fieldName,
  children,
  className,
  ...htmlProps
}: ModelFormFieldProps) => {
  const refId = useId();
  const formFieldId = `${fieldName}-${refId}`;
  const formErrorMessageId = `${formFieldId}-error-message-${refId}`;
  const fieldError = useFormStore(
    (state) => state.formState.errors?.[fieldName],
  );
  const isLoading = useLoadingStore((state) => state.isLoading);
  const field = useModelFormStore(
    useShallow<ModelFormState<DataType>, Field>(
      (state) =>
        state.fields.find((field) => field.name === fieldName) ?? {
          name: fieldName,
          type: FieldTypes.DEFAULT,
        },
    ),
  );
  const inputFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field.type]?.inputRenderFn ??
        state.typeOptions?.[FieldTypes.DEFAULT]?.inputRenderFn ??
        (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field.type]?.valueRenderFn ??
        state.typeOptions?.[FieldTypes.DEFAULT]?.valueRenderFn ??
        (() => null),
    ),
  );

  if (field === undefined) {
    return null;
  }

  return (
    <Slot slotKey={fieldName}>
      <div className={cn('m-2 ml-0 space-y-2', className)} {...htmlProps}>
        {children === undefined ? (
          <>
            <Label
              htmlFor={formFieldId}
              className={cn(
                !!fieldError && 'text-destructive',
                field.rules?.required && 'after:content-["*"]',
                'mr-2 whitespace-nowrap after:text-destructive',
              )}
            >
              {humanizeText(fieldName)}
            </Label>
            <div>
              {field.editable ? (
                <>
                  <Lens lens={DataLens.VALUE}>
                    <FormValue name={field.name} render={valueFn} />
                  </Lens>
                  <Lens lens={DataLens.INPUT}>
                    <FormInput
                      name={field.name}
                      rules={field.rules}
                      render={({ inputProps, inputState, formState }) => {
                        const extraInputProps = Object.assign(inputProps, {
                          id: formFieldId,
                          disabled: isLoading,
                          required: !!field.rules?.required,
                          'aria-describedby': !inputState.invalid
                            ? `${formFieldId}`
                            : `${formFieldId} ${formErrorMessageId}`,
                          'aria-invalid': inputState.invalid,
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
                <FormValue name={field.name} render={valueFn} />
              )}
            </div>
            <p
              id={formErrorMessageId}
              className="font-medium text-destructive text-sm"
            >
              <FormError name={fieldName} />
            </p>
          </>
        ) : (
          children
        )}
      </div>
    </Slot>
  );
};
