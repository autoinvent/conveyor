import { PACKAGE_ABBR } from '../../package'
import { BaseProps, FieldData } from '../../types'
import ModelFormField from '../form/ModelFormField'
import ModelTable from '../table/ModelTable'
import ModelTableHead from '../table/ModelTableHead'
import ModelTableRow from '../table/ModelTableRow'

import ModelDetailTableCrud from './ModelDetailTableCrud'

interface ModelDetailTableProps extends BaseProps {
  parentId: string
  parentModelName: string
  parentField: string
  modelName: string
  fields: string[]
  dataList: Record<string, any>[]
  fieldsData?: Record<string, FieldData>
  editable?: boolean
  deletable?: boolean
}

const ModelDetailTable = ({
  id,
  className,
  parentId,
  parentModelName,
  parentField,
  modelName,
  fields,
  dataList,
  fieldsData,
  editable = true,
  deletable = true,
}: ModelDetailTableProps) => {
  const showCrud = editable || deletable

  return (
    <ModelTable
      id={id}
      className={className}
      modelName={modelName}
      fields={fields}
      dataList={dataList}
      editable={editable}
      deletable={deletable}
    >
      <ModelTableHead
        modelName={`${parentModelName}/${modelName}`}
        fields={fields}
        fieldsData={fieldsData}
        showCrud={showCrud}
        sortable={false}
      />
      <tbody>
        {dataList.map((rowData: Record<string, any>) => {
          return (
            <ModelTableRow
              key={`${PACKAGE_ABBR}-table-row-${rowData.id}`}
              modelName={modelName}
              fields={fields}
              data={rowData}
              fieldsData={fieldsData}
              editable={editable}
              deletable={deletable}
            >
              {fields.map((field) => {
                return (
                  <td key={`${PACKAGE_ABBR}-table-cell-${field}`}>
                    <ModelFormField
                      modelName={modelName}
                      field={field}
                      data={rowData}
                      fieldData={fieldsData?.[field]}
                    />
                  </td>
                )
              })}
              {showCrud ? (
                <td className={`${PACKAGE_ABBR}-model-table-crud `}>
                  <ModelDetailTableCrud
                    parentId={parentId}
                    parentModelName={parentModelName}
                    parentField={parentField}
                    modelName={modelName}
                    data={rowData}
                    dataList={dataList}
                    fieldsData={fieldsData}
                    editable={editable}
                    deletable={deletable}
                  />
                </td>
              ) : null}
            </ModelTableRow>
          )
        })}
      </tbody>
    </ModelTable>
  )
}

export default ModelDetailTable
