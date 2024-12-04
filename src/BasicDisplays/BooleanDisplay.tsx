import type { FormDisplayChildProps } from '@/Form';
import { Checkbox } from '@/lib/components/ui/checkbox';

export const BooleanDisplay = ({ value, ...props }: FormDisplayChildProps) => {
  return (
    <div className="flex items-center" {...props}>
      <Checkbox checked={value} value={value ?? ''} disabled={true} />
    </div>
  );
};
