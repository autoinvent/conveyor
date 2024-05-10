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
    return <Link to={`./${value}`}>{value}</Link>;
  }
  switch (field.type) {
    case ScalarTypes.STRING:
    case ScalarTypes.INT:
    case ScalarTypes.FLOAT:
      return value;
    case ScalarTypes.DATETIME:
      const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      return f.format(new Date(value));
    case ScalarTypes.BOOLEAN:
      return (
        <input
          disabled={true}
          type="checkbox"
          className={className}
          checked={value}
        />
      );
    default:
      return value?.id ?? 'none';
  }
};
