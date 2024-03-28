// import { ReactNode, useEffect, useState } from 'react';
// import { Store } from '@tanstack/react-store';

// import { useIsFirstRender } from '@/hooks';
// import { CommonProps, WrapperProp, DataType } from '@/types';

// import { ModelIndexTable } from './ModelIndexTable';
// import { ModelIndexStore, ModelIndexStoreContext } from './ModelIndexStoreContext';

// export interface ModelIndexProps extends CommonProps, WrapperProp {
//   data: DataType[]
// }

// export const ModelIndex = Object.assign(
//   ({
//     data,
//     children,
//     id,
//     className,
//     style,
//   }: ModelIndexProps) => {
//     const isFirstRender = useIsFirstRender();
//     const [modelIndexStore] = useState(new Store<ModelIndexStore>({ data }));

//     useEffect(() => {
//       if (!isFirstRender.current) {
//         modelIndexStore.setState((state) => {
//           return {
//             ...state,
//             data,
//           };
//         });
//       }
//     }, [data]);

//     return (
//       <div id={id} className={className} style={style}>
//         <ModelIndexStoreContext.Provider value={modelIndexStore}>
//           {children}
//         </ModelIndexStoreContext.Provider>
//       </div>
//     );
//   },
//   {
//     // Title: ModelIndexTitle,
//     // Tools: ModelIndexTools,
//     Table: ModelIndexTable,
//     // Pagination: ModelIndexPagination,
//   },
// );
