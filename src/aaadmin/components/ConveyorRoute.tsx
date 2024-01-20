import { ReactNode } from 'react';
import { Route, PathRouteProps } from 'react-router-dom';

import Slot from '../../aaconveyor/components/Slot';

interface ConveyorRouteProps extends PathRouteProps {
  path: string;
  children?: ReactNode;
}

const ConveyorRoute = ({
  path,
  children,
  element,
  ...props
}: ConveyorRouteProps) => {
  return (
    <Slot slotKey={path}>
      <Route {...props} path={path} element={element || children} />
    </Slot>
  );
};

export default ConveyorRoute;
