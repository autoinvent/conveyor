// import { forwardRef, useId, type ComponentProps } from 'react';

// import { FormControl as SFormControl } from '@/lib/components/ui/form';
// import { Slot } from '@radix-ui/react-slot';

// import { useFormStore } from './useFormStore';

// export interface FormControlProps {
//   field: string
// }

// export const FormControl = forwardRef(({ field }: FormControlProps, ref) => {
//   const id = useFormStore(state => state.id)
//   const formState = useFormStore(state => state.formState)
//   const
//   const formControlId =  `${id}-${field}-form-control`
//   const formDescriptionId = `${formControlId}-description`
//   const formMessageId =  `${formControlId}-message`

//   return (
//     <Slot
//       ref={ref}
//       id={formControlId}
//       aria-describedby={
//         !error
//           ? `${formDescriptionId}`
//           : `${formDescriptionId} ${formMessageId}`
//       }
//       aria-invalid={!!error}
//       {...props}
//     />
//   )
// })
