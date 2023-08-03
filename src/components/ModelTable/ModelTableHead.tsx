import { PACKAGE_ABBR } from '../../package'
import { BaseProps, FieldData } from '../../types'

import ModelTableHeader from './ModelTableHeader'

interface ModelTableHeadProps extends BaseProps {
  modelName: string
  fields: string[]
  fieldsData?: Record<string, FieldData>
  showCrud?: boolean
  sortable?: boolean
}

const ModelTableHead = ({
  id,
  className,
  modelName,
  fields,
  fieldsData,
  showCrud = true,
  sortable = true,
}: ModelTableHeadProps) => {
  return (
    <thead id={id} className={className}>
      <tr>
        {fields.map((field) => {
          const displayLabelFn = fieldsData?.[field]?.displayLabelFn
          return (
            <ModelTableHeader
              key={`${PACKAGE_ABBR}-table-header-${field}}`}
              modelName={modelName}
              field={field}
              displayLabelFn={displayLabelFn}
              sortable={sortable && !fieldsData?.[field]?.related}
            />
          )
        })}
        {showCrud && <th className={`${PACKAGE_ABBR}-crud-header`}></th>}
      </tr>
    </thead>
  )
}

export default ModelTableHead
