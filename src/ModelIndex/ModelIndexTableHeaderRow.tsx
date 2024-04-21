// import { HTMLAttributes } from 'react';

// import { DataLens, Lenses } from '@/Lenses';
// import { TableHeaderRow, useTable } from '@/Table'

// import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell'
// import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell'

// export interface ModelIndexTableHeaderRowProps extends HTMLAttributes<HTMLTableRowElement> {
//     prefilled?: boolean;
// }

// export const ModelIndexTableHeaderRow = ({
//     prefilled,
//     children,
//     ...props
// }: ModelIndexTableHeaderRowProps) => {
//     const { table: columnIds }: { table: string[] } = useTable((state) => state.columnIds);
//     return (
//         <Lenses activeLens={DataLens.DISPLAY}>
//             <TableHeaderRow prefilled={false} {...props}>
//                 {children === undefined || prefilled ? (
//                     <>
//                         {columnIds.map((columnId) => {
//                             return (
//                                 <ModelIndexTableHeaderCell key={columnId} field={columnId} />
//                             );
//                         })}
//                         <ModelIndexTableActionHeaderCell />
//                         {children}
//                     </>
//                 ) : (
//                     children
//                 )}
//             </TableHeaderRow>
//         </Lenses>

//     );
// };
