import { Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Routes, Route, Link } from 'react-router-dom';
import { request } from 'graphql-request';

import useThemeSelect from '../common/hooks/useThemeSelect';
import Conveyor from '../conveyor/Conveyor';
import { GraphQLFetcher } from '../conveyor/schema';
import autoInventAdapter from '../utils/schemaAdapter';

function App() {
  const { themeCSS } = useThemeSelect();

  // Grabs schema from endpoint
  const schemaUrl = '/api/schema';
  const schemaFetcher = async () => {
    const response = await fetch(schemaUrl);
    const remoteSchemaResponse = await response.json();
    return autoInventAdapter(remoteSchemaResponse.definitions);
  };

  const graphQLUrl = '/api/graphql';
  const graphqlFetcher: GraphQLFetcher = async (graphQLParams) => {
    const result = await request(
      graphQLUrl,
      graphQLParams.query,
      graphQLParams.variables,
    );
    return result;
  };

  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <Card.Text>
              <Link to="/Conveyor">Explore Data</Link>
            </Card.Text>
          }
        />
        <Route
          path="Conveyor/*"
          element={
            <Conveyor schemaFetcher={schemaFetcher} gqlFetcher={graphqlFetcher} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
