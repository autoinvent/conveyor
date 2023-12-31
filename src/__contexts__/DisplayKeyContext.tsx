import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
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
  initialValue: string;
  children: ReactNode;
}

export const DisplayKeyProvider = ({
  initialValue,
  children,
}: DisplayKeyProviderProps) => {
  const [displayKey, setDisplayKey] = useState(initialValue);

  return (
    <SetDisplayKeyContext.Provider value={setDisplayKey}>
      <DisplayKeyContext.Provider value={displayKey}>
        {children}
      </DisplayKeyContext.Provider>
    </SetDisplayKeyContext.Provider>
  );
};
