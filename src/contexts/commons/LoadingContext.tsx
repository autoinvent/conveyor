import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react'

export const LoadingContext = createContext({
  loading: false,
  setLoading: (() => null) as Dispatch<SetStateAction<boolean>>,
})

interface LoadingProviderProps {
  children: ReactNode
  loading?: boolean
}

const LoadingProvider = ({
  children,
  loading = false,
}: LoadingProviderProps) => {
  const [loadingProvider, setLoadingProvider] = useState(loading)

  useEffect(() => {
    if (loading !== loadingProvider) {
      setLoadingProvider(loading)
    }
  }, [loading])

  return (
    <LoadingContext.Provider
      value={{
        loading: loadingProvider,
        setLoading: setLoadingProvider,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
