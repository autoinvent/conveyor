import { ReactNode } from 'react';

import {
  ConveyorProvider,
  ConveyorContextType,
} from '../contexts/ConveyorContext';
import ModelIndex from '../components/ModelIndex';
import ConveyorNavbar from './ConveyorNavbar';
import ConveyorRouter from './ConveyorRouter';
import { generateOperationName } from '../utils/common';
import ConveyorRoute from './ConveyorRoute';
import { INTROSPECTION_QUERY } from '../constants/introspection';
import { extractModelsFromIntrospection } from '../utils/introspection';
import ConveyorHome from './ConveyorHome';
import InvalidRoute from './InvalidRoute';
import Dummy from './Dummy';

interface ConveyorProps extends ConveyorContextType {
  children?: ReactNode;
}

const Conveyor = ({
  useGQLQueryResponse,
  useGQLMutationRequest,
  children,
}: ConveyorProps) => {
  //TODO: organize later
  const { data: introspection, errors } = useGQLQueryResponse({
    document: INTROSPECTION_QUERY,
  });
  const conveyorModels = extractModelsFromIntrospection(introspection);

  console.log(conveyorModels);

  // const routes = useMemo(() => {
  //   let routes = [{ path: '/', element: <div>TODO: make default homepage</div> }]
  //   const modelNames = Object.keys(conveyorModels)
  //   if (modelNames.length > 0) {
  //     routes = routes.concat(modelNames.map((modelName) => {
  //       const updateMutation = generateOperationName(modelName, UPDATE_MUTATION)
  //       const fields = conveyorModels[modelName][updateMutation]
  //       return {
  //         path: `${modelName}`,
  //         element: <ModelIndex modelName={modelName} fields={fields} />
  //       }
  //     }))
  //   }
  //   return routes
  // }, [JSON.stringify(conveyorModels)])

  // console.log(routes)
  const modelNames = Object.keys(conveyorModels);
  return (
    <ConveyorProvider value={{ useGQLQueryResponse, useGQLMutationRequest }}>
      {modelNames.length > 0 && (
        <ConveyorRouter modelNames={modelNames}>
          <ConveyorRoute key='*' path='*' Component={InvalidRoute} />
          <ConveyorRoute
            key='/'
            path='/'
            element={<ConveyorHome modelNames={modelNames} />}
          />
          <ConveyorRoute
            key=':model'
            path=':model'
            element={
              <ModelIndex
                modelName='Task'
                fields={conveyorModels['Task'].index}
              />
            }
          />
          {children}
        </ConveyorRouter>
      )}
    </ConveyorProvider>
  );
};

export default Conveyor;
