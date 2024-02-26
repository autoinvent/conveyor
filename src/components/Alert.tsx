import { ReactNode, useEffect, useState } from 'react'
import { Alert as RBAlert } from 'react-bootstrap'

import { BaseComponentProps } from '@/types'


export interface AlertProps extends BaseComponentProps {
    content: ReactNode
    delay?: number
}

export const Alert = ({ content, delay, id, className, style }: AlertProps) => {
    const [show, setShow] = useState(!Boolean(delay))
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined = undefined
        if (delay) {
            timer = setTimeout(() => {
                setShow(false)
            }, delay)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [delay])

    return (
        <RBAlert
            show={show}
            // autohide={Boolean(expires)}
            // delay={expires}
            id={id}
            className={className}
            style={style}
            dismissible
        >
            {content}
        </RBAlert>
    )
} 