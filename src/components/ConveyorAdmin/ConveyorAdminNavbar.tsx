import { useContext } from "react";
import {
  Container,
  Nav,
  Navbar as ReactNavBar,
  NavDropdown,
} from "react-bootstrap";
import { Helmet } from "react-helmet";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import useThemeSelect, { ThemeName } from "../../hooks/useThemeSelect";
import { PACKAGE_ABBR } from "../../package";

function ConveyorAdminNavbar({ modelNames }: { modelNames: string[] | null }) {
  const { currentTheme, themeCSS, changeTheme } = useThemeSelect();
  const { navigate } = useContext(ConveyorContext);
  const sortedModelNames = modelNames?.sort();

  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <ReactNavBar className="mb-3" variant="dark" bg="primary" expand="sm">
        <Container>
          <ReactNavBar.Brand onClick={() => navigate({})}>
            <img
              alt="Conveyor Logo"
              src="/src/logo.svg"
              height="30"
              className="d-inline-block align-top"
            />{" "}
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
                {sortedModelNames ? (
                  sortedModelNames.map((modelName: string) => (
                    <NavDropdown.Item
                      key={`${PACKAGE_ABBR}-navbar-models-${modelName}`}
                      onClick={() => navigate({ modelName })}
                    >
                      {modelName}
                    </NavDropdown.Item>
                  ))
                ) : (
                  <NavDropdown.Item>No Models Found</NavDropdown.Item>
                )}
              </NavDropdown>
              {/* Theme Dropdown */}
              <NavDropdown
                id="conveyor-navbar-theme-dropdown"
                title="Theme"
                align="end"
                onSelect={(eventKey) => {
                  if (eventKey) {
                    changeTheme(eventKey as ThemeName);
                  }
                }}
              >
                <NavDropdown.Item
                  active={currentTheme === "darkly"}
                  eventKey="darkly"
                >
                  Dark
                </NavDropdown.Item>
                <NavDropdown.Item
                  active={currentTheme === "flatly"}
                  eventKey="flatly"
                >
                  Light
                </NavDropdown.Item>
                <NavDropdown.Item
                  active={currentTheme === "system"}
                  eventKey="system"
                >
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

export default ConveyorAdminNavbar;