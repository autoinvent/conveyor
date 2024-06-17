import type { RegisterOptions } from 'react-hook-form';

export interface Field {
  name: string;
  type: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  sortable?: boolean;
  editable?: boolean;
}
