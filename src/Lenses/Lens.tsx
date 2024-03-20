import { ReactNode, useContext } from "react"

import { WrapperProp } from "@/types"

import { ActiveLensContext, LensType } from "./Lenses"


export interface LensProps extends WrapperProp {
    lens: LensType
}

export const Lens = ({ lens, children }: LensProps) => {
    const activeLens = useContext(ActiveLensContext)
    if (activeLens === undefined) throw new Error('Lens must be used within Lenses')
    if (lens === activeLens) {
        return <>{children}</>
    }
    return null
}