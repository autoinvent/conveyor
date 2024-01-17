/// <reference types="vite-plugin-svgr/client" />

import {
  Container,
  Nav,
  Navbar as ReactNavBar,
  NavDropdown,
  Form,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FaSearch } from 'react-icons/fa';
import { useThemeSelect, ThemeName } from '../../hooks/useThemeSelect';
import { PACKAGE_ABBR } from '../../package';
import ModelNav from '../ModelNav';

import Logo from '../../logo.svg?react';

function onSearch() {}

function ConveyorAdminNavbar({ modelNames }: { modelNames: string[] | null }) {
  const { currentTheme, themeCSS, changeTheme } = useThemeSelect();
  const sortedModelNames = modelNames?.sort();
  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <ReactNavBar className='mb-3' variant='dark' bg='primary' expand='sm'>
        <Container className='me-5'>
          <ModelNav>
            <ReactNavBar.Brand>
              <Logo
                height='30'
                width='30'
                className='d-inline-block align-top'
              />{' '}
              Conveyor
            </ReactNavBar.Brand>
          </ModelNav>
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
                  sortedModelNames.map((modelName: string) => (
                    <ModelNav
                      key={`${PACKAGE_ABBR}-navbar-models-${modelName}`}
                      modelName={modelName}
                    >
                      <NavDropdown.Item>{modelName}</NavDropdown.Item>
                    </ModelNav>
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
        {/* Search Bar and Button */}
        <Form className='ms-5' action="/search_page" method="post">
              <input
                className='search-bar'
                id='input'
                type='search'
                name='search'
                placeholder='Search...'
                onChange={onSearch}
                />
              <button className='search-button' type='submit' >
                {<FaSearch />}
              </button>
          </Form>
      </ReactNavBar>
    </>
  );
}

export default ConveyorAdminNavbar;
