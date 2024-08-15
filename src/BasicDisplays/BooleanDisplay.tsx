import { Checkbox } from '@/lib/components/ui/checkbox';

import type { FormDisplayChildProps } from '@/Form';

export const BooleanDisplay = ({ value }: FormDisplayChildProps) => {
  return (
    <div className="flex items-center">
      <Checkbox checked={value} value={value} disabled={true} />
    </div>
  );
};
