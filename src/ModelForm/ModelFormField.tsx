import type { ComponentProps } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { DEFAULT_TYPE, useConveyorStore } from '@/Conveyor';
import { FormError, FormInput, FormValue } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { Slot } from '@/Slots';
import { DataLens } from '@/types';
import { humanizeText } from '@/utils';

import { twMerge } from 'tailwind-merge';
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
  const isLoading = useLoadingStore((state) => state.isLoading);
  const activeLens = useLensesStore((state) => state.activeLens);
  const field = useModelFormStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );

  if (field === undefined) {
    return null;
  }
  const inputFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field.type]?.inputRenderFn ??
        state.typeOptions?.[DEFAULT_TYPE]?.inputRenderFn ??
        (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) =>
        state.typeOptions?.[field.type]?.valueRenderFn ??
        state.typeOptions?.[DEFAULT_TYPE]?.valueRenderFn ??
        (() => null),
    ),
  );

  return (
    <Slot slotKey={fieldName}>
      <div
        className={twMerge('my-2 flex basis-1/2 flex-col pr-2', className)}
        {...htmlProps}
      >
        {children === undefined ? (
          <>
            <div className="flex h-full divide-x divide-[--border-color] rounded border border-[--border-color]">
              <label
                htmlFor={fieldName}
                className="whitespace-nowrap bg-[--fg-accent] p-2"
              >
                {humanizeText(fieldName)}
                {field.rules?.required && (
                  <span className="text-[--danger]">{' *'}</span>
                )}
              </label>
              <span className="h-full w-full bg-[--fg-color]">
                <Lens lens={!field.editable ? activeLens : DataLens.VALUE}>
                  <FormValue name={field.name} render={valueFn} />
                </Lens>
                <Lens lens={!field.editable ? false : DataLens.INPUT}>
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
              </span>
            </div>
            <span className="text-[--danger]">
              <FormError name={fieldName} />
            </span>
          </>
        ) : (
          children
        )}
      </div>
    </Slot>
  );
};
