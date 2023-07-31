import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
  memo,
  FC,
} from 'react'

export enum DisplayMode {
  EDIT = 'edit',
  DISPLAY = 'display',
}

export const DisplayModeContext = createContext({
  mode: DisplayMode.DISPLAY,
  setMode: (() => null) as Dispatch<SetStateAction<DisplayMode>>,
})

interface DisplayModeProviderProps {
  children: ReactNode
  mode?: DisplayMode
}

const DisplayModeProvider = ({
  children,
  mode = DisplayMode.DISPLAY,
}: DisplayModeProviderProps) => {
  const [modeProvider, setModeProvider] = useState(mode)

  useEffect(() => {
    if (mode !== modeProvider) {
      setModeProvider(mode)
    }
  }, [mode])

  return (
    <DisplayModeContext.Provider
      value={{
        mode: modeProvider,
        setMode: setModeProvider,
      }}
    >
      {children}
    </DisplayModeContext.Provider>
  )
}

export default memo(DisplayModeProvider) as FC<DisplayModeProviderProps>
