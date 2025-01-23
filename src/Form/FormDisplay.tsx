import type { HTMLProps, ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { useFormStore } from './useFormStore';

export interface FormDisplayProps {
  name: string;
  children: ReactNode;
}

export interface FormDisplayChildProps
  extends Omit<HTMLProps<HTMLElement>, 'ref'> {
  name?: string;
  value?: any;
}

export const FormDisplay = ({ name, children }: FormDisplayProps) => {
  // const value = useFormStore((state) => state.formState.defaultValues?.[name]);
  const getValues = useFormStore((state) => state.getValues);
  const slotProps = { name, value: getValues(name) };
  return <Slot {...slotProps}>{children}</Slot>;
};
