import type { ReactNode } from 'react';

import { Slots } from '@/Slots';

import { useModelFormStore } from './useModelFormStore';
import { ModelFormField } from './ModelFormField';

export interface ModelFormContentProps {
  prefilled?: boolean;
  children?: ReactNode;
}

export const ModelFormContent = ({
  prefilled,
  children,
}: ModelFormContentProps) => {
  const fieldOrder = useModelFormStore((state) => state.fieldOrder);
  const fieldOptions = useModelFormStore((state) => state.fieldOptions);
  const formFields = [...fieldOrder].filter(
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
