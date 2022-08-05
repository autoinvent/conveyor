import { Card, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Routes, Route, Link } from 'react-router-dom';
import * as R from 'ramda';
import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';

import useThemeSelect, { ThemeName } from '../common/hooks/useThemeSelect';
import Conveyor from '../conveyor/Conveyor';
import { GraphQLFetcher } from '../conveyor/schema/schema';
import autoInventAdapter from '../utils/schemaAdapter';

function App() {
  const { currentTheme, themeCSS, changeTheme } = useThemeSelect();

  // Grabs schema from endpoint
  const schemaUrl = 'http://127.0.0.1:9000/api/schema';
  const schemaFetcher = async () => {
    const response = await fetch(schemaUrl);
    const remoteSchemaResponse = await response.json();
    return R.prop('definitions', remoteSchemaResponse);
  };
  const { isLoading, error, data: aiSchema } = useQuery(['schema'], schemaFetcher);

  const graphQLUrl = 'http://127.0.0.1:9000/api/graphql';
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
      <Navbar className="mb-3" variant="dark" bg="primary" expand="sm">
        <Container>
          <Navbar.Brand>Moebius UI Starter</Navbar.Brand>
          <Navbar.Toggle aria-controls="moebius-example-navbar" />
          <Navbar.Collapse id="moebius-example-navbar">
            <Nav className="w-100">
              <NavDropdown
                className="ms-auto"
                id="nav-dropdown-moebius-example"
                title="Theme"
                align="end"
                onSelect={(eventKey) => {
                  if (eventKey) changeTheme(eventKey as ThemeName);
                }}
              >
                <NavDropdown.Item active={currentTheme === 'darkly'} eventKey="darkly">
                  Dark
                </NavDropdown.Item>
                <NavDropdown.Item active={currentTheme === 'flatly'} eventKey="flatly">
                  Light
                </NavDropdown.Item>
                <NavDropdown.Item active={currentTheme === 'system'} eventKey="system">
                  System
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Main content routing */}
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Conveyor Module</Card.Title>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Card.Text>
                        {isLoading && <>Retrieving Data...</>}
                        {(error as Error) && String((error as Error).message)}
                        {aiSchema && <Link to="/Conveyor">Explore Data</Link>}
                      </Card.Text>
                    }
                  />
                  <Route
                    path="Conveyor/*"
                    element={
                      <Conveyor
                        schema={autoInventAdapter(aiSchema)}
                        fetcher={graphqlFetcher}
                      />
                    }
                  />
                </Routes>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
