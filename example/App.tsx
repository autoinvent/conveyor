import { Helmet } from 'react-helmet';
import { request } from 'graphql-request';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../src/assets/logo.svg';
import {
  Alerts,
  Conveyor,
  LoadingFallback,
  IntrospectionProvider,
  ModelIndex,
} from '../src/index';

const App = () => {
  const gqlUrl = '/graphql';
  const data = [
    { name: 'Robert', type: 'Human' },
    { name: 'Mimi', type: 'Dog' },
  ];

  return (
    <>
      <Helmet>
        <link id='favicon' rel='icon' type='image/svg+xml' href={logo} />
      </Helmet>
      <Conveyor
        fetcher={(params) => request(gqlUrl, params.document, params.variables)}
      >
        <Alerts>
          <IntrospectionProvider>
            <ModelIndex model='Task' fields={['id', 'message', 'potato']} />
            <ModelIndex model='Animal' fields={['name', 'type']} data={data}>
              <ModelIndex.Table>
                <ModelIndex.Table.Head />
                <ModelIndex.Table.Body>
                  <ModelIndex.Table.Row prefilled={true}>
                    <ModelIndex.Table.Cell columnId={'name'}>
                      ???
                    </ModelIndex.Table.Cell>
                  </ModelIndex.Table.Row>
                </ModelIndex.Table.Body>
              </ModelIndex.Table>
            </ModelIndex>
          </IntrospectionProvider>
        </Alerts>
      </Conveyor>
    </>
  );
};

export default App;
