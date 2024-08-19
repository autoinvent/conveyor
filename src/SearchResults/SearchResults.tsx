import { Button } from '@/lib/components/ui/button'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/types'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { type ComponentType, type ReactNode, useState } from 'react'

export interface RowComponentProps {
  item: SearchResult
}
const DefaultRowComponent = ({ item } : RowComponentProps) => (
  <p className="w-full">{item.value}</p>
) 

export interface HeaderComponentProps {
  category: string
  openCategories: string[]
}
const DefaultHeaderComponent = ({ category, openCategories } : HeaderComponentProps) => (
  <div className='flex flex-start border-b px-6 py-4'>
    <h1 className="font-bold text-xl">{category}</h1>
    <div className="flex-grow"/>
    <ChevronDown className={cn(
      'transition-transform duration-500 ease-out',
      openCategories.includes(category) ? "rotate-180" : ""
    )}/>
  </div>
)

export interface ContentWrapperProps {
  children: ReactNode
}

const DefaultContentWrapper = ({ children } : ContentWrapperProps) => {
  return (
    <div className='flex w-full flex-row flex-wrap gap-2 px-6 py-2'>
      {children}
    </div>
  )
}

export interface SearchResultsProps {
  data: SearchResult[]
  groupBy?: (item : SearchResult) => string
  RowComponent?: ComponentType<RowComponentProps>
  HeaderComponent?: ComponentType<HeaderComponentProps>
  ContentWrapper?: ComponentType<ContentWrapperProps>
}
export const SearchResults = ({ 
  data, 
  groupBy = (item) => item.type, 
  HeaderComponent = DefaultHeaderComponent,
  RowComponent = DefaultRowComponent,
  ContentWrapper = DefaultContentWrapper
} : SearchResultsProps) => {
  const [open, setOpen] = useState<string[]>([]);
  const categorizedResults : {[type : string]: SearchResult[]} = {};

  for (const item of data) {
    const category = groupBy(item)

    if (!categorizedResults[category]) {
      categorizedResults[category] = [];
    }
    categorizedResults[category].push(item)
  }
  if (data.length === 0) {
    return (
      <div className='w-full rounded-lg border py-2'>
        <h1 className="w-full text-center font-bold">
          No Results
        </h1>
      </div>
    )
  } 

  return (
    <>
      <div className="w-full py-2">
        <Button className="w-28" onClick={() => setOpen([])}>
          Collapse All
        </Button>
      </div>
      <Accordion.Root type='multiple' className='rounded-lg border' value={open} onValueChange={setOpen}>
        {Object.entries(categorizedResults).map( ([category, searchResults]) => (
          <Accordion.Item key={`item-${category}`} value={category}>
            <Accordion.Header className='w-full'>
              <Accordion.Trigger className='w-full'>
                <HeaderComponent category={category} openCategories={open}/>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
              <ContentWrapper>
                { searchResults.map( item => (
                  <RowComponent item={item} key={item.value}/>
                ))}
              </ContentWrapper>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  )
}

