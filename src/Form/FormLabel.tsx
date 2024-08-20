import type { ComponentProps } from 'react';

import { Label } from '@/lib/components/ui/label';
import { humanizeText } from '@/utils';
import { cn } from '@/lib/utils';

import { useFormStore } from './useFormStore';

export interface FormLabelProps extends ComponentProps<typeof Label> {
  name: string;
}

export const FormLabel = ({
  name,
  className,
  children,
  ...labelProps
}: FormLabelProps) => {
  const id = useFormStore((state) => state.id);
  const formControlId = `${id}-${name}-form-control`;

  const errors = useFormStore((state) => state.formState.errors?.[name]);
  return (
    <Label
      className={cn(errors && 'text-destructive', className)}
      htmlFor={formControlId}
      {...labelProps}
    >
      {children === undefined ? humanizeText(name) : children}
    </Label>
  );
};
