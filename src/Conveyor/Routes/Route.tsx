import { ReactNode, useEffect, useId } from 'react';

import { RouteType } from './RoutesStoreContext';
import { useRoutes } from './useRoutes';

export interface RouteProps {
  path: string;
  children?: ReactNode;
}

export const Route = ({ path, children }: RouteProps) => {
  const refId = useId();
  const { setRoute } = useRoutes();

  useEffect(() => {
    setRoute((state) => {
      const currRoute = state.routes[path];
      const newRoute: RouteType = { node: children, refIds: [refId] };
      if (currRoute) {
        if (currRoute.refIds.includes(refId)) {
          // Return the same state if an old refId is being used
          if (currRoute.refIds[0] !== refId) {
            return state;
          } else {
            // No need to update refIds if using the latest refId
            newRoute.refIds = currRoute.refIds;
          }
        } else {
          // New refId is being used; update refIds
          newRoute.refIds = [refId, ...currRoute.refIds];
        }
      }
      return {
        ...state,
        routes: {
          ...state.routes,
          [path]: newRoute,
        },
      };
    });
  }, [children]);
  return null;
};
