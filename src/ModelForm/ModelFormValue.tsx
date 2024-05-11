import { useFormContext } from 'react-hook-form';
import { Link } from '@tanstack/react-router';

import { ScalarTypes } from '@/enums';
import { Field } from '@/types';

export interface ModelFormValueProps {
  field: Field;
  className?: string;
}

export const ModelFormValue = ({ field, className }: ModelFormValueProps) => {
  const { getValues } = useFormContext();
  const value = getValues(field.name);

  if (field.name === 'id') {
    return <Link className='text-cyan-600 underline underline-offset-1 h-full w-full p-1.5 text-start align-baseline' to={`./${value}`}>{value}</Link>;
  }
  switch (field.type) {
    case ScalarTypes.STRING:
    case ScalarTypes.INT:
    case ScalarTypes.FLOAT:
      return <span className='h-full w-full p-1.5 text-start align-baseline'>{value}</span>;
    case ScalarTypes.DATETIME:
      const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      return <span className='h-full w-full p-1.5 text-start align-baseline'>{f.format(new Date(value))}</span>
    case ScalarTypes.BOOLEAN:
      return (
        <span className='h-full w-full text-middle align-baseline'>
        <input
          disabled={true}
          type="checkbox"
          className={className}
          checked={value}
        />
        </span>
      );
    default:
      return <span className='h-full w-full p-1.5 text-cyan-600 text-start align-baseline'>{value?.id ?? 'none'}</span>;
  }
};
