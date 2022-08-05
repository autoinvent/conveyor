import { Container, Nav, Navbar as ReactNavBar, NavDropdown } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import * as R from 'ramda';

import useThemeSelect, { ThemeName } from '../../common/hooks/useThemeSelect';

function Navbar({ modelTitles }: { modelTitles: string[] }) {
  const { currentTheme, themeCSS, changeTheme } = useThemeSelect();

  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <ReactNavBar className="mb-3" variant="dark" bg="primary" expand="sm">
        <Container>
          <ReactNavBar.Brand>
            <NavLink to="/Conveyor" end>
              Conveyor
            </NavLink>
          </ReactNavBar.Brand>
          <ReactNavBar.Toggle aria-controls="moebius-example-navbar" />
          <ReactNavBar.Collapse id="moebius-example-navbar">
            <Nav className="w-100">
              {/* Models Dropdown */}
              <NavDropdown
                className="ms-auto"
                id="conveyor-navbar-models-dropdown"
                title="Models"
                align="end"
              >
                {R.map(
                  (modelTitle: string) => (
                    <NavDropdown.Item
                      as={NavLink}
                      key={`conveyor-navbar-models-${modelTitle}`}
                      to={`/Conveyor/${modelTitle}`}
                    >
                      {modelTitle}
                    </NavDropdown.Item>
                  ),
                  modelTitles,
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
