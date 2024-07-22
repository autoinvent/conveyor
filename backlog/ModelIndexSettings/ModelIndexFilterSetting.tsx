// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
// } from '@/lib/components/ui/card';
// import { Button } from '@/lib/components/ui/button';
// import { ScrollArea } from '@/lib/components/ui/scroll-area';
// import { cn } from '@/lib/utils';

// import { FormStoreProvider } from '@/Form';

// import { useModelIndexStore } from '../useModelIndexStore';

// import { ModelIndexFilterItem } from './ModelIndexFilterItem';

// export const ModelIndexFilterSetting = () => {
//   const filter = useModelIndexStore(
//     (state) => state.tableViewOptions.tableView.filter,
//   );
//   const filterLength = filter?.length ?? 0;

//   return (
//     <Card>
//       <CardHeader>
//         <CardDescription>Show records where,</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="max-h-80">
//           {filter?.map((filterGroup, i) => {
//             const groupKey = `filter-group-${i}`;
//             return (
//               <div key={groupKey} className="space-y-2 p-3 hover:bg-muted/50">
//                 {filterGroup.map((filterItem, j) => {
//                   const groupItemkey = `filter-item-group-${i}-index-${j}`;
//                   return (
//                     <FormStoreProvider
//                       key={groupItemkey}
//                       mode="onChange"
//                       values={{ group: i, groupIndex: j, ...filterItem }}
//                     >
//                       <ModelIndexFilterItem showRemoveFilter showSaveFilter />
//                     </FormStoreProvider>
//                   );
//                 })}
//               </div>
//             );
//           })}
//           <Button>Add Filt</Button>
//         </ScrollArea>

//         <div className={cn(filter && filter?.length > 0 && 'mt-2', 'p-2')}>
//           <FormStoreProvider
//             mode="onChange"
//             values={{
//               group: filterLength,
//               groupIndex: 0,
//               path: '',
//               not: false,
//               op: '',
//               value: '',
//             }}
//           >
//             <ModelIndexFilterItem showAddFilter />
//           </FormStoreProvider>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button>Apply Filters</Button>
//         <Button>Clear All Filters</Button>
//         <Button>Close</Button>
//       </CardFooter>
//     </Card>
//   );
// };
