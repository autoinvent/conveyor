import { ReactNode, useMemo, useState } from "react"
import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router"
import { Store } from "@tanstack/react-store"

import { Home } from '../Home';

import { Route } from "./Route"
import { RoutesStore, RoutesStoreContext } from "./RoutesStoreContext"
import { useRoutes } from "./useRoutes"
import { ModelIndexPage } from "../ModelIndexPage";

export interface RoutesProps {
    prefilled?: boolean
    children?: ReactNode
}

export const Routes = ({ prefilled = true, children }: RoutesProps) => {
    const [routesStore] = useState(new Store<RoutesStore>({ routes: {} }))
    const { routes } = useRoutes(routesStore)
    const routerProvider = useMemo(() => {
        let currRouterProvier = null
        if (routes.length > 0) {
            const rootRoute = createRootRoute({
                component: () => <Outlet />
            })
            const routeTree = rootRoute.addChildren(routes.map((route) => {
                return createRoute({
                    getParentRoute: () => rootRoute,
                    path: route.path,
                    component: () => route.element
                })
            }))
            const router = createRouter({
                routeTree,
                defaultPreload: 'intent',
                defaultStaleTime: 0,
            })
            currRouterProvier = <RouterProvider router={router} />
        }
        return currRouterProvier
    }, [routes])

    return (
        <RoutesStoreContext.Provider value={routesStore}>
            {routerProvider}
            {children === undefined || prefilled ? (
                <>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route path="$model">
                        <ModelIndexPage />
                    </Route>
                </>
            ) : children}
        </RoutesStoreContext.Provider>
    )
}