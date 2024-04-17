import { ReactNode, useMemo, useState } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Store } from "@tanstack/react-store"

import { Route } from "./Route"
import { RoutesStore, RoutesStoreContext } from "./RoutesStoreContext"
import { useRoutes } from "./useRoutes"

export interface RoutesProps {
    children?: ReactNode
}

export const Routes = ({ children }: RoutesProps) => {
    const [routesStore] = useState(new Store<RoutesStore>({ routes: {} }))
    const { routes } = useRoutes(routesStore)
    const routerProvider = useMemo(() => {
        let routerProvider = null
        if (routes.length > 0) {
            const router = createBrowserRouter(routes)
            console.log(routes)
            routerProvider = <RouterProvider router={router} />
        }
        return routerProvider
    }, [routes])


    return (
        <RoutesStoreContext.Provider value={routesStore}>
            {routerProvider}
            <Route path="*">
                This page doesn't exist.
            </Route>
            {children}
        </RoutesStoreContext.Provider>
    )
}