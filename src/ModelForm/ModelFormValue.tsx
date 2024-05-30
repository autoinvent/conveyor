import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Field } from '@/types';

export type ValueRenderFn = (value: any) => ReactNode;
export interface ModelFormValueProps {
  field: Field;
  render: ValueRenderFn;
}

export const ModelFormValue = ({ field, render }: ModelFormValueProps) => {
  const { getValues } = useFormContext();
  const value = getValues(field.name);
  return render(value);
};
