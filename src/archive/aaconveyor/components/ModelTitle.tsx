import { ReactNode, useContext } from 'react';

import { ModelTableContext } from '../contexts/ModelTableContext';
import { BaseComponentProps } from '../types';

interface ModelTitleProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTitle = ({ children, id, className }: ModelTitleProps) => {
  const { title } = useContext(ModelTableContext);
  return (
    <span
      id={id}
      className={className}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      {children || title}
    </span>
  );
};

export default ModelTitle;
