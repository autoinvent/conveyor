import type { ComponentProps, ReactNode } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

import { useFormStore } from './useFormStore';

export interface FormErrorProps
  extends Omit<ComponentProps<typeof ErrorMessage>, 'errors' | 'render'> {
  className?: string;
  children?: ReactNode;
}

export const FormError = ({ name, className, children }: FormErrorProps) => {
  const errors = useFormStore((state) => state.formState.errors);
  const id = useFormStore((state) => state.id);
  const formControlId = `${id}-${name}-form-control`;
  const formMessageId = `${formControlId}-message`;
  const combinedClassName = cn(
    'list-disc pl-5 font-medium text-destructive text-sm',
    className,
  );
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ messages }) => {
        const slotProps = {
          messages,
          id: formMessageId,
          name,
          className: combinedClassName,
        };
        return children === undefined ? (
          <ul id={formMessageId} className={combinedClassName}>
            {messages &&
              Object.entries(messages).map(([type, message]) => (
                <li key={type}>{message}</li>
              ))}
          </ul>
        ) : (
          <Slot {...slotProps}>{children}</Slot>
        );
      }}
    />
  );
};
