import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { RoutesStore, RoutesStoreContext } from './RoutesStoreContext';

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

  const setRoute = (setState: (state: RoutesStore) => RoutesStore) => {
    routesStore?.setState(setState);
  };
  return { routes, setRoute };
};
