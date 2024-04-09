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

    const values = form.useStore((state) => state.values)


    const [formStore] = useState(new Store<FormStore>({
        data: {
            original: defaultValues,
            current: form.state.values,
        },
        FormController: form.Field,
        handleSubmit: form.handleSubmit,
        reset: form.reset,
    }));

    useEffect(() => {
        if (!isFirstRender.current) {
            formStore.setState(state => {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        current: values
                    },
                }
            })
        }
    }, [values])

    useEffect(() => {
        if (!isFirstRender.current) {
            formStore.setState(state => {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        original: defaultValues
                    },
                }
            })
        }
    }, [defaultValues])

    return (
        <FormStoreContext.Provider value={formStore}>
            {children}
        </FormStoreContext.Provider>
    )
}