import type { ValueRenderFnProps } from '@/Form';

export const DefaultValue = ({ value }: ValueRenderFnProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center px-2.5 py-1.5">
      {JSON.stringify(value)}
    </div>
  );
};
