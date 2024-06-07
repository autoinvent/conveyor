import type { ReactNode } from 'react';

import { useFormStore } from './useFormStore';

export type ValueRenderFn = (value: any) => ReactNode;
export interface FormValueProps {
  name: string;
  render: ValueRenderFn;
}

export const FormValue = ({ name, render }: FormValueProps) => {
  const { getValues } = useFormStore();
  const value = getValues(name);
  return render(value);
};
