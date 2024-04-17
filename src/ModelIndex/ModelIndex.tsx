// import { HTMLAttributes, useEffect, useState } from 'react';
// import { Store } from '@tanstack/react-store';

// import { useAlerts } from '@/Alerts';
// import { useModelListQuery } from '@/Conveyor';
// import { DataType } from '@/Data';
// import { useStoreSetStateEffect } from '@/hooks';
// import { FetchHandler } from '@/types';
// import { humanizeText } from '@/utils';

// import { ModelIndexTable } from './ModelIndexTable';
// import { ModelIndexTitle } from './ModelIndexTitle';
// import {
//   ModelIndexStore,
//   ModelIndexStoreContext,
// } from './ModelIndexStoreContext';
// import { ActionsConfig } from './types';

// export interface ModelIndexProps extends HTMLAttributes<HTMLDivElement> {
//   model: string;
//   fields: string[];
//   data?: DataType[] | undefined;
//   onModelListQuerySuccess?: FetchHandler['onSuccess'];
//   onModelListQueryError?: FetchHandler['onError'];
//   actionsConfig?: ActionsConfig;
// }

// export const ModelIndex = Object.assign(
//   ({
//     model,
//     fields,
//     data,
//     children,
//     onModelListQuerySuccess,
//     onModelListQueryError,
//     actionsConfig,
//     ...props
//   }: ModelIndexProps) => {
//     const { addAlert } = useAlerts();
//     const [modelIndexStore] = useState(
//       new Store<ModelIndexStore>({
//         model,
//         fields,
//         data: data ?? [],
//         actionsConfig,
//       }),
//     );
//     const {
//       data: queryData,
//       error,
//       isLoading,
//       isError,
//       isSuccess,
//       operationName,
//     } = useModelListQuery({ model, fields, enabled: data === undefined });
//     const modelDisplayName = humanizeText(model);

//     useStoreSetStateEffect({
//       store: modelIndexStore,
//       setState: (state) => ({ ...state, model }),
//       deps: [model]
//     });
//     useStoreSetStateEffect({
//       store: modelIndexStore,
//       setState: (state) => ({ ...state, fields }),
//       deps: [fields]
//     });
//     useStoreSetStateEffect({
//       store: modelIndexStore,
//       setState: (state) => ({ ...state, data: data ?? [] }),
//       deps: [model]
//     });
//     useStoreSetStateEffect({
//       store: modelIndexStore,
//       setState: (state) => ({ ...state, actionsConfig }),
//       deps: [actionsConfig]
//     });

//     useEffect(() => {
//       if (isLoading === false) {
//         if (isSuccess) {
//           onModelListQuerySuccess
//             ? onModelListQuerySuccess(data)
//             : addAlert({
//               content: `Successfully fetched ${modelDisplayName} list!`,
//               expires: 3000,
//             });
//           queryData[operationName].items;
//           modelIndexStore.setState((state) => {
//             return {
//               ...state,
//               data: queryData[operationName].items,
//             };
//           });
//         } else if (isError) {
//           onModelListQueryError
//             ? onModelListQueryError(error)
//             : addAlert({
//               content: `Failed to fetch ${modelDisplayName} list: ${error}`,
//             });
//         }
//       }
//     }, [data, isLoading, isSuccess, isError]);

//     return (
//       <div {...props}>
//         <ModelIndexStoreContext.Provider value={modelIndexStore}>
//           {children === undefined ? (
//             <>
//               <ModelIndex.Title>{modelDisplayName}</ModelIndex.Title>
//               <ModelIndex.Table />
//             </>
//           ) : (
//             children
//           )}
//         </ModelIndexStoreContext.Provider>
//       </div>
//     );
//   },
//   {
//     Title: ModelIndexTitle,
//     Table: ModelIndexTable,
//   },
// );
