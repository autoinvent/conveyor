
// import { Lenses, DataLens } from '@/Lenses';
// import { TableRow, TableRowProps, useTable } from '@/Table';

// import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
// import { ModelIndexTableCell } from './ModelIndexTableCell';

// export interface ModelIndexTableRowProps extends TableRowProps { }

// export const ModelIndexTableRow = ({
//   prefilled,
//   children,
//   id,
//   className,
//   style,
// }: ModelIndexTableRowProps) => {
//   const { table: columnIds }: { table: string[] } = useTable((state) => state.columnIds);
//   return (
//     <Lenses activeLens={DataLens.DISPLAY}>
//       <TableRow prefilled={false} id={id} className={className} style={style}>
//         {children === undefined || prefilled ? (
//           <>
//             {columnIds.map((columnId) => {
//               return <ModelIndexTableCell key={columnId} field={columnId} />;
//             })}
//             <ModelIndexTableActionCell />
//             {children}
//           </>
//         ) : (
//           children
//         )}
//       </TableRow>
//     </Lenses>
//   );
// };
