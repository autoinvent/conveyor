import React from 'react'
import { Table } from './table/Table'
import * as R from 'ramda'
import CreateButton from './CreateButton'
import { FilterModal, FilterModalButton } from './table/Filter'
import { Redirect } from 'react-router-dom'
import { skipOverride, useOverride } from './Utils'

/**
 * Overridable React Component for the Index Page Title
 * @param schema model schema
 * @param modelName the name of the model
 * @param selectOptions options used by the select input type
 * @param path relative path to current page
 * @param data data in the table
 * @param tableView has sort and pagination information, as well as filtering info
 * @param customProps user defined props and customization
 * @return Rendered React Component
 */
type DefaultIndexTitleProps = {
  schema: any
  modelName: string
  selectOptions: any[]
  path: string
  data: any
  tableView: any
  customProps: any
}
export const DefaultIndexTitle = ({
  schema,
  modelName,
  selectOptions,
  path,
  data,
  tableView,
  customProps
}: DefaultIndexTitleProps) => {
  const actions = schema.getActions(modelName)
  const onCreateClick = R.path(['create', 'onIndexCreate'], actions) as any
  const onClick = () => onCreateClick({ modelName, path })
  const creatable = schema.isCreatable({ modelName, data, customProps })
  const filterable = schema.isTableFilterable({ modelName, data, customProps })
  const currentFilters = R.path([modelName, 'filter', 'filterValue'], tableView)
  const filterOrder = R.path([modelName, 'filter', 'filterOrder'], tableView)
  const filtersAreActive = R.path(
    [modelName, 'filter', 'filtersAreActive'],
    tableView
  )

  return (
    <div
      className={
        'conv-default-index-title conv-default-index-title-' + modelName
      }
    >
      <h3>{schema.getModelLabelPlural({ modelName, data, customProps })}</h3>
      {filterable && (
        <FilterModal
          {...{
            schema,
            modelName,
            selectOptions,
            data,
            filterOrder,
            filterInputs: currentFilters,
            customProps
          }}
        />
      )}
      <div className="float-right">
        {filterable && (
          <FilterModalButton {...{ modelName, filtersAreActive }} />
        )}
        {creatable && (
          <CreateButton {...{ onClick, to: modelName, replaceEntry: false }} />
        )}
      </div>
    </div>
  )
}

const PageNotFound = () => (
  <div id="page-not-found" className="conv-page-not-found">
    <h1>Page Not Found</h1>
  </div>
)

/**
 * Overridable React Component for the Whole Index Page
 * @param schema model schema
 * @param modelName the name of the model
 * @param data data in the table
 * @param modalData delete detail modal information
 * @param editData information on what is being edited, current state and any errors
 * @param selectOptions options used by the select input type
 * @param path relative path to current page
 * @param tooltipData displayed tooltip data for objects referenced by the table.
 * @param tableView has sort and pagination information, as well as filtering info
 * @param customProps user defined props and customization
 * @param summary summary information for the footer
 * > ex: sum of table column, optional if no footer
 * @return Rendered React Component
 */
type DefaultIndexProps = {
  schema: any
  modelName: string
  data: any
  modalData: any
  editData: any
  selectOptions: any[]
  path: string
  tooltipData: any
  tableView: any
  customProps: any
  summary: any
}
export const DefaultIndex = ({
  schema,
  modelName,
  data,
  modalData,
  editData,
  selectOptions,
  path,
  tooltipData,
  tableView,
  customProps,
  summary
}: DefaultIndexProps) => {
  if (!schema.getHasIndex(modelName) || R.isNil(schema.getModel(modelName))) {
    return <PageNotFound />
  }

  const IndexTitleOverride = schema.getIndexTitleOverride(modelName)
  const IndexPageOverride = schema.getIndexPageOverride(modelName)

  const IndexTitle = useOverride(IndexTitleOverride, DefaultIndexTitle)
  const IndexPage = useOverride(IndexPageOverride, Table)

  const fieldOrder = schema.getIndexFields({
    modelName,
    data,
    customProps
  })
  const actions = schema.getActions(modelName)
  const onDelete = R.path(['delete', 'onIndexDelete'], actions)
  const onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions)

  if (skipOverride(IndexTitleOverride) && skipOverride(IndexPageOverride)) {
    return null
  }

  return (
    <div className={'conv-index conv-index-' + modelName}>
      <IndexTitle
        {...{
          schema,
          modelName,
          data,
          modalData,
          editData,
          selectOptions,
          path,
          tooltipData,
          tableView,
          customProps
        }}
      />
      <IndexPage
        {...{
          schema,
          modelName,
          data,
          modalData,
          editData,
          selectOptions,
          tooltipData,
          tableView,
          customProps,
          fieldOrder,
          fromIndex: true,
          onDelete,
          onEditSubmit,
          summary
        }}
      />
    </div>
  )
}

/**
 * Top Level React Component for the Index Page
 * @param schema model schema
 * @param modelName the name of the model
 * @param data data in the table
 * @param modalData delete detail modal information
 * @param editData information on what is being edited, current state and any errors
 * @param selectOptions options used by the select input type
 * @param path relative path to current page
 * @param tooltipData displayed tooltip data for objects referenced by the table.
 * @param tableView has sort and pagination information, as well as filtering info
 * @param customProps user defined props and customization
 * @param summary summary information for the footer
 * > ex: sum of table column, optional if no footer
 * @return Rendered React Component
 */
type IndexProps = {
  schema: any
  modelName: string
  data: any
  modalData: any
  editData: any
  selectOptions: any
  path: string
  tooltipData: any
  tableView: any
  customProps: any
  summary: any
}
const Index = ({
  schema,
  modelName,
  data,
  modalData,
  editData,
  selectOptions,
  path,
  tooltipData,
  tableView,
  customProps,
  summary
}: IndexProps) => {
  // if singleton, Index redirects to Detail pg
  if (schema.getSingleton(modelName)) {
    const singleton = R.last(data)
    // singleton may not be null when last deleted; test for 'id'
    const singleId = R.propOr(null, 'id', singleton)
    if (singleId) {
      return <Redirect to={`/${modelName}/${singleId}`} />
    }
    // if no singleId exists, must create
    const actions = schema.getActions(modelName)
    const onCreateClick = R.path(['create', 'onIndexCreate'], actions) as any
    return (
      <div className="conv-index">
        <h1>
          {`No ${schema.getModelLabel({
            modelName,
            data,
            customProps
          })} Exists`}
          <CreateButton
            {...{
              onClick: () => onCreateClick({ modelName }),
              to: modelName,
              replaceEntry: false
            }}
          />
        </h1>
      </div>
    )
  }

  const IndexOverride = schema.getIndexOverride(modelName)
  const IndexComponent = useOverride(IndexOverride, DefaultIndex)

  return (
    <IndexComponent
      {...{
        schema,
        modelName,
        data,
        modalData,
        editData,
        selectOptions,
        path,
        tooltipData,
        tableView,
        customProps,
        summary
      }}
    />
  )
}

export default Index
