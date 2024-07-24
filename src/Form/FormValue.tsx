import type { ReactNode } from 'react';

import { useFormStore } from './useFormStore';

export interface ValueRenderFnProps {
  name?: string;
  value: any;
}
export type ValueRenderFn = (props: ValueRenderFnProps) => ReactNode;

export interface FormValueProps {
  name: string;
  render: ValueRenderFn;
}

export const FormValue = ({ name, render }: FormValueProps) => {
  const { getValues } = useFormStore();
  const value = getValues(name);
  return render({ name, value });
};
