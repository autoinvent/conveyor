import type { ComponentProps } from 'react';

import { Slots } from '@/Slots';
import { cn } from '@/lib/utils';

import { ModelFormField } from './ModelFormField';
import { useModelFormStore } from './useModelFormStore';

export interface ModelFormContentProps extends ComponentProps<'div'> {
  prefilled?: boolean;
}

export const ModelFormContent = ({
  prefilled,
  children,
  className,
  ...htmlProps
}: ModelFormContentProps) => {
  const fields = useModelFormStore((state) => state.fields);
  const data = useModelFormStore((state) => state.data);
  return (
    data && (
      <div className={cn('space-y-4', className)} {...htmlProps}>
        <Slots slotKeys={fields}>
          {children === undefined || prefilled ? (
            <>
              {fields.map((field) => (
                <ModelFormField key={field} field={field} />
              ))}
              {children}
            </>
          ) : (
            children
          )}
        </Slots>
      </div>
    )
  );
};
