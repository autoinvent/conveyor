import { CommonProps, WrapperProp } from "@/types";
import { humanizeText } from "@/utils";

import { useFormControl } from "./useFormControl";


export interface FormControlLableProps extends CommonProps, WrapperProp {
    htmlFor: string
}

export const FormControlLabel = ({ htmlFor, children, id, className, style }: FormControlLableProps) => {
    const { name, formControlId } = useFormControl()
    return (
        <label htmlFor={htmlFor ?? formControlId} id={id} className={className} style={style}>
            {children === undefined ? humanizeText(name) : children}
        </label>
    )
}