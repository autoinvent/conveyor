import type { Field } from "@/types";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
  NONE = "none",
}

export const DEFAULT_SORT_SEQUENCE = [
  SortDirection.ASC,
  SortDirection.DESC,
  SortDirection.NONE,
];

export const getFieldSortDirection = (
  sort: string[] | undefined,
  fieldName: string
): SortDirection => {
  if (sort?.find((fieldSort) => fieldSort === fieldName)) {
    return SortDirection.ASC;
  }
  if (sort?.find((fieldSort) => fieldSort === `-${fieldName}`)) {
    return SortDirection.DESC;
  }
  return SortDirection.NONE;
};

export const getNextSort = (
  sort: string[] | undefined,
  fieldName: string,
  sortDirectionSequence: SortDirection[] = DEFAULT_SORT_SEQUENCE
) => {
  // Function that finds new sort direction of an item in the sort array and modifies it to the new direction.
  const sortDirection = getFieldSortDirection(sort, fieldName);
  const nextSortDirection =
    sortDirectionSequence[
      (sortDirectionSequence.findIndex((sortDir) => sortDir === sortDirection) +
        1) %
        sortDirectionSequence.length
    ];
  const newSort = sort ? [...sort] : [];
  const currentFieldSortIndex = newSort.findIndex(
    (fieldSort) => fieldSort === fieldName || fieldSort === `-${fieldName}`
  );
  if (nextSortDirection === SortDirection.ASC) {
    if (currentFieldSortIndex >= 0) {
      newSort[currentFieldSortIndex] = fieldName;
    } else {
      newSort.push(fieldName);
    }
  } else if (nextSortDirection === SortDirection.DESC) {
    const newFieldSort = `-${fieldName}`;
    if (currentFieldSortIndex >= 0) {
      newSort[currentFieldSortIndex] = newFieldSort;
    } else {
      newSort.push(newFieldSort);
    }
  } else {
    if (currentFieldSortIndex >= 0) {
      newSort.splice(currentFieldSortIndex, 1);
    }
  }
  return newSort;
};

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

export const changeToNoneDirection = (
  nonSorted: Field[],
  sort: string[] = []
) => {
  // Function to remove nonSorted fields from the final sort array before being sent to magiql.

  const result = [...sort];

  for (let i = 0; i < nonSorted.length; i++) {
    const field = nonSorted[i];
    if (result.includes(field.name) || result.includes(`-${field.name}`)) {
      const deleteIndex = result.findIndex(
        (ele) => field.name === ele || field.name === `-${ele}`
      );
      result.splice(deleteIndex, 1);
    }
  }

  return result;
};

export const sortedToSort = (sorted: Field[], sort: string[] = []): string[] => {
  // Function to match the sorted array to the sort array (to maintain order)
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    const field = sorted[i];
    const sortItem = sort.find(
      (ele) => {
        return field.name === ele || `-${field.name}` === ele
      }
    );
    if (sortItem) result.push(sortItem);
    else result.push(field.name);
    
  }

  return result;
}
export interface DividedFields {
  sorted: Field[];
  nonSorted: Field[];
}

export const getSortedAndNonSortedFields = (
  sortableFields: Field[],
  sort: string[] = []
): DividedFields => {
  // @params state.tableView?.sort = sort
  // return object with sorted and nonSorted fields

  const result: DividedFields = { sorted: [], nonSorted: [] };

  const sortableFieldsCopy = [...sortableFields];

  // first add all elements from sort in order to sorted fields
  for (const ele of sort) {
        const idx = sortableFieldsCopy.findIndex((field) => ele === field.name || ele === `-${field.name}` );
        result.sorted.push(sortableFieldsCopy[idx]);
        sortableFieldsCopy.splice(idx, 1);
  }

  // then add remainder of elements to nonsorted fields
  for (let i = 0; i < sortableFieldsCopy.length; i++) {
    const field = sortableFieldsCopy[i];
    result.nonSorted.push(field);
  }

   return result;
};
