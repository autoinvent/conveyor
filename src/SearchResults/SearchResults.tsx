import type { SearchResult } from '@/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/components/ui/accordion'
import type  { ReactNode } from 'react'

export interface SearchResultsProps <Category extends string>{
  data: SearchResult[]
  groupBy?: (item : SearchResult) => Category
  getLabel?: ({ category } : { category: Category }) => ReactNode
  getContent?: ({ results }: { results : SearchResult[]}) => ReactNode
}
export const SearchResults = <T extends string>({ 
  data, 
  groupBy = (item) => item.type as T, 
  getLabel = ({ category }) => (
    <h1 className="font-bold text-xl">{category}</h1>
  ),
  getContent = ({ results }) => (
    <div className="flex flex-wrap">
      { results.map( result => (
        <p key={result.id} className="w-full">{result.value}</p>
      ))}
    </div>
  )
} : SearchResultsProps<T>) => {
  const categorizedResults : Map<T,SearchResult[]> = new Map();

  for (const item of data) {
    const category = groupBy(item)

    if (!categorizedResults.has(category)) {
      categorizedResults.set(category, []);
    }
    categorizedResults.get(category)?.push(item);
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
      {categorizedResults.entries().toArray()
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

