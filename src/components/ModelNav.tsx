import { useContext, ReactNode } from 'react';

import { ConveyorContext } from '../contexts/ConveyorContext';
import { PACKAGE_ABBR } from '../package';
import { BaseProps } from '../types';

interface ModelNavProps extends BaseProps {
  modelName?: string;
  modelId?: string;
  children: ReactNode;
}

const ModelNav = ({
  id,
  className = '',
  modelName,
  modelId,
  children,
}: ModelNavProps) => {
  const { navigate } = useContext(ConveyorContext);
  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: TODO
    <span
      id={id}
      className={`${PACKAGE_ABBR}-model-nav ${className}`}
      onClick={() => navigate({ modelName, id: modelId })}
    >
      {children}
    </span>
  );
};

export default ModelNav;
