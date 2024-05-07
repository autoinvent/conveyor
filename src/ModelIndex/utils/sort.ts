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

export const getCurrentSortDirection = (
  sort: string[],
  field: string,
): SortDirection => {
  let currSort = SortDirection.NONE;
  sort?.forEach((f: string, index) => {
    if (f.endsWith(field)) {
      if (f.length === field.length) {
        currSort = SortDirection.ASC;
      } else if (f.length === field.length + 1 && f.charAt(0) === '-') {
        currSort = SortDirection.DESC;
      }
    }
  });
  return currSort;
};

export const nextSort = (
  sort: string[],
  field: string,
  sortSequence = DEFAULT_SORT_SEQUENCE,
) => {
  const sortSequenceMap = Object.fromEntries(
    sortSequence.map((seq, index) => [seq, index]),
  );
  const nextSortHelper = (
    sortArray: string[],
    currIndex: number,
    currSortDirection: SortDirection,
  ) => {
    const nextSortKey =
      sortSequence[
        (sortSequenceMap[currSortDirection] + 1) % sortSequence.length
      ];
    if (nextSortKey === SortDirection.ASC) {
      sortArray[currIndex] = field;
    } else if (nextSortKey === SortDirection.DESC) {
      sortArray[currIndex] = `-${field}`;
    } else {
      sortArray.splice(currIndex, 1);
    }
  };

  const newSort = sort ? [...sort] : [];
  // Keeps track of whether sort already contains field or not
  let found = false;
  // Updates the sort value of the field if it exists
  newSort.forEach((f: string, index) => {
    if (f.endsWith(field)) {
      if (f.length === field.length) {
        found = true;
        nextSortHelper(newSort, index, SortDirection.ASC);
      } else if (f.length === field.length + 1 && f.charAt(0) === '-') {
        found = true;
        nextSortHelper(newSort, index, SortDirection.DESC);
      }
    }
  });
  // Append the new sort field if it didn't exist
  if (!found) {
    newSort.push(field);
    nextSortHelper(newSort, newSort.length - 1, SortDirection.NONE);
  }
  return newSort;
};

export const swapSort = (sort: string[], index1: number, index2: number) => {
  const newSort = sort ? [...sort] : [];
  if (
    index1 >= newSort.length ||
    index2 >= newSort.length ||
    index1 < 0 ||
    index2 < 0
  ) {
    throw new Error('index1 and index2 must be valid indicies!');
  }

  const field1Sort = newSort[index1];
  newSort[index1] = newSort[index2];
  newSort[index2] = field1Sort;

  return newSort;
};
