import type { ValueRenderFnProps } from '@/Form';

export const BooleanValue = ({ name, value }: ValueRenderFnProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center px-2.5 py-1.5">
      <input name={name} type="checkbox" checked={value} disabled={true} />
    </div>
  );
};
