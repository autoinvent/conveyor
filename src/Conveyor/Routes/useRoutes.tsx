import { ReactNode, useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { RouteType, RoutesStoreContext } from './RoutesStoreContext';

export const useRoutes = () => {
  let routesStore = useContext(RoutesStoreContext);
  if (!routesStore) {
    throw new Error(
      'useRoutes must be used within RouteStoreContext.Provider.',
    );
  }
  const routes = useStore(routesStore, (state) => {
    const routes = state.routes;
    return Object.keys(routes).map((path) => ({
      path,
      component: routes[path].node,
    }));
  });

  const setRoute = ({
    path,
    node,
    refId,
  }: { path: string; node: ReactNode; refId: string }) => {
    routesStore.setState((state) => {
      const currRoute = state.routes[path];
      const newRoute: RouteType = { node, refIds: [refId] };
      if (currRoute) {
        // Return the same state if the refId has been seen before
        if (currRoute.refIds.includes(refId)) {
          return state
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
  };
  return { routes, setRoute };
};
