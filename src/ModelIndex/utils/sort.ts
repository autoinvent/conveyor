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

export const getFieldSortDirection = (
  sort: string[] | undefined,
  fieldName: string,
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
  sortDirectionSequence: SortDirection[] = DEFAULT_SORT_SEQUENCE,
) => {
  const sortDirection = getFieldSortDirection(sort, fieldName);
  const nextSortDirection =
    sortDirectionSequence[
      (sortDirectionSequence.findIndex((sortDir) => sortDir === sortDirection) +
        1) %
        sortDirectionSequence.length
    ];
  const newSort = sort ? [...sort] : [];
  const currentFieldSortIndex = newSort.findIndex(
    (fieldSort) => fieldSort === fieldName || fieldSort === `-${fieldName}`,
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
