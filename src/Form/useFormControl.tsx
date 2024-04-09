import { ChangeEvent } from 'react'

import { useFormControlStore } from "./useFormControlStore"

export const useFormControl = () => {
    const field = useFormControlStore((state) => state)
    return {
        formControlId: field.formControlId,
        name: field.name,
        value: field.state.value,
        onChange: (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value),
        onBlur: field.handleBlur,
    }
}