import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slots } from '@/Slots';
import type { Field } from '@/types';

import { ModelFormField } from './ModelFormField';
import { useModelForm } from './useModelForm';

export interface ModelFormContentProps extends ComponentProps<'div'> {
  prefilled?: boolean;
}

export const ModelFormContent = Object.assign(
  ({ prefilled, children, className, ...props }: ModelFormContentProps) => {
    const { selected: fields } = useModelForm((state) => state.fields);
    const fieldNames: string[] = fields.map((field: Field) => field.name);
    return (
      <div className={twMerge('flex flex-wrap', className)} {...props}>
        <Slots slotOrder={fieldNames}>
          {children === undefined || prefilled ? (
            <>
              {fieldNames.map((fieldName) => {
                return <ModelFormField key={fieldName} fieldName={fieldName} />;
              })}
            </>
          ) : (
            children
          )}
        </Slots>
      </div>
    );
  },
  {
    Field: ModelFormField,
  },
);
