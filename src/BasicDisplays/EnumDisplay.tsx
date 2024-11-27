import { forwardRef } from 'react';

import { humanizeText } from '@/utils';

import { ModelDisplay, type ModelDisplayProps } from './ModelDisplay';

export const EnumDisplay = forwardRef<HTMLSpanElement, ModelDisplayProps>(
  (
    {
      getDisplayValue = (val) => {
        return val ? humanizeText(val) : 'None';
      },
      ...props
    },
    ref,
  ) => {
    return <ModelDisplay ref={ref} {...props} />;
  },
);
