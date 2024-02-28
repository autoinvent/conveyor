import { createContext, CSSProperties, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

import { Alert, AlertProps } from './Alert'

export const AlertPropsContext = createContext<AlertProps[]>([]);
export const SetAlertPropsContext = createContext<
    Dispatch<SetStateAction<AlertProps[]>>
>(() => {
    throw new Error('SetAlertPropsContext must be used within Alerts');
});


export interface AlertsProps {
    Component?: FC<AlertProps>
    children?: ReactNode
}

export const Alerts = ({ Component = Alert, children }: AlertsProps) => {
    const [alertsProps, setAlertsProps] = useState<AlertProps[]>([])
    const alertsStyles: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        minWidth: '60%',
        left: '20%',
        zIndex: 10,
    }
    return (
        <SetAlertPropsContext.Provider value={setAlertsProps}>
            <AlertPropsContext.Provider value={alertsProps}>
                <div style={alertsStyles}>
                    {alertsProps.map((alertProp) =>
                        <Component key={alertProp.alertId} {...alertProp} />
                    )}
                </div>
                {children}
            </AlertPropsContext.Provider>
        </SetAlertPropsContext.Provider>
    );
};
