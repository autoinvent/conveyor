import { useContext } from 'react';

import { TableRowContext } from './TableRowContext';

export const useTableRow = () => {
    const tableRow = useContext(TableRowContext);
    return tableRow
};
