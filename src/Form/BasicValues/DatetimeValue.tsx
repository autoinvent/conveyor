import type { ValueRenderFnProps } from '@/Form';

export const DatetimeValue = ({ value }: ValueRenderFnProps) => {
  return (
    <div className="h-full w-full text-center">
      {value ? new Date(value).toLocaleString() : 'N/A'}
    </div>
  );
};
