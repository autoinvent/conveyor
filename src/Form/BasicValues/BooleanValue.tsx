import type { ValueRenderFnProps } from '@/Form';

export const BooleanValue = ({ name, value }: ValueRenderFnProps) => {
  return (
    <div className="h-full w-full text-center">
      <input name={name} type="checkbox" checked={value} disabled={true} />
    </div>
  );
};
