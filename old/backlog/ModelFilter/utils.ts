import type { FilterItem } from '@/types';

export const addFilter = (
  filter: FilterItem[][] | undefined,
  filterItem: FilterItem,
  filterGroup: number,
) => {
  const newFilter = filter ? [...filter] : [];
  if (filterGroup > newFilter.length || filterGroup < 0) {
    if (newFilter.length === 0) {
      throw new Error('filter is empty, try filterGroup = 0 first!');
    }
    throw new Error(`filterGroup must be between 0 and ${newFilter.length}!`);
  }

  if (filterGroup === newFilter.length) {
    newFilter.push([filterItem]);
  } else {
    newFilter[filterGroup] = [...newFilter[filterGroup], filterItem];
  }
  return newFilter;
};

export const removeFilter = (
  filter: FilterItem[][] | undefined,
  filterGroup: number,
  filterGroupIndex: number,
) => {
  const newFilter = filter ? [...filter] : [];
  if (
    filterGroup >= newFilter.length ||
    filterGroup < 0 ||
    filterGroupIndex >= newFilter[filterGroup].length ||
    filterGroupIndex < 0
  ) {
    throw new Error('Filter at the specified location does not exist!');
  }

  if (newFilter[filterGroup].length === 1) {
    newFilter.splice(filterGroup, 1);
  } else {
    newFilter[filterGroup] = [...newFilter[filterGroup]];
    newFilter[filterGroup].splice(filterGroupIndex, 1);
  }

  return newFilter;
};

export const changeFilter = (
  filter: FilterItem[][] | undefined,
  filterItem: FilterItem,
  filterGroup: number,
  filterGroupIndex: number,
  newFilterGroup = filterGroup,
) => {
  let newFilter = filter ? [...filter] : [];

  if (
    filterGroup >= newFilter.length ||
    filterGroup < 0 ||
    filterGroupIndex >= newFilter[filterGroup].length ||
    filterGroupIndex < 0
  ) {
    throw new Error('Filter at the specified location does not exist!');
  }
  if (newFilterGroup > newFilter.length || newFilterGroup < 0) {
    if (newFilter.length === 0) {
      throw new Error('filter is empty, try newFilterGroup = 0 first!');
    }
    throw new Error(
      `newFilterGroup must be between 0 and ${newFilter.length}!`,
    );
  }

  if (filterGroup === newFilterGroup) {
    newFilter[filterGroup] = [...newFilter[filterGroup]];
    newFilter[filterGroup][filterGroupIndex] = filterItem;
  } else {
    const removedFilter = removeFilter(
      newFilter,
      filterGroup,
      filterGroupIndex,
    );
    if (removedFilter.length === newFilter.length) {
      newFilter = addFilter(removedFilter, filterItem, newFilterGroup);
    } else if (newFilterGroup > filterGroup) {
      newFilter = addFilter(removedFilter, filterItem, newFilterGroup - 1);
    } else {
      newFilter = addFilter(removedFilter, filterItem, newFilterGroup);
    }
  }

  return newFilter;
};

export const swapFilter = (
  filters: FilterItem[][] | undefined,
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
