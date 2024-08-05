import type { TableView } from '@/types';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export const DEFAULT_SORT_SEQUENCE = [
  SortDirection.ASC,
  SortDirection.DESC,
  SortDirection.NONE,
];

export interface FieldSortProps {
  sortOrder: TableView['sort'];
  field: string;
}

export const getFieldSortDirection = ({
  sortOrder,
  field,
}: FieldSortProps): SortDirection => {
  if (sortOrder?.find((fieldSort) => fieldSort === field)) {
    return SortDirection.ASC;
  }
  if (sortOrder?.find((fieldSort) => fieldSort === `-${field}`)) {
    return SortDirection.DESC;
  }
  return SortDirection.NONE;
};

export const setFieldSort = ({
  sortOrder,
  field,
  newSortDirection,
}: { newSortDirection: SortDirection } & FieldSortProps) => {
  const newSortOrder = sortOrder ? [...sortOrder] : [];
  const currentFieldSortIndex = newSortOrder.findIndex(
    (fieldSort) => fieldSort === field || fieldSort === `-${field}`,
  );
  // Sets field sort to be ascending
  if (newSortDirection === SortDirection.ASC) {
    // If the field in already in the sortOrder, replace it with the new sort;
    // otherwise, add (push) it into the newSortOrder
    if (currentFieldSortIndex >= 0) {
      newSortOrder[currentFieldSortIndex] = field;
    } else {
      newSortOrder.push(field);
    }
  }
  // Sets field sort to be descending
  else if (newSortDirection === SortDirection.DESC) {
    const newFieldSort = `-${field}`;
    // If the field in already in the sortOrder, replace it with the new sort;
    // otherwise, add (push) it into the newSortOrder
    if (currentFieldSortIndex >= 0) {
      newSortOrder[currentFieldSortIndex] = newFieldSort;
    } else {
      newSortOrder.push(newFieldSort);
    }
  }
  // Sets field sort to be none
  else {
    // If the field in already in the sortOrder, remove it from the newSortOrder;
    // otherwise, do nothing
    if (currentFieldSortIndex >= 0) {
      newSortOrder.splice(currentFieldSortIndex, 1);
    }
  }
  return newSortOrder;
};

// export const getNextSort = (
//   sort: string[] | undefined,
//   field: string,
//   sortDirectionSequence: SortDirection[] = DEFAULT_SORT_SEQUENCE,
// ) => {
//   // Function that finds new sort direction of an item in the sort array and modifies it to the new direction.
//   const sortDirection = getFieldSortDirection(sort, field);
//   const nextSortDirection =
//     sortDirectionSequence[
//       (sortDirectionSequence.findIndex((sortDir) => sortDir === sortDirection) +
//         1) %
//         sortDirectionSequence.length
//     ];
//   const newSort = sort ? [...sort] : [];
//   const currentFieldSortIndex = newSort.findIndex(
//     (fieldSort) => fieldSort === field || fieldSort === `-${field}`,
//   );
//   if (nextSortDirection === SortDirection.ASC) {
//     if (currentFieldSortIndex >= 0) {
//       newSort[currentFieldSortIndex] = field;
//     } else {
//       newSort.push(field);
//     }
//   } else if (nextSortDirection === SortDirection.DESC) {
//     const newFieldSort = `-${field}`;
//     if (currentFieldSortIndex >= 0) {
//       newSort[currentFieldSortIndex] = newFieldSort;
//     } else {
//       newSort.push(newFieldSort);
//     }
//   } else {
//     if (currentFieldSortIndex >= 0) {
//       newSort.splice(currentFieldSortIndex, 1);
//     }
//   }
//   return newSort;
// };

// export const swapSort = (
//   sort: string[] | undefined,
//   index1: number,
//   index2: number,
// ) => {
//   const newSort = sort ? [...sort] : [];
//   if (
//     index1 >= newSort.length ||
//     index2 >= newSort.length ||
//     index1 < 0 ||
//     index2 < 0
//   ) {
//     throw new Error('index1 and index2 must be valid indicies!');
//   }

//   const field1Sort = newSort[index1];
//   newSort[index1] = newSort[index2];
//   newSort[index2] = field1Sort;

//   return newSort;
// };

/**
 * FOR SORT UI
 *
 */
// export const changeToNoneDirection = (
//   nonSorted: Field[],
//   sort: string[] = [],
// ) => {
//   // Function to remove nonSorted fields from the final sort array before being sent to magiql.

//   const result = [...sort];

//   for (let i = 0; i < nonSorted.length; i++) {
//     const field = nonSorted[i];
//     if (result.includes(field.name) || result.includes(`-${field.name}`)) {
//       const deleteIndex = result.findIndex(
//         (ele) => field.name === ele || field.name === `-${ele}`,
//       );
//       result.splice(deleteIndex, 1);
//     }
//   }

//   return result;
// };

// export const sortedToSort = (
//   sorted: Field[],
//   sort: string[] = [],
// ): string[] => {
//   // Function to match the sorted array to the sort array (to maintain order)
//   const result = [];

//   for (let i = 0; i < sorted.length; i++) {
//     const field = sorted[i];
//     const sortItem = sort.find((ele) => {
//       return field.name === ele || `-${field.name}` === ele;
//     });
//     if (sortItem) result.push(sortItem);
//     else result.push(field.name);
//   }

//   return result;
// };
// export interface DividedFields {
//   sorted: Field[];
//   nonSorted: Field[];
// }

// export const getSortedAndNonSortedFields = (
//   sortableFields: Field[],
//   sort: string[] = [],
// ): DividedFields => {
//   // @params state.tableView?.sort = sort
//   // return object with sorted and nonSorted fields

//   const result: DividedFields = { sorted: [], nonSorted: [] };

//   const sortableFieldsCopy = [...sortableFields];

//   // first add all elements from sort in order to sorted fields
//   for (const ele of sort) {
//     const idx = sortableFieldsCopy.findIndex(
//       (field) => ele === field.name || ele === `-${field.name}`,
//     );
//     result.sorted.push(sortableFieldsCopy[idx]);
//     sortableFieldsCopy.splice(idx, 1);
//   }

//   // then add remainder of elements to nonsorted fields
//   for (let i = 0; i < sortableFieldsCopy.length; i++) {
//     const field = sortableFieldsCopy[i];
//     result.nonSorted.push(field);
//   }

//   return result;
// };
