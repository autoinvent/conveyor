import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useRef,
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
    const ref = useRef(activeLens)
    useEffect(() => {
        ref.current = activeLens
        setLens(activeLens)
    }, [activeLens])

    if (activeLens !== ref.current) return null

    return (
        <SetActiveLensContext.Provider value={setLens}>
            <ActiveLensContext.Provider value={lens}>
                {children}
            </ActiveLensContext.Provider>
        </SetActiveLensContext.Provider>
    );
};
