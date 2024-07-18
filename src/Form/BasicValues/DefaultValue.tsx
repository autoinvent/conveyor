import type { ValueRenderFnProps } from '@/Form';

export const DefaultValue = ({ value }: ValueRenderFnProps) => {
  return <div className="min-w-64 py-2">{JSON.stringify(value)}</div>;
};
