import type { ValueRenderFnProps } from '@/Form';

export const RawValue = ({ value }: ValueRenderFnProps) => {
  return <div className="h-full w-full text-start">{value}</div>;
};
