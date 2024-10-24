import type { SearchResult } from '@/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/components/ui/accordion'
import type  { ReactNode } from 'react'

export interface SearchResultsProps {
  data: SearchResult[]
  groupBy?: (item : SearchResult) => string
  getLabel?: ({ category } : { category: string }) => ReactNode
  getContent?: ({ results }: { results : SearchResult[]}) => ReactNode
}
export const SearchResults = ({ 
  data, 
  groupBy = (item) => item.type, 
  getLabel = ({ category }) => <h1 className="font-bold text-xl">{category}</h1>,
  getContent = ({ results }) => (
    <div className="flex flex-wrap">
      { results.map( result => (
        <p key={result.id} className="w-full">{result.value}</p>
      ))}
    </div>
  )
} : SearchResultsProps) => {
  const categorizedResults : {[type : string]: SearchResult[]} = {};

  for (const item of data) {
    const category = groupBy(item)

    if (!categorizedResults[category]) {
      categorizedResults[category] = [];
    }
    categorizedResults[category].push(item)
  }

  // if (data.length === 0) {
  //   return (
  //     <div className={className}>
  //       <h1 className="w-full text-center font-bold">
  //         No Results
  //       </h1>
  //     </div>
  //   )
  // } 

  return (
    <Accordion type='multiple'>
      {Object.entries(categorizedResults)
        .sort( (a,b) => a[0].localeCompare(b[0]))
        .map( ([category, results], index) => (
        <AccordionItem key={`item-${category}`} value={category}>
          <AccordionTrigger>
            {getLabel({category})}
          </AccordionTrigger>
          <AccordionContent>
            {getContent({ results })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

