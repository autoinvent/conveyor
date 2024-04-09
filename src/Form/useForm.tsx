import { useFormStore } from "./useFormStore"

export const useForm = () => {
    const form = useFormStore(state => ({ original: state.options?.defaultValues, useStore: state.useStore }))
    const current = form.useStore((state: any) => state.values)
    return {
        data: {
            original: form.original,
            current
        },
    }
}