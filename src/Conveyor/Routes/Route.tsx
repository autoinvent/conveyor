import { ReactNode, useEffect, useId } from 'react';

import { useRoutes } from './useRoutes';

export interface RouteProps {
  path: string;
  children?: ReactNode;
}

export const Route = ({ path, children }: RouteProps) => {
  const refId = useId();
  const { setRoute } = useRoutes();
  useEffect(() => {
    setRoute({ path, node: children, refId });
  }, [children]);
  return null;
};
