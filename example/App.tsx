import { Helmet } from 'react-helmet';
import { request } from 'graphql-request';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../src/assets/logo.svg';
import {
  Alerts,
  Conveyor,
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
      />
    </>
  );
};

export default App;
