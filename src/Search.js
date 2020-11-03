import React from 'react'
import { Link } from 'react-router-dom'
import FlexibleInput from './input'
import { inputTypes } from './consts'

/* returns empty span tag if we're at the end of the string */
const Highlight = ({ searchText, rowLen, idx }) => {
  if (rowLen !== idx + 1) {
    return <span style={{ backgroundColor: 'yellow' }}>{searchText}</span>
  }
  return <span />
}

const HighlightString = ({ searchText, textToHighlight }) => {
  if (!textToHighlight) return <></>
  const escapedText = searchText.replace(/\[|\]|[\\^$*+?.|()]/g, '\\$&')
  const insensitiveSplit = new RegExp(escapedText, 'i')
  const rowLen = textToHighlight.split(insensitiveSplit).length
  let nonHighlightLength = 0
  return (
    <div>
      {textToHighlight.split(insensitiveSplit).map((nonHighlight, idx) => {
        nonHighlightLength += nonHighlight.length
        const highlightStartIndex =
          nonHighlightLength + idx * escapedText.length
        return (
          <React.Fragment key={idx}>
            <span>{nonHighlight}</span>
            <Highlight
              searchText={textToHighlight.substring(
                highlightStartIndex,
                highlightStartIndex + escapedText.length
              )}
              rowLen={rowLen}
              idx={idx}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export const Search = ({
  queryText,
  entries,
  onTextChange,
  onLinkClick,
  searchDropdown,
  searchOnChange = true,
  onTriggerSearch,
  onBlur
}) => {
  const showResults = queryText && entries.length > 0
  return (
    <div
      className="mr-3 dropdown form-inline"
      onKeyPress={evt => {
        if (evt.key === 'Enter') {
          onTriggerSearch({ queryText })
        }
      }}
    >
      <FlexibleInput
        type={inputTypes.STRING_TYPE}
        id="searchbox"
        className="form-control border-secondary dropdown-toggle"
        onChange={evt => {
          const triggeredActions = [onTextChange({ queryText: evt })]
          if (searchOnChange === true) {
            triggeredActions.push(onTriggerSearch())
          }
          return triggeredActions
        }}
        value={queryText}
        customInput={{
          type: 'search',
          placeholder: 'Search...',
          'data-toggle': 'dropdown',
          onBlur: () => setTimeout(onBlur, 300)
        }}
      />
      {showResults && searchDropdown && (
        <div
          className={`dropdown-menu dropdown-menu-right ${entries.length > 0 &&
            'show'}`}
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            whiteSpace: 'normal',
            position: 'absolute'
          }}
        >
          {
          entries.map((entry, index) => (
            <Link
              key={entry.name}
              onClick={() => onLinkClick()}
              className="dropdown-item"
              to={entry.detailURL}
              style={{
                whiteSpace: 'normal'
              }}
            >
              <HighlightString
                searchText={queryText}
                textToHighlight={entry.name}
              />
              <div style={{ fontSize: '11px', paddingLeft: '1em' }}>
                {entry.modelLabel}
              </div>
            </Link>
          ))
          }
        </div>
      )}
    </div>
  )
}
