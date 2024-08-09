import type { ComponentProps, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { useFormStore } from './useFormStore';
import { useController, type UseControllerProps } from 'react-hook-form';

export interface FormControlProps extends Omit<UseControllerProps, 'control'> {
  children: ReactNode;
}

export const FormControl = ({ name, ...controllerProps }: FormControlProps) => {
  const id = useFormStore((state) => state.id);
  const control = useFormStore((state) => state.control);
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control, ...controllerProps });
  const formControlId = `${id}-${name}-form-control`;
  const formDescriptionId = `${formControlId}-description`;
  const formMessageId = `${formControlId}-message`;

  return (
    <Slot
      id={formControlId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...{ ...field }}
    />
  );
};
