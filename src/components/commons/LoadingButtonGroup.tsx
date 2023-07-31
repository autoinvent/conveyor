import { FC, memo } from 'react'
import { ButtonGroup, ButtonGroupProps, Button, Spinner } from 'react-bootstrap'

import { BaseProps } from '../../types'

interface LoadingButtonGroupProps extends ButtonGroupProps, BaseProps {
  loading: boolean
  variant?: string
  spinnerSize?: 'sm' | undefined
}

const LoadingButtonGroup: FC<LoadingButtonGroupProps> = (props) => {
  return (
    <ButtonGroup id={props.id} className={props.className} size={props.size}>
      {props.loading ? (
        <Button variant={props.variant} disabled>
          <Spinner
            as="span"
            animation="border"
            size={props.spinnerSize ?? 'sm'}
          />
        </Button>
      ) : (
        props.children
      )}
    </ButtonGroup>
  )
}

export default memo(LoadingButtonGroup) as FC<LoadingButtonGroupProps>
