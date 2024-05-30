import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { ScalarTypes } from '@/enums';
import type { Field } from '@/types';

export interface ModelFormValueProps {
  field: Field;
  className?: string;
}

export const ModelFormValue = ({ field, className }: ModelFormValueProps) => {
  const { getValues } = useFormContext();
  const value = getValues(field.name);

  switch (field.type) {
    case ScalarTypes.STRING:
    case ScalarTypes.INT:
    case ScalarTypes.FLOAT:
      return (
        <span
          className={twMerge(
            'h-full w-full p-1.5 text-start align-baseline',
            className,
          )}
        >
          {value}
        </span>
      );
    case ScalarTypes.DATETIME:
      const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      return (
        <span
          className={twMerge(
            'h-full w-full p-1.5 text-start align-baseline',
            className,
          )}
        >
          {value ? f.format(new Date(value)) : 'none'}
        </span>
      );
    case ScalarTypes.BOOLEAN:
      return (
        <span
          className={twMerge(
            'h-full w-full align-baseline text-middle',
            className,
          )}
        >
          <input
            disabled={true}
            type="checkbox"
            className={className}
            checked={!!value}
          />
        </span>
      );
    default:
      return value?.id ? (
        <span className="h-full w-full p-1.5 text-start align-baseline">
          {value.id}
        </span>
      ) : (
        <span className="h-full w-full p-1.5 text-start align-baseline">
          none
        </span>
      );
  }
};
