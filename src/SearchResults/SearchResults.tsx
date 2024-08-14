import type { SearchResult } from '@/types'
import * as Accordion from '@radix-ui/react-accordion'

export interface SearchResultsProps {
  data: SearchResult[]
}

export const SearchResults = ({ data } : SearchResultsProps) => {
  const categorizedResults : {[type : string]: SearchResult[]} = {};

  for (const item of data) {
    if (!categorizedResults[item.type]) {
      categorizedResults[item.type] = [];
    }
    categorizedResults[item.type].push(item)
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
            {searchResults.map( val => val.value)}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}