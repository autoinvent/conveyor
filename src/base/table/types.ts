import type { Data } from '@/base/types';

export interface TableState {
  columnIds: string[];
  data?: Data[];
}
