import { memo, FC } from 'react'

import useTableView from '../../hooks/useTableView'
import { PACKAGE_ABBR } from '../../package'
import { DEFAULT_TABLE_VIEW } from '../../reducers/tableViewsReducer'
import { BaseProps, FieldData } from '../../types'
import { humanizeText } from '../../utils/common'

import ModelCreateButton from '../ModelCreate/ModelCreateButton'
import ModelIndexTable from './ModelIndexTable'

interface ModelIndexProps extends BaseProps {
  modelName: string
  fields: string[]
  title?: string
  fieldsData?: Record<string, FieldData>
  editable?: boolean
  deletable?: boolean
}

const ModelIndex: FC<ModelIndexProps> = ({
  id,
  className = `${PACKAGE_ABBR}-index`,
  modelName,
  fields,
  title = humanizeText(modelName),
  fieldsData,
  editable = true,
  deletable = true,
  children,
}) => {
  // Will save onto some storage and retrieve the tableView in the future
  useTableView({
    modelName,
    tableViewInit: DEFAULT_TABLE_VIEW,
  })
  return (
    <div id={id} className={className}>
      {children ?? (
        <>
          <div id={id} className={className}>
            <h2 className="d-inline">{title}</h2>
            {/* TODO: Filter under construction */}
            <ModelCreateButton modelName={modelName} editable={editable} />
          </div>
          <ModelIndexTable
            modelName={modelName}
            fields={fields}
            fieldsData={fieldsData}
            editable={editable}
            deletable={deletable}
          />
        </>
      )}
    </div>
  )
}

export default memo(ModelIndex) as FC<ModelIndexProps>
