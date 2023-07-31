import { useContext } from 'react'

import { ConveyorContext } from '../../contexts/ConveyorContext'
import { BaseProps } from '../../types'

interface ModelDetailTitleProps extends BaseProps {
  modelName: string
  title: string
  modelIdentifier: string
}

const ModelDetailTitle = ({
  id,
  className = 'd-inline',
  modelName,
  title,
  modelIdentifier,
}: ModelDetailTitleProps) => {
  const { navigate } = useContext(ConveyorContext)
  return (
    <h2 id={id} className={className}>
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault()
          navigate({ modelName })
        }}
      >
        {title}
      </a>
      : {modelIdentifier}
    </h2>
  )
}

export default ModelDetailTitle
