import { FC, memo } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import DisplayModeProvider, {
  DisplayMode,
} from '../../contexts/commons/DisplayModeContext'
import LoadingProvider from '../../contexts/commons/LoadingContext'

interface ModelFormProps {
  formMethods: UseFormReturn<Record<string, any>, any, undefined>
  mode?: DisplayMode
  loading?: boolean
}

const ModelForm: FC<ModelFormProps> = ({
  formMethods,
  mode = DisplayMode.DISPLAY,
  loading = false,
  children,
}) => {
  return (
    <FormProvider {...formMethods}>
      <LoadingProvider loading={loading}>
        <DisplayModeProvider mode={mode}>{children}</DisplayModeProvider>
      </LoadingProvider>
    </FormProvider>
  )
}

export default memo(ModelForm) as FC<ModelFormProps>
