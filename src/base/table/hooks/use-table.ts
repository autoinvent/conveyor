export interface UseTableOptions {}

export const useTable = ({ columnIds, data, components }) => {
  const defaultComponents = {}
  const {Table, ...subComponents} = {...defaultComponents, ...components}
  return Object.assign(Table, subComponents)
  () => TableRow
};
