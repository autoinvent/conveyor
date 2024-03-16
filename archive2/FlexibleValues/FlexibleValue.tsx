import { ReactNode } from 'react'

import { Lens } from '@/Lenses'
import { Slot } from '@/Slots'

export interface FlexibleValueProps {
    valueType: string,
    children: ReactNode
}

export const FlexibleValue = ({ valueType, children }: FlexibleValueProps) => {
    return (<Slot slotKey={valueType}>
        <Lens lens={valueType}>
            {children}
        </Lens>
    </Slot>)
}