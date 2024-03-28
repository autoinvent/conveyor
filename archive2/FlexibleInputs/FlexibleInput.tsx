import { ReactNode } from 'react';

import { Lens } from '@/Lenses';
import { Slot } from '@/Slots';

export interface FlexibleInputProps {
  valueType: string;
  children: ReactNode;
}

export const FlexibleInput = ({ valueType, children }: FlexibleInputProps) => {
  return (
    <Slot slotKey={valueType}>
      <Lens lens={valueType}>{children}</Lens>
    </Slot>
  );
};
