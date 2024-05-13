import { useFormContext } from 'react-hook-form';
import { Link } from "@tanstack/react-router"

import { ModelFormValue, ModelFormInput } from '@/ModelForm';
import { Lens, DataLens } from '@/Lenses'
import { ModelIndex, useModelIndex } from '@/ModelIndex';
import { Field } from '@/types'

export const RelationshipCell = ({ field }: { field: Field }) => {
  const fieldName = field.name
  const { getValues } = useFormContext();
  const { selected } = useModelIndex((state) => ({
    onOpenFieldSelect: state.onOpenFieldSelect,
  }));
  const value = getValues(fieldName);

  return (
    <ModelIndex.Table.Cell fieldName={fieldName}>
      <Lens lens={DataLens.DISPLAY}>
        {
          value?.id ? (
            <Link to={`/${field.type}/${value.id}`}>
              <span className="underline underline-offset-1 text-cyan-600 h-full w-full p-1.5 text-start align-baseline">
                {value.id}
              </span>
            </Link>
          ) : <span className="h-full w-full p-1.5 text-start align-baseline">none</span>
        }
      </Lens>
      <Lens lens={DataLens.EDITING}>
        {field.editable ? (
          <ModelFormInput
            field={field}
            onOpenFieldSelect={selected.onOpenFieldSelect}
          />
        ) : (
          <ModelFormValue field={field} />
        )}
      </Lens>
    </ModelIndex.Table.Cell>
  )
}