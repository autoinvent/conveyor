import { Button } from '@/lib/components/ui/button'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/components/ui/accordion'
import { ChevronDown } from 'lucide-react'
import { type ComponentType, type ReactNode, useState } from 'react'

export interface RowComponentProps {
  item: SearchResult
}
// const DefaultRowComponent = ({ item } : RowComponentProps) => (
//   <p className="w-full">{item.value}</p>
// ) 

// export interface HeaderComponentProps {
//   category: string
//   openCategories: string[]
//   isLast: boolean
// }
// const DefaultHeaderComponent = ({ category, openCategories, isLast } : HeaderComponentProps) => (
//   <div className={cn(
//     'flex flex-start px-6 py-4',
//     isLast && !openCategories.includes(category) ? "" : "border-b"
//   )}>
//     <h1 className="font-bold text-xl">{category}</h1>
//     <div className="flex-grow"/>
//     <ChevronDown className={cn(
//       'transition-transform duration-500 ease-out',
//       openCategories.includes(category) ? "rotate-180" : ""
//     )}/>
//   </div>
// )

// export interface ContentWrapperProps {
//   children: ReactNode
//   isLast: boolean
// }
// const DefaultContentWrapper = ({ children, isLast } : ContentWrapperProps) => {
//   return (
//     <div className={cn(
//       'flex w-full flex-row flex-wrap gap-2 px-6 py-2',
//       !isLast ? "border-b" : ""
//     )}>
//       {children}
//     </div>
//   )
// }

export interface SearchResultsProps {
  data: SearchResult[]
  groupBy?: (item : SearchResult) => string
  className?: string
  // RowComponent?: ComponentType<RowComponentProps>
  // HeaderComponent?: ComponentType<HeaderComponentProps>
  // ContentWrapper?: ComponentType<ContentWrapperProps>
}
export const SearchResults = ({ 
  data, 
  groupBy = (item) => item.type, 
  // className = "rounded-lg border w-full",
  // HeaderComponent = DefaultHeaderComponent,
  // RowComponent = DefaultRowComponent,
  // ContentWrapper = DefaultContentWrapper
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
        .map( ([category, searchResults], index) => (
        <AccordionItem key={`item-${category}`} value={category}>
          <AccordionTrigger className="">
            <h1 className="font-bold text-xl">{category}</h1>
          </AccordionTrigger>
          <AccordionContent>
            {
              searchResults.map( item => <h1 key={item.value}>{item.value}</h1>)
            }
          </AccordionContent>
          {/* <AccordionContent className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
            <ContentWrapper isLast={index === Object.keys(categorizedResults).length - 1}>
              { searchResults.map( item => (
                <RowComponent item={item} key={item.value}/>
              ))}
            </ContentWrapper>
          </AccordionContent> */}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

