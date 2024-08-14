import type { SearchResult } from '@/types'
import * as Accordion from '@radix-ui/react-accordion'

export interface SearchResultsProps {
  data: SearchResult[]
  groupBy?: (data : SearchResult) => string
  getDisplay?: (data : SearchResult) => any
}

export const SearchResults = ({ 
  data, 
  groupBy = (item) => item.type, 
  getDisplay = (item) => item.value
} : SearchResultsProps) => {
  const categorizedResults : {[type : string]: SearchResult[]} = {};

  for (const item of data) {
    const category = groupBy(item)

    if (!categorizedResults[category]) {
      categorizedResults[category] = [];
    }
    categorizedResults[category].push(item)
  }

  return (
    <Accordion.Root type='multiple'>
      {Object.entries(categorizedResults).map( ([type, searchResults]) => (
        <Accordion.Item key={`item-${type}`} value={type}>
          <Accordion.Header>
            <Accordion.Trigger>
              {type}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            { searchResults.map( val => getDisplay(val))}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}