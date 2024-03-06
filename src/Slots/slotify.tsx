import { ComponentType, useContext } from "react"

import { SlotsMetaContext } from "./Slots"
import { Slot } from "./Slot"


export const slotify = <P extends object>(WrappedComponent: ComponentType<P>, targetSlotKey?: string) => {
    return (props: P) => {
        const { replaceableSlotKey } = useContext(SlotsMetaContext)
        return <Slot slotKey={targetSlotKey ?? replaceableSlotKey}><WrappedComponent {...props} /></Slot>
    }
}