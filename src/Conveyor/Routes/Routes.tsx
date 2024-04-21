import { ReactNode, useMemo, useState } from 'react';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Store, useStore } from '@tanstack/react-store';

import { useConveyor } from '../Conveyor';
import { Home } from '../Home';

import { Route } from './Route';
import { RoutesStore, RoutesStoreContext } from './RoutesStoreContext';
import { ModelIndexPage } from '../ModelIndexPage';

export interface RoutesProps {
  prefilled?: boolean;
  children?: ReactNode;
}

export const Routes = ({ prefilled = true, children }: RoutesProps) => {
  const { selected: models } = useConveyor((state) =>
    Object.keys(state.models),
  );

  const [routesStore] = useState(new Store<RoutesStore>({ routes: {} }));
  const routes = useStore(routesStore, (state) => {
    return Object.entries(state.routes).map((routeEntry) => ({
      path: routeEntry[0],
      component: () => routeEntry[1].node,
    }));
  });

  const routerProvider = useMemo(() => {
    let currRouterProvier = null;
    if (routes.length > 0) {
      const rootRoute = createRootRoute({
        component: () => <Outlet />,
      });
      const routeTree = rootRoute.addChildren(
        routes.map((route) => {
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
      {children === undefined || prefilled ? (
        <>
          <Route path='/'>
            <Home />
          </Route>
          {models.map((model: string) => (
            <Route path='$model' key={model}>
              <ModelIndexPage model={model} />
            </Route>
          ))}
        </>
      ) : (
        children
      )}
    </RoutesStoreContext.Provider>
  );
};
