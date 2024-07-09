import type { ValueRenderFnProps } from '@/Form';

export const DefaultValue = ({ value }: ValueRenderFnProps) => {
  return <div className="p-2">{JSON.stringify(value)}</div>;
};
