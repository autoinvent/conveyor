// import {
//   type ComponentPropsWithoutRef,
//   type ElementRef,
//   type ReactElement,
//   type ReactNode,
//   forwardRef,
// } from 'react';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/lib/components/ui/accordion';
// import type { SearchResult } from '@/types';

// export interface SearchResultsProps<Category extends string> {
//   data: SearchResult[];
//   groupBy?: (item: SearchResult) => Category;
//   getLabel?: ({
//     category,
//     results,
//   }: {
//     category: Category;
//     results: SearchResult[];
//   }) => ReactNode;
//   getContent?: ({
//     category,
//     results,
//   }: {
//     category: Category;
//     results: SearchResult[];
//   }) => ReactNode;
//   sortBy?: (
//     a: [Category, SearchResult[]],
//     b: [Category, SearchResult[]],
//   ) => number;
//   onNoResults?: () => ReactNode;
// }

// export const SearchResultsNoForwardRef = <T extends string>(
//   {
//     data,
//     groupBy = (item) => item.type as T,
//     getLabel = ({ category }) => (
//       <h1 className="font-bold text-xl">{category}</h1>
//     ),
//     getContent = ({ results }) => (
//       <div className="flex flex-wrap">
//         {results.map((result) => (
//           <p key={result.id} className="w-full">
//             {result.value}
//           </p>
//         ))}
//       </div>
//     ),
//     onNoResults = () => (
//       <h1 className="w-full text-center font-bold">No results</h1>
//     ),
//     sortBy = (a, b) => a[0].localeCompare(b[0]),
//     ...props
//   }: SearchResultsProps<T> & ComponentPropsWithoutRef<typeof Accordion>,
//   ref: React.Ref<ElementRef<typeof Accordion>>,
// ) => {
//   const categorizedResults: Map<T, SearchResult[]> = new Map();

//   for (const item of data) {
//     const category = groupBy(item);

//     if (!categorizedResults.has(category)) {
//       categorizedResults.set(category, []);
//     }
//     categorizedResults.get(category)?.push(item);
//   }

//   if (data.length === 0) return onNoResults();

//   return (
//     <Accordion {...props} ref={ref}>
//       {categorizedResults
//         .entries()
//         .toArray()
//         .sort(sortBy)
//         .map(([category, results]) => (
//           <AccordionItem key={`item-${category}`} value={category}>
//             <AccordionTrigger>
//               {getLabel({ category, results })}
//             </AccordionTrigger>
//             <AccordionContent>
//               {getContent({ category, results })}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//     </Accordion>
//   );
// };

// export const SearchResults = forwardRef(SearchResultsNoForwardRef) as <
//   Category extends string,
// >(
//   props: SearchResultsProps<Category> &
//     ComponentPropsWithoutRef<typeof Accordion>,
//   ref: ElementRef<typeof Accordion>,
// ) => ReactElement;
