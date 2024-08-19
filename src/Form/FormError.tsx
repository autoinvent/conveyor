import type { ComponentProps } from 'react';
import { ErrorMessage } from '@hookform/error-message';

import { cn } from '@/lib/utils';

import { useFormStore } from './useFormStore';

export interface FormErrorProps
  extends Omit<ComponentProps<typeof ErrorMessage>, 'errors'> {
  className?: string;
}

export const FormError = ({ name, className, render }: FormErrorProps) => {
  const errors = useFormStore((state) => state.formState.errors);
  const id = useFormStore((state) => state.id);
  const formControlId = `${id}-${name}-form-control`;
  const formMessageId = `${formControlId}-message`;
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={
        render ??
        (({ messages }) => {
          return (
            <ul
              id={formMessageId}
              className={cn(
                'list-disc pl-3 font-medium text-destructive text-sm',
                className,
              )}
            >
              {messages &&
                Object.entries(messages).map(([type, message]) => (
                  <li key={type}>{message}</li>
                ))}
            </ul>
          );
        })
      }
    />
  );
};
