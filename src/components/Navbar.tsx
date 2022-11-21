import { Container, Nav, Navbar as ReactNavBar, NavDropdown } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

import useThemeSelect, { ThemeName } from '../common/hooks/useThemeSelect';
import { Schema, getAllModelNames } from '../schema';
import { ERR_NO_MODELS } from '../common/components/ErrorToast';

function Navbar({ schema }: { schema: Schema | undefined }) {
  const { currentTheme, themeCSS, changeTheme } = useThemeSelect();
  const modelNames = getAllModelNames(schema);

  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <ReactNavBar className="mb-3" variant="dark" bg="primary" expand="sm">
        <Container>
          <ReactNavBar.Brand as={NavLink} to="/Conveyor" end>
            <img
              alt="Conveyor Logo"
              src="/src/conveyor/logo.svg"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Conveyor
          </ReactNavBar.Brand>
          <ReactNavBar.Toggle aria-controls="moebius-example-navbar" />
          <ReactNavBar.Collapse
            id="moebius-example-navbar"
            className="justify-content-end"
          >
            <Nav>
              {/* Models Dropdown */}
              <NavDropdown
                id="conveyor-navbar-models-dropdown"
                title="Models"
                align="end"
              >
                {modelNames.length ? (
                  modelNames.map((modelName: string) => (
                    <NavDropdown.Item
                      as={NavLink}
                      key={`conveyor-navbar-models-${modelName}`}
                      to={`/Conveyor/${modelName}`}
                    >
                      {modelName}
                    </NavDropdown.Item>
                  ))
                ) : (
                  <NavDropdown.Item>{ERR_NO_MODELS}</NavDropdown.Item>
                )}
              </NavDropdown>
              {/* Theme Dropdown */}
              <NavDropdown
                id="conveyor-navbar-theme-dropdown"
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
          </ReactNavBar.Collapse>
        </Container>
      </ReactNavBar>
    </>
  );
}

export default Navbar;
