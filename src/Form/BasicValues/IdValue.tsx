import type { ValueRenderFnProps } from '@/Form';

export const IdValue = ({ value }: ValueRenderFnProps) => {
  return <div className="h-full w-full text-center text-cyan-600">{value}</div>;
};
