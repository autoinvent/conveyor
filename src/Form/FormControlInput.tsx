import { FlexibleInput, FlexibleInputProps } from "@/FlexibleInput";

import { useFormControl } from "./useFormControl";


export interface FormControlInputProps extends FlexibleInputProps { }

export const FormControlInput = ({ type, inputProps }: FormControlInputProps) => {
    const { formControlId, name, value, onBlur, onChange } = useFormControl()
    const defaultInputProps = {
        id: formControlId,
        name,
        value,
        onBlur,
        onChange
    }
    return (
        <FlexibleInput type={type} inputProps={Object.assign(defaultInputProps, inputProps)} />
    )
}