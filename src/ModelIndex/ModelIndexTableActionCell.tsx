// import { ButtonGroup, Button } from 'react-bootstrap';
// import {
//   FaRegTrashAlt,
//   FaEdit,
//   FaRegSave,
//   FaRegTimesCircle,
// } from 'react-icons/fa';
// import { useStore } from '@tanstack/react-store';

// import { Lens, useLenses, DataLens } from '@/Lenses';
// import { TableCell } from '@/Table';
// import { CommonProps, WrapperProp } from '@/types';

// import { MODEL_INDEX_TABLE_ACTION_SLOT } from './ModelIndexTable'
// import { useModelIndexStore } from './useModelIndexStore';

// export interface ModelIndexTableActionCellProps
//   extends CommonProps,
//   WrapperProp { }

// export const ModelIndexTableActionCell = ({
//   children,
//   id,
//   className,
//   style,
// }: ModelIndexTableActionCellProps) => {
//   const { setLens } = useLenses();
//   const modelIndexStore = useModelIndexStore();
//   const { } = useStore(modelIndexStore, (state) => ({
//     data: state.data,
//     fields: state.fields,
//     actionsConfig: state.actionsConfig,
//   }));

//   const onEdit = () => setLens(DataLens.EDITING);
//   const onCancelEdit = () => setLens(DataLens.DISPLAY);

//   return (
//     <TableCell columnId={MODEL_INDEX_TABLE_ACTION_SLOT} id={id} className={className} style={style}>
//       {children === undefined ? (
//         <ButtonGroup>
//           <Lens lens={DataLens.DISPLAY}>
//             <Button variant='outline-primary' onClick={onEdit}>
//               <FaEdit />
//             </Button>
//             <Button variant='outline-danger'>
//               <FaRegTrashAlt />
//             </Button>
//           </Lens>
//           <Lens lens={DataLens.EDITING}>
//             <Button variant='outline-success'>
//               <FaRegSave />
//             </Button>
//             <Button variant='outline-primary' onClick={onCancelEdit}>
//               <FaRegTimesCircle />
//             </Button>
//           </Lens>
//         </ButtonGroup>
//       ) : (
//         children
//       )}
//     </TableCell>
//   );
// };
