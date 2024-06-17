import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { useShallow } from 'zustand/react/shallow';

import { Slots } from '@/Slots';
import type { DataType } from '@/types';

import type { ModelFormState } from './ModelFormStoreContext';
import { useModelFormStore } from './useModelFormStore';
import { ModelFormField } from './ModelFormField';

export interface ModelFormContentProps extends ComponentProps<'div'> {
  prefilled?: boolean;
}

export const ModelFormContent = ({
  prefilled,
  className,
  children,
  ...htmlProps
}: ModelFormContentProps) => {
  const fieldNames = useModelFormStore(
    useShallow<ModelFormState<DataType>, string[]>((state) =>
      state.fields.map((field) => field.name),
    ),
  );
  return (
    <div className={twMerge('flex flex-wrap', className)} {...htmlProps}>
      <Slots slotKeys={fieldNames}>
        {children === undefined || prefilled ? (
          <>
            {fieldNames.map((fieldName) => (
              <ModelFormField key={fieldName} fieldName={fieldName} />
            ))}
            {children}
          </>
        ) : (
          children
        )}
      </Slots>
    </div>
  );
};
