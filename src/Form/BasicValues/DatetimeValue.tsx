import type { ValueRenderFnProps } from '@/Form';

export const DatetimeValue = ({ value }: ValueRenderFnProps) => {
  return value ? new Date(value).toLocaleString() : 'N/A';
};
