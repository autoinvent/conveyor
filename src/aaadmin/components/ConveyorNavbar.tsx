/// <reference types="vite-plugin-svgr/client" />

import {
  Container,
  Nav,
  Navbar as ReactNavBar,
  NavDropdown,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { useThemeSelect, ThemeName } from '../../hooks/useThemeSelect';
import { PACKAGE_ABBR } from '../../package';

import Logo from '../../logo.svg?react';

function ConveyorNavbar({ modelNames }: { modelNames: string[] | null }) {
  const { currentTheme, themeCSS, changeTheme } = useThemeSelect();
  const sortedModelNames = modelNames?.sort();
  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <ReactNavBar className='mb-3' variant='dark' bg='primary' expand='sm'>
        <Container>
          <ReactNavBar.Brand>
            <Logo height='30' width='30' className='d-inline-block align-top' />{' '}
            Conveyor
          </ReactNavBar.Brand>
          <ReactNavBar.Toggle aria-controls='moebius-example-navbar' />
          <ReactNavBar.Collapse
            id='moebius-example-navbar'
            className='justify-content-end'
          >
            <Nav>
              {/* Models Dropdown */}
              <NavDropdown
                id='conveyor-navbar-models-dropdown'
                title='Models'
                align='end'
              >
                {sortedModelNames ? (
                  sortedModelNames.map((modelName: string, index) => (
                    <NavDropdown.Item key={index}>{modelName}</NavDropdown.Item>
                  ))
                ) : (
                  <NavDropdown.Item>No Models Found</NavDropdown.Item>
                )}
              </NavDropdown>
              {/* Theme Dropdown */}
              <NavDropdown
                id='conveyor-navbar-theme-dropdown'
                title='Theme'
                align='end'
                onSelect={(eventKey) => {
                  if (eventKey) {
                    changeTheme(eventKey as ThemeName);
                  }
                }}
              >
                <NavDropdown.Item
                  active={currentTheme === 'darkly'}
                  eventKey='darkly'
                >
                  Dark
                </NavDropdown.Item>
                <NavDropdown.Item
                  active={currentTheme === 'flatly'}
                  eventKey='flatly'
                >
                  Light
                </NavDropdown.Item>
                <NavDropdown.Item
                  active={currentTheme === 'system'}
                  eventKey='system'
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

export default ConveyorNavbar;
