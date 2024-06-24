import type { ComponentProps } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/lib/utils';

import { DEFAULT_TYPE, useConveyorStore } from '@/Conveyor';
import { FormError, FormInput, FormValue, useFormStore } from '@/Form';
import { Lens } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { Slot } from '@/Slots';
import { DataLens } from '@/types';
import { humanizeText } from '@/utils';

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
  const fieldError = useFormStore(
    (state) => state.formState.errors?.[fieldName],
  );
  const isLoading = useLoadingStore((state) => state.isLoading);
  const field = useModelFormStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );

  const inputFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field?.type ?? DEFAULT_TYPE]?.inputRenderFn ??
        state.typeOptions?.[DEFAULT_TYPE]?.inputRenderFn ??
        (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field?.type ?? DEFAULT_TYPE]?.valueRenderFn ??
        state.typeOptions?.[DEFAULT_TYPE]?.valueRenderFn ??
        (() => null),
    ),
  );

  if (field === undefined) {
    return null;
  }

  return (
    <Slot slotKey={fieldName}>
      <div className={cn('space-y-2', className)} {...htmlProps}>
        {children === undefined ? (
          <>
            <label
              htmlFor={fieldName}
              className={cn(
                fieldError && 'text-destructive',
                field.rules?.required && 'after:content-["*"]',
                'mr-2 whitespace-nowrap after:text-destructive',
              )}
            >
              {humanizeText(fieldName)}
            </label>
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
                      render={(props) =>
                        inputFn({
                          ...props,
                          disabled: isLoading,
                        })
                      }
                    />
                  </Lens>
                </>
              ) : (
                <FormValue name={field.name} render={valueFn} />
              )}
            </div>
            <p className="font-medium text-destructive text-sm">
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
