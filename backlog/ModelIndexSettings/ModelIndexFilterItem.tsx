// import { CirclePlus, CircleMinus, Save } from 'lucide-react';

// import { Button } from '@/lib/components/ui/button';

// import {
//   FormInput,
//   useFormStore,
//   StringInput,
//   SelectInput,
//   type FormState,
// } from '@/Form';

// import { useModelIndexStore } from '../useModelIndexStore';
// import { addFilter, removeFilter, changeFilter } from '../utils';

// import { FieldTypes } from '@/types';
// import { humanizeText } from '@/utils';

// export interface FilterItemValues {
//   group: number;
//   groupIndex: number;
//   path: string;
//   op: string;
//   not: boolean;
//   value: string;
// }

// export const FILTER_OPERATIONS: Record<
//   string,
//   { label: string; value: string }[]
// > = {
//   [FieldTypes.ID]: [{ label: 'equal to', value: 'eq' }],
//   [FieldTypes.STRING]: [
//     { label: 'equal to', value: 'eq' },
//     { label: 'like', value: 'like' },
//   ],
//   [FieldTypes.BOOLEAN]: [{ label: 'equal to', value: 'eq' }],
//   [FieldTypes.INT]: [
//     { label: 'equal to', value: 'eq' },
//     { label: 'less than', value: 'lt' },
//     { label: 'less than or equal to', value: 'le' },
//     { label: 'greater than', value: 'gt' },
//     { label: 'greater than or equal to', value: 'ge' },
//   ],
//   [FieldTypes.FLOAT]: [
//     { label: 'equal to', value: 'eq' },
//     { label: 'less than', value: 'lt' },
//     { label: 'less than or equal to', value: 'le' },
//     { label: 'greater than', value: 'gt' },
//     { label: 'greater than or equal to', value: 'ge' },
//   ],
//   [FieldTypes.DATETIME]: [
//     { label: 'equal to', value: 'eq' },
//     { label: 'less than', value: 'lt' },
//     { label: 'less than or equal to', value: 'le' },
//     { label: 'greater than', value: 'gt' },
//     { label: 'greater than or equal to', value: 'ge' },
//   ],
// };

// export interface ModelIndexFilterItem {
//   showAddFilter?: boolean;
//   showSaveFilter?: boolean;
//   showRemoveFilter?: boolean;
// }
// export const ModelIndexFilterItem = ({
//   showAddFilter,
//   showSaveFilter,
//   showRemoveFilter,
// }: ModelIndexFilterItem) => {
//   const watch = useFormStore((state) => state.watch);
//   const defaultValues = useFormStore((state) => state.formState.defaultValues);
//   const handleSubmit = useFormStore(
//     (state: FormState<FilterItemValues>) => state.handleSubmit,
//   );
//   const reset = useFormStore((state) => state.reset);
//   const resetField = useFormStore((state) => state.resetField);
//   const isValid = useFormStore((state) => state.formState.isValid);
//   const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
//   const fields = useModelIndexStore((state) => state.fields);
//   const filter = useModelIndexStore(
//     (state) => state.tableViewOptions.tableView.filter,
//   );
//   const onTableViewChange = useModelIndexStore(
//     (state) => state.tableViewOptions.onTableViewChange,
//   );
//   const path = watch('path');
//   const field = fields.find((field) => field.name === path);
//   const filterLength = filter?.length ?? 0;

//   const onAddFilter = ({
//     group,
//     groupIndex,
//     ...filterItem
//   }: FilterItemValues) => {
//     const newFilter = addFilter(filter, filterItem, group);
//     onTableViewChange({ filter: newFilter });
//     reset();
//   };
//   const onSaveFilter = ({
//     group,
//     groupIndex,
//     ...filterItem
//   }: FilterItemValues) => {
//     const newFilter = changeFilter(
//       filter,
//       filterItem,
//       defaultValues.group,
//       defaultValues.groupIndex,
//       group,
//     );
//     onTableViewChange({ filter: newFilter });
//     reset();
//   };
//   const onRemoveFilter = () => {
//     const newFilter = removeFilter(
//       filter,
//       defaultValues.group,
//       defaultValues.groupIndex,
//     );
//     onTableViewChange({ filter: newFilter });
//   };
//   return (
//     <div className="flex space-x-2">
//       <FormInput
//         name="group"
//         rules={{ required: 'Group is required.' }}
//         render={(props) => {
//           return (
//             <SelectInput
//               options={[...Array(filterLength + 1).keys()].map((group) => ({
//                 label: (group + 1).toString(),
//                 value: group,
//               }))}
//               {...props}
//             />
//           );
//         }}
//       />
//       <FormInput
//         name="path"
//         rules={{ required: 'Field is required.' }}
//         render={({ inputProps, ...restProps }) => {
//           const newInputProps = { ...inputProps };
//           newInputProps.onChange = (newVal) => {
//             resetField('not');
//             resetField('op');
//             resetField('value');
//             inputProps.onChange(newVal);
//           };
//           return (
//             <SelectInput
//               options={fields.map(({ name }) => ({
//                 label: humanizeText(name),
//                 value: name,
//               }))}
//               className="min-w-48"
//               placeHolder="Select a field..."
//               inputProps={newInputProps}
//               {...restProps}
//             />
//           );
//         }}
//       />
//       <FormInput
//         name="not"
//         render={(props) => {
//           return (
//             <SelectInput
//               className="min-w-20"
//               options={[
//                 { label: 'is', value: false },
//                 { label: 'is not', value: true },
//               ]}
//               {...props}
//             />
//           );
//         }}
//       />
//       <FormInput
//         name="op"
//         rules={{ required: 'Operation is required.' }}
//         render={(props) => {
//           return (
//             <SelectInput
//               className="min-w-48"
//               options={field?.type ? FILTER_OPERATIONS[field.type] : []}
//               placeHolder="Select an operation..."
//               disabled={!path}
//               {...props}
//             />
//           );
//         }}
//       />
//       <FormInput
//         name="value"
//         disabled={!path}
//         render={(props) => (
//           <StringInput
//             className="min-w-48"
//             placeholder="(optional) value..."
//             {...props}
//           />
//         )}
//       />
//       <div className="flex">
//         {showAddFilter && (
//           <Button
//             type="submit"
//             disabled={!isValid}
//             onClick={handleSubmit(onAddFilter)}
//             variant="outline-success"
//             className="px-2"
//           >
//             <CirclePlus />
//           </Button>
//         )}
//         {showSaveFilter && (
//           <Button
//             type="submit"
//             disabled={!isValid || Object.keys(dirtyFields).length === 0}
//             onClick={handleSubmit(onSaveFilter)}
//             variant="outline-success"
//             className="px-2"
//           >
//             <Save />
//           </Button>
//         )}
//         {showRemoveFilter && (
//           <Button
//             onClick={onRemoveFilter}
//             variant="outline-destructive"
//             className="px-2"
//           >
//             <CircleMinus />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };
