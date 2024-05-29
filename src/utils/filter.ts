import type { TableViewFilter } from '@/types';

export const addFilter = (
  filters: TableViewFilter[][] | undefined,
  filter: TableViewFilter,
  filterGroup = 0,
) => {
  const newFilters = filters ? [...filters] : [];
  if (filterGroup > newFilters.length || filterGroup < 0) {
    if (newFilters.length === 0) {
      throw new Error('filter is empty, try filterGroup = 0 first!');
    }
    throw new Error(`filterGroup must be between 0 and ${newFilters.length}!`);
  }

  if (filterGroup === newFilters.length) {
    newFilters.push([filter]);
  } else {
    newFilters[filterGroup].push(filter);
  }
  return newFilters;
};

export const removeFilter = (
  filters: TableViewFilter[][] | undefined,
  filterGroup: number,
  filterGroupIndex: number,
) => {
  const newFilters = filters ? [...filters] : [];
  if (
    filterGroup >= newFilters.length ||
    filterGroup < 0 ||
    filterGroupIndex >= newFilters[filterGroup].length ||
    filterGroupIndex < 0
  ) {
    throw new Error('filter at the specified location does not exist!');
  }

  if (newFilters[filterGroup].length === 1) {
    newFilters.splice(filterGroup, 1);
  } else {
    newFilters[filterGroup].splice(filterGroupIndex, 1);
  }

  return newFilters;
};

export const swapFilter = (
  filters: TableViewFilter[][] | undefined,
  filterGroup1: number,
  filterGroupIndex1: number,
  filterGroup2: number,
  filterGroupIndex2: number,
) => {
  const newFilters = filters ? [...filters] : [];
  if (
    filterGroup1 >= newFilters.length ||
    filterGroup1 < 0 ||
    filterGroupIndex1 >= newFilters[filterGroup1].length ||
    filterGroupIndex1 < 0 ||
    filterGroup2 >= newFilters.length ||
    filterGroup2 < 0 ||
    filterGroupIndex2 >= newFilters[filterGroup2].length ||
    filterGroupIndex2 < 0
  ) {
    throw new Error('Both filter indicies must be valid!');
  }

  const filter1 = newFilters[filterGroup1][filterGroupIndex1];
  newFilters[filterGroup1][filterGroupIndex1] =
    newFilters[filterGroup2][filterGroupIndex2];
  newFilters[filterGroup2][filterGroupIndex2] = filter1;

  return newFilters;
};
