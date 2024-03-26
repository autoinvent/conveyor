import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

import { WrapperProp } from '@/types';

export type LensType = string | number | boolean
export const ActiveLensContext = createContext<LensType | undefined>(undefined);
export const SetActiveLensContext = createContext<
    Dispatch<SetStateAction<LensType>>
>(() => {
    throw new Error('SetActiveLensContext must be used within Lenses');
});

export interface LensesProps extends WrapperProp {
    activeLens: LensType;
}

export const Lenses = ({ activeLens, children }: LensesProps) => {
    const [lens, setLens] = useState(activeLens);
    useEffect(() => {
        setLens(activeLens)
    }, [activeLens])

    return (
        <SetActiveLensContext.Provider value={setLens}>
            <ActiveLensContext.Provider value={lens}>
                {children}
            </ActiveLensContext.Provider>
        </SetActiveLensContext.Provider>
    );
};
