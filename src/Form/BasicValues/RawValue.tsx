import type { ValueRenderFnProps } from '@/Form';

export const RawValue = ({ value }: ValueRenderFnProps) => {
  return (
    <div className="flex h-full w-full items-center px-2.5 py-1.5">{value}</div>
  );
};
