import { Checkbox } from '@/lib/components/ui/checkbox';

import type { ValueRenderFnProps } from '@/Form';

export const BooleanValue = ({ value }: ValueRenderFnProps) => {
  return (
    <div className="flex items-center">
      <Checkbox checked={value} value={value} disabled={true} />
    </div>
  );
};
