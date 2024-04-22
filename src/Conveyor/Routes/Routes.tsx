import { ComponentType, ReactNode, useMemo, useState } from 'react';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Store, useStore } from '@tanstack/react-store';

import { RoutesStore, RoutesStoreContext } from './RoutesStoreContext';

export interface RoutesProps {
  RootComponent?: ComponentType;
  children?: ReactNode;
}

export const Routes = ({ RootComponent = Outlet, children }: RoutesProps) => {
  const [routesStore] = useState(new Store<RoutesStore>({ routes: {} }));
  const routes = useStore(routesStore, (state) => state.routes);

  const routerProvider = useMemo(() => {
    let currRouterProvier = null;
    const routeObjs = Object.entries(routes).map((routeEntry) => ({
      path: routeEntry[0],
      component: () => routeEntry[1].node,
    }));
    if (routeObjs.length > 0) {
      const rootRoute = createRootRoute({
        component: () => <RootComponent />,
      });
      const routeTree = rootRoute.addChildren(
        routeObjs.map((route) => {
          return createRoute(
            Object.assign(
              {
                getParentRoute: () => rootRoute,
              },
              route,
            ),
          );
        }),
      );
      const router = createRouter({
        routeTree,
        defaultPreload: 'intent',
        defaultStaleTime: 0,
      });
      currRouterProvier = <RouterProvider router={router} />;
    }
    return currRouterProvier;
  }, [routes]);

  return (
    <RoutesStoreContext.Provider value={routesStore}>
      {routerProvider}
      {children}
    </RoutesStoreContext.Provider>
  );
};
