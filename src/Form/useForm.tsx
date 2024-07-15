import {type UseFormProps, useForm as useRHForm} from 'react-hook-form'

export const useForm =  (props: UseFormProps) => {
    const formProps = Object.assign(
        { mode: 'onChange'},
        props,
      );
    return useRHForm(formProps)
}