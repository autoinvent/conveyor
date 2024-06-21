import type { ValueRenderFnProps } from '@/Form';

export const IdValue = ({ value }: ValueRenderFnProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center px-2.5 py-1.5 align-bottom text-cyan-600">
      {value}
    </div>
  );
};
