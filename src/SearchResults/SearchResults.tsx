import type { SearchResult } from '@/types'
import * as Accordion from '@radix-ui/react-accordion'

export interface SearchResultsProps {
  data: SearchResult[]
  dotSeparated?: boolean
  groupBy?: (data : SearchResult) => string
  getDisplay?: (data : SearchResult) => any
}

export const SearchResults = ({ 
  data, 
  dotSeparated,
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
    <Accordion.Root type='multiple' className='rounded-lg border'>
      {Object.entries(categorizedResults).map( ([type, searchResults]) => (
        <Accordion.Item key={`item-${type}`} value={type} className='border-b'>
          <Accordion.Header className="w-full">
            <Accordion.Trigger className="w-full">
              <div className='flex w-full flex-start bg-red-200 px-6 py-4'>
                <h1 className="font-bold text-xl">{type}</h1>
              </div>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <div className='flex w-full px-6'>
              {
                dotSeparated ? 
                <div className="flex w-full flex-start py-2">
                  {searchResults.map( item => getDisplay(item)).join(" ⸱ ")}
                </div> :
                <div className="w-full">
                  {searchResults.map( item => (
                    <p key={`value-${item.id}`} className="w-full py-2">
                      {getDisplay(item)}
                    </p>
                  ))}
                </div>
              }
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}