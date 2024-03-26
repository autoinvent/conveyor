import { createContext } from 'react';
import { Row } from '@tanstack/react-table';

import { DataType } from '@/types';

export const TableRowContext = createContext<Row<DataType> | undefined>(undefined);
