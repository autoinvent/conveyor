import { useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';
import { useForm } from "@tanstack/react-form"

import { useIsFirstRender } from '@/hooks';
import { DataType, WrapperProp } from "@/types"

import { FormStoreContext, FormStore } from './FormStoreContext'

export interface FormProps extends WrapperProp {
    defaultValues: DataType
}

export const FormProvider = ({ defaultValues, children }: FormProps) => {
    const isFirstRender = useIsFirstRender();
    const form = useForm<DataType>({
        defaultValues,
        onSubmit: (e) => {
            console.log(e)
        }
    })
    const [formStore] = useState(new Store<FormStore>(form));

    useEffect(() => {
        if (!isFirstRender.current) {
            formStore.setState(() => {
                return { ...form }
            })
        }
    }, [defaultValues])

    return (
        <FormStoreContext.Provider value={formStore}>
            {children}
        </FormStoreContext.Provider>
    )
}