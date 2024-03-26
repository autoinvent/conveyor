import { ReactNode, createContext } from 'react';

import { AlertsProvider } from '@/Alerts'

// Todo: remove?
export interface MQLError {
    message: string;
    locations?: { line: number; column: number }[];
    path?: (string | number)[];
    extensions?: Record<string, any>;
}

export interface MQLResponse {
    [operationName: string]: Record<string, any>
}

export interface UseMQLParameters {
    document: string;
    operationName?: string;
}

export type MQLRequest = (
    variables?: Record<string, any>,
) => Promise<MQLResponse>;


export type UseMQLOperation = (parameters: UseMQLParameters) => MQLRequest;

export interface ConveyorContextType {
    useMQLQuery: UseMQLOperation,
    useMQLMutation: UseMQLOperation
}

export const ConveyorContext = createContext<ConveyorContextType>({
    useMQLQuery: () => () =>
        Promise.reject(new Error('useMQLQuery is not defined.')),
    useMQLMutation: () => () =>
        Promise.reject(new Error('useMQLMutation is not defined.')),
});

export interface ConveyorProps {
    useMQLQuery: UseMQLOperation
    useMQLMutation: UseMQLOperation
    children: ReactNode;
}

export const Conveyor = ({ useMQLQuery, useMQLMutation, children }: ConveyorProps) => {
    return (
        <ConveyorContext.Provider value={{ useMQLQuery, useMQLMutation }}>
            <AlertsProvider>
                {children}
            </AlertsProvider>
        </ConveyorContext.Provider >
    );
};
