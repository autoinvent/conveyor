import { createContext, Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react';

export const AlertsContext = createContext<ReactNode[]>([]);
export const SetAlertsContext = createContext<
    Dispatch<SetStateAction<ReactNode[]>>
>(() => {
    throw new Error('SetAlertsContext must be used within Akerts');
});


export interface AlertsProps {
    initialAlerts?: ReactNode[]
    children?: ReactNode
}

export const Alerts = ({ initialAlerts = [], children }: AlertsProps) => {
    const [alerts, setAlerts] = useState<ReactNode[]>(initialAlerts)

    return (
        <SetAlertsContext.Provider value={setAlerts}>
            <AlertsContext.Provider value={alerts}>
                {alerts.map((alert, index) =>
                    <Fragment key={index}>{alert}</Fragment>
                )}
                {children}
            </AlertsContext.Provider>
        </SetAlertsContext.Provider>
    );
};
