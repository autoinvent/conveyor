import { Helmet } from 'react-helmet';
import { request } from 'graphql-request';

import logo from '../src/logo.svg';
import { Conveyor } from '../src/index';

const App = () => {
  const gqlUrl = '/graphql';

  return (
    <>
      <Helmet>
        <link id="favicon" rel="icon" type="image/svg+xml" href={logo} />
      </Helmet>
      <Conveyor
        fetcher={(params) => request(gqlUrl, params.document, params.variables)}
      />
    </>
  );
};

export default App;
