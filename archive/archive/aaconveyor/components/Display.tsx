import { ReactNode, useContext } from 'react';
import { DisplayKeyContext } from '../contexts/DisplayKeyContext';

interface DisplayProps {
  activeKey: string;
  children: ReactNode;
}

const Display = ({ activeKey, children }: DisplayProps) => {
  const displayKey = useContext(DisplayKeyContext);
  return displayKey === activeKey ? children : null;
};

export default Display;