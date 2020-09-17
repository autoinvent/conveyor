import React from 'react'
import * as R from 'ramda'
import { FaAngleDown, FaAngleRight } from 'react-icons/fa'
import { Tooltip } from 'react-tippy'

export const toggleState = {
  EXPAND: 'expand', // expanded row
  MINIMIZE: 'minimize', // row can be expanded
  HIDDEN: 'hidden' // row has no children
}

// specify CSS for first column and rest of columns
export const formatCSS = (first, rest) => ({
  firstCSS: first,
  restCSS: rest
})

const makeOnClick = (stateNode, toggleRow) => {
  if (stateNode.toggle === toggleState.HIDDEN) { return false }

  const onClick = e => {
    e.stopPropagation()
    toggleRow(stateNode.id)
  }
  return onClick
}

// returns only the nodes of tree.state to be rendered
const filterTree = tree => {
  const traverse = stateNode => {
    const retNode = { ...stateNode, children: [] } // initially exclude children
    if (stateNode.toggle === toggleState.EXPAND) {
      retNode.children = stateNode.children.map(traverse)
    }
    return retNode
  }

  return R.prop('state', tree).map(traverse)
}

const Indentation = ({ depth }) => {
  const padding = depth * 20
  return <span style={{ paddingLeft: `${padding}px` }} />
}

const ToggleContainer = ({ stateNode, toggleRow, children }) => {
  if (stateNode.toggle === toggleState.HIDDEN) { return <React.Fragment>{children}</React.Fragment> }

  let tooltip = ''
  if (stateNode.toggle === toggleState.MINIMIZE) { tooltip = 'Show' } else if (stateNode.toggle === toggleState.EXPAND) { tooltip = 'Hide' }

  const handleClick = makeOnClick(stateNode, toggleRow)

  const component = (
    <div style={{ cursor: 'pointer' }} onClick={handleClick}>
      {children}
    </div>
  )

  return <Tooltip
    title={tooltip}
    delay={1000}
    hideDelay={0}
    position={'left'}
    popperOptions={{
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport'
        }
      }
    }}
  >
    {component}
  </Tooltip>
}

const Toggle = ({ stateNode, toggleRow, iconPath }) => {
  let component
  switch (stateNode.toggle) {
    case toggleState.EXPAND:
      component = <FaAngleDown className='tree-toggle-icon-angle-down' />
      break
    case toggleState.MINIMIZE:
      component = <FaAngleRight className='tree-toggle-icon-angle-right' />
      break
    case toggleState.HIDDEN:
      component = <FaAngleRight className='invisible' />
      break
  }

  return (
    <ToggleContainer {...{ stateNode, toggleRow }}>
      {component}
    </ToggleContainer>
  )
}

// render a single row
const renderRow = ({ tree, stateNode, toggleRow, iconPath, columnFields, renderFieldProps, renderField, rowCSS }) => {
  const nodeID = R.prop('id', stateNode)
  const node = R.path(['nodes', nodeID], tree)

  const fields = columnFields.map(columnField => (
    renderField({ ...renderFieldProps, tree, node, columnField, stateNode })
  )).filter(col => col !== null)

  const handleClick = makeOnClick(stateNode, toggleRow)
  const firstColCSS = R.prop('firstCSS', rowCSS)
  const restColCSS = R.prop('restCSS', rowCSS)

  return (
    <tr>
      <td className={firstColCSS ? firstColCSS(node) : ''} onClick={handleClick || undefined}>
        <div style={{ display: 'flex' }}>
          <Indentation {...{ depth: stateNode.depth }} />
          <Toggle {...{ stateNode, toggleRow, iconPath }} />
          <div style={{ flexGrow: 1 }} onClick={(e) => e.stopPropagation()}>
            {fields[0]}
          </div>
        </div>
      </td>
      {fields.slice(1).map((field, index) => (
        <td className={restColCSS ? restColCSS(node) : ''} key={index} >
          {field}
        </td>
      ))}
    </tr>
  )
}

// returns a list of <tr> elements
export const getRows = ({ tree, ...props }) => {
  const renderRows = stateNode => {
    const row = {
      key: R.prop('id', stateNode),
      component: renderRow({
        tree, stateNode, ...props
      })
    }

    const childRows = stateNode.children.map(renderRows)
    return [row, childRows]
  }

  const filteredTree = filterTree(tree)

  // get row components
  const rows = R.flatten(filteredTree.map(renderRows))

  return rows.map(row => (
    <React.Fragment key={row.key}>
      {row.component}
    </React.Fragment>
  ))
}
