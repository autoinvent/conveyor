import { ReactNode, CSSProperties, useContext, Fragment } from "react"

import { Slot } from "@/Slots"
import { BaseComponentProps } from "@/types"

import { AlertsContext } from "./AlertsContext"
import { AlertProvider } from "./AlertContext"
import { Alert } from "./Alert"

export const ALERTS_SLOT = 'alerts-slot'

export interface AlertsProps extends BaseComponentProps {
    children?: ReactNode
}

export const Alerts = ({ children, id, className, style }: AlertsProps) => {
    const alertsStyles: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        minWidth: '60%',
        left: '20%',
        zIndex: 1,
    }
    const alerts = useContext(AlertsContext)
    return (
        <Slot slotKey={ALERTS_SLOT}>
            <div id={id} className={className} style={style ?? alertsStyles}>
                {alerts.map((alert) => {
                    return (
                        <Fragment key={alert.alertId}>
                            <AlertProvider alert={alert}>
                                {children === undefined ? <Alert /> : children}
                            </AlertProvider>
                        </Fragment>
                    )
                })}
            </div>
        </Slot>
    )
}