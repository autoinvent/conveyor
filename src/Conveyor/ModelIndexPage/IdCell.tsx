import { useFormContext } from 'react-hook-form';
import { Link } from "@tanstack/react-router"

import { ModelIndex } from '@/ModelIndex';

export const IdCell = ({ model }: { model: string }) => {
  const fieldName = 'id'
  const { getValues } = useFormContext();
  const value = getValues(fieldName);

  return (
    <ModelIndex.Table.Cell fieldName={fieldName}>
      <Link to={`/${model}/${value}`} className="underline underline-offset-1 text-cyan-600">
        {value}
      </Link>
    </ModelIndex.Table.Cell>
  )
}