import type { ValueRenderFnProps } from '@/Form';

export const DatetimeValue = ({ value }: ValueRenderFnProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center px-2.5 py-1.5">
      {value ? new Date(value).toLocaleString() : 'N/A'}
    </div>
  );
};
