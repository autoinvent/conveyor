import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export const ActiveLensContext = createContext<string | number | boolean>('');
export const SetActiveLensContext = createContext<
  Dispatch<SetStateAction<string | number | boolean>>
>(() => {
  throw new Error('SetActiveLensContext must be used within Lenses');
});

export interface LensesProps {
  activeLens: string | number | boolean;
  children?: ReactNode;
}

export const Lenses = ({ activeLens, children }: LensesProps) => {
  const [lens, setLens] = useState(activeLens);
  useEffect(() => {
    setLens(activeLens);
  }, [activeLens]);

  return (
    <SetActiveLensContext.Provider value={setLens}>
      <ActiveLensContext.Provider value={lens}>
        {children}
      </ActiveLensContext.Provider>
    </SetActiveLensContext.Provider>
  );
};
