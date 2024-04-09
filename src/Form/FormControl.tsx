import { useMemo } from "react";
import { FieldComponent } from "@tanstack/react-form";
import { Store } from "@tanstack/react-store";

import { DataType, WrapperProp } from "@/types";
import { generateUID } from "@/utils";

import { FormControlLabel } from "./FormControlLabel";
import { FormControlInput } from "./FormControlInput";
import { FormControlStore, FormControlStoreContext } from "./FormControlStoreContext";
import { useFormStore } from "./useFormStore";


export interface FormInputControlProps extends WrapperProp {
    name: string
    validators?: Record<string, any>
}

export const FormControl = Object.assign(({ name, validators, children }: FormInputControlProps) => {
    const Field: FieldComponent<DataType> = useFormStore((state) => state.Field)
    return (
        <Field
            name={name}
            validators={validators}
            children={
                (field) => {
                    const formControlStore = useMemo(() => new Store<FormControlStore>({ ...field, formControlId: generateUID({ prefix: name }) }), [field.state.value]);
                    return (
                        <FormControlStoreContext.Provider value={formControlStore}>
                            {children}
                        </FormControlStoreContext.Provider>
                    )
                }
            }
        />
    )
},
    {
        Label: FormControlLabel,
        Input: FormControlInput
    })