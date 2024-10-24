import type { ReactNode } from 'react';

import { Slots } from '@/Slots';

import { ModelFormField } from './ModelFormField';
import { useModelFormStore } from './useModelFormStore';

export interface ModelFormContentProps {
  prefilled?: boolean;
  children?: ReactNode;
}

export const ModelFormContent = ({
  prefilled,
  children,
}: ModelFormContentProps) => {
  const fields = useModelFormStore((state) => state.fields);
  const fieldOptions = useModelFormStore((state) => state.fieldOptions);
  const formFields = [...fields].filter(
    (field) => !fieldOptions?.[field]?.hidden,
  );
  return (
    <Slots slotKeys={formFields}>
      {children === undefined || prefilled ? (
        <>
          {formFields.map((field) => {
            return <ModelFormField key={field} field={field} />;
          })}
        </>
      ) : (
        children
      )}
    </Slots>
  );
};
