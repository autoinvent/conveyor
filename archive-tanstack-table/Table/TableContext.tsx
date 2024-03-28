import { createContext } from 'react';
import { Table } from '@tanstack/react-table';

import { DataType } from '@/types';

export const TableContext = createContext<Table<DataType> | undefined>(
  undefined,
);
