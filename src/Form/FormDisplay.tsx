import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { useFormStore } from './useFormStore';

export interface FormDisplayProps {
  name: string;
  children: ReactNode;
}

export interface FormDisplayChildProps {
  name?: string;
  value?: any;
}

export const FormDisplay = ({ name, children }: FormDisplayProps) => {
  const value = useFormStore((state) => state.formState.defaultValues?.[name]);
  const slotProps = { name, value };
  return <Slot {...slotProps}>{children}</Slot>;
};
