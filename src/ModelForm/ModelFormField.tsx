import { Slot } from "@/Slots"
import { Field } from "@/types";

import { ModelFormInput } from "./ModelFormInput"
import { useModelForm } from "./useModelForm";

export interface ModelFormFieldProps {
  fieldName: string
}

export const ModelFormField = ({ fieldName }: ModelFormFieldProps) => {
  const { selected: { fields, onOpenFieldSelect } } = useModelForm((state) => ({ fields: state.fields, onOpenFieldSelect: state.onOpenFieldSelect }))

  return (
    <Slot slot={fieldName}>
      <label
        key={fieldName}
        className="flex min-w-[300px] w-1/2 rounded-md border border-[--border-color] my-6"
      >
        <span className="bg-[--fg-color] py-1.5 px-3 w-[200px] border border-transparent text-center rounded-l-md">
          {fieldName}
        </span>
        <ModelFormInput
          field={
            fields.find(
              (field: Field) => field.name === fieldName,
            ) as Field
          }
          onOpenFieldSelect={onOpenFieldSelect}
          className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md"
        />
      </label>
    </Slot>
  )
}