import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

export enum DisplayKeys {
  VALUE = 'VALUE',
  EDIT = 'EDIT',
}

export const DisplayKeyContext = createContext<string>('');
export const SetDisplayKeyContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => {
  throw new Error(
    'SetDisplayKeyContext must be used within DisplayKeyProvider',
  );
});

interface DisplayKeyProviderProps {
  value: string;
  children: ReactNode;
}

export const DisplayKeyProvider = ({
  value,
  children,
}: DisplayKeyProviderProps) => {
  const [displayKey, setDisplayKey] = useState(value);
  return (
    <SetDisplayKeyContext.Provider value={setDisplayKey}>
      <DisplayKeyContext.Provider value={displayKey}>
        {children}
      </DisplayKeyContext.Provider>
    </SetDisplayKeyContext.Provider>
  );
};
