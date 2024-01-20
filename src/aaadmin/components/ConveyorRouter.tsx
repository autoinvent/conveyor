import { ReactNode, useState, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
    SlotsContext,
    SetSlotsContext,
} from '../../aaconveyor/contexts/SlotsContext';
import InvalidRoute from './InvalidRoute';
import ConveyorHome from './ConveyorHome';
import ConveyorNavbar from './ConveyorNavbar';

interface ConveyorRouterProps {
    modelNames: string[]
    children?: ReactNode;
}

const ConveyorRouter = ({ modelNames, children }: ConveyorRouterProps) => {
    const [routes, setRoutes] = useState({} as Record<string, ReactNode>);

    const paths = Object.keys(routes);
    return (
        <SetSlotsContext.Provider value={setRoutes}>
            <SlotsContext.Provider value={routes}>
                {paths.length > 0 &&
                    <BrowserRouter>
                        <Routes>
                            <Route element={<ConveyorNavbar modelNames={modelNames} />}>
                                {
                                    paths.map((path, index) => (
                                        <Fragment key={index}>{routes[path]}</Fragment>
                                    ))}
                            </Route>
                        </Routes>
                    </BrowserRouter>}
                {children}
            </SlotsContext.Provider>
        </SetSlotsContext.Provider>
    );
};

export default ConveyorRouter;
