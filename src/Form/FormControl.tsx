import type { HTMLProps, PropsWithoutRef, ReactNode } from 'react';

import {
  type ControllerRenderProps,
  type UseControllerProps,
  useController,
} from 'react-hook-form';

import { Slot } from '@radix-ui/react-slot';

import { useFormStore } from './useFormStore';

export interface FormControlProps extends Omit<UseControllerProps, 'control'> {
  children: ReactNode;
}

export interface FormControlChildProps
  extends Partial<PropsWithoutRef<ControllerRenderProps>>,
    Omit<HTMLProps<HTMLElement>, keyof ControllerRenderProps | 'type'> {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-disabled'?: boolean;
}

export const FormControl = ({
  name,
  children,
  ...controllerProps
}: FormControlProps) => {
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
  const slotProps = {
    ...field,
    disabled: isSubmitting,
  };
  return (
    <Slot
      id={formControlId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      aria-disabled={isSubmitting}
      {...slotProps}
    >
      {children}
    </Slot>
  );
};
