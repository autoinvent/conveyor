import { Tooltip } from 'react-tippy'
import React from 'react'
import * as R from 'ramda'
import { Link } from 'react-router-dom'

export const RelTooltipContent = ({ data }) => {
  if (data.length === 0) {
    return <span>...loading</span>
  }
  return (
    <table className='table table-sm table-bordered table-striped tooltip-table'>
      <tbody>
        {data.map(({ name, value }) => (
          <tr key={`tooltip-${name}`}>
            <td>{ name }</td>
            <td>

              {value.map((oneValue, idx) => (
                <span key={`${name}-${idx}`}>
                  {oneValue.url
                    ? <Link to={oneValue.url}>{oneValue.text}</Link>
                    : oneValue.text
                  }
                  {value.length - 1 > idx && ', '}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** @type { React.StatelessComponent<{ fieldName: string, schema: any, id: string, modelName: string, data: {name: string, value: {text: string, url?: string}}[], interactive: boolean, tooltipOpened: function> } */
const RelTooltip = ({ schema, modelName, id, data, children }) => {
  const actions = schema.getActions(modelName)
  const tooltipOpened = R.path(['tooltip', 'onTooltipOpen'], actions)
  return <Tooltip
    interactive
    html={<RelTooltipContent data={data} />}
    delay={0}
    theme='light'
    onShow={() => tooltipOpened({ modelName: modelName, id })}
    popperOptions={{
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }}
  >
    {children}
  </Tooltip>
}

export default RelTooltip
