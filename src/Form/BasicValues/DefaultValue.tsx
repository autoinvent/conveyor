import type { ValueRenderFnProps } from '@/Form';

export const DefaultValue = ({ value }: ValueRenderFnProps) => {
  return JSON.stringify(value);
};
