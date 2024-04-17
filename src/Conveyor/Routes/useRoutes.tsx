import { ReactNode, useContext } from "react"
import { Store, useStore } from "@tanstack/react-store";

import { SlotType } from "@/Slots";

import { RoutesStore, RoutesStoreContext } from "./RoutesStoreContext"

export const useRoutes = (routesStore?: Store<RoutesStore>) => {
    let routesStoreFromContext = useContext(RoutesStoreContext)
    const store = routesStore ?? routesStoreFromContext
    if (!store) {
        throw new Error('useRoutes must be used within RouteStoreContext.Provider or the store must be passed as an argument.');
    }

    const { routes: routesObj } = useStore(store, (state) => state)
    const routes = Object.entries(routesObj).map((routeEntry) => ({ path: routeEntry[0], element: routeEntry[1].node }))
    const setRoute = ({ path, node, refId }: { path: string, node: ReactNode, refId: string }) => {
        store.setState(state => {
            const currRoute = state.routes[path]
            const newRoute: SlotType = { node, slotIds: [refId] }
            if (currRoute) {
                if (currRoute.slotIds.includes(refId)) {
                    // Return the same state if an old refId is being used
                    if (currRoute.slotIds[0] !== refId) {
                        return state;
                    } else {
                        // No need to update slotIds if using the latest refId
                        newRoute.slotIds = currRoute.slotIds;
                    }
                } else {
                    // New refId is being used; update slotIds
                    newRoute.slotIds = [refId, ...currRoute.slotIds];
                }
            }
            return {
                ...state,
                routes: {
                    ...state.routes,
                    [path]: newRoute
                }
            }
        })
    }
    return { routes, setRoute }
}