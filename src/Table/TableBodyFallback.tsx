import { useStore } from '@tanstack/react-store';

import { WrapperProp } from '@/types';

import { useTableStore } from './useTableStore';

export interface TableBodyFallbackProps extends WrapperProp {}

export const TableBodyFallback = ({ children }: TableBodyFallbackProps) => {
  const tableStore = useTableStore();
  const columnIdsLength = useStore(
    tableStore,
    (state) => state.columnIds.length,
  );
  return (
    <tbody>
      <tr>
        <td colSpan={columnIdsLength}>
          {children === undefined ? 'No Records Found.' : children}
        </td>
      </tr>
    </tbody>
  );
};
