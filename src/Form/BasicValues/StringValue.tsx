import type { ValueRenderFnProps } from '@/Form';

export const StringValue = ({ value }: ValueRenderFnProps) => {
  return <div className="h-full w-full text-start">{value}</div>;
};
