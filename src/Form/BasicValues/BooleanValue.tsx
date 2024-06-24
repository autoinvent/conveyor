import { Checkbox } from '@/lib/components/ui/checkbox';

import type { ValueRenderFnProps } from '@/Form';

export const BooleanValue = ({ name, value }: ValueRenderFnProps) => {
  return (
    <div className="text-center">
      <Checkbox name="name" checked={value} value={value} disabled={true} />
    </div>
  );
};
