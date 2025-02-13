import { FieldType } from '@/model/magql/constants';

export const DEFAULT_TYPES = {
  [FieldType.ID]: {
    DisplayComponent: () => <div>hello</div>,
    InputComponent: () => <div>world</div>,
  },
} as const;
