import { useMemo } from 'react'

import { PACKAGE_ABBR } from '../../package'
import { BaseProps, FieldData } from '../../types'

import ModelTableRow from './ModelTableRow'

interface ModelTableBodyProps extends BaseProps {
  modelName: string
  fields: string[]
  dataList?: Record<string, any>[]
  fieldsData?: Record<string, FieldData>
  editable?: boolean
  deletable?: boolean
}

const ModelTableBody = ({
  id,
  className,
  modelName,
  fields,
  dataList = [],
  fieldsData,
  editable = true,
  deletable = true,
}: ModelTableBodyProps) => {
  const memoDataList = useMemo(() => dataList, [JSON.stringify(dataList)])

  return (
    <tbody id={id} className={className}>
      {memoDataList.map((rowData) => {
        return (
          <ModelTableRow
            key={`${PACKAGE_ABBR}-table-row-${rowData.id}`}
            modelName={modelName}
            fields={fields}
            data={rowData}
            fieldsData={fieldsData}
            editable={editable}
            deletable={deletable}
          />
        )
      })}
    </tbody>
  )
}

export default ModelTableBody
