import { ReactNode } from 'react';

import { MODEL_HEADING_SLOT } from '../constants';
import { BaseComponentProps } from '../types';
import Slot from './Slot';

interface ModelHeadingProps extends BaseComponentProps {
  children: ReactNode;
}

const ModelHeading = ({ children, id, className }: ModelHeadingProps) => {
  return (
    <Slot slotKey={MODEL_HEADING_SLOT}>
      <h3
        id={id}
        className={className}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {children}
      </h3>
    </Slot>
  );
};

export default ModelHeading;
