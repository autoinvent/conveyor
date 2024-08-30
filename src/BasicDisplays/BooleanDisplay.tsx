import { Checkbox } from '@/lib/components/ui/checkbox';

import type { FormDisplayChildProps } from '@/Form';

export const BooleanDisplay = ({ value, ...props }: FormDisplayChildProps) => {
  return (
    <div className="flex items-center" {...props}>
      <Checkbox checked={value} value={value} disabled={true} />
    </div>
  );
};
