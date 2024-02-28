/// <reference types="vite-plugin-svgr/client" />

import {
    Container,
    Nav,
    Navbar as ReactNavBar,
    NavDropdown,
} from 'react-bootstrap';
// import { Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useThemeSelect, ThemeName } from './useThemeSelect';

import Logo from '@/logo.svg?react';

export const Navbar = ({ modelNames }: { modelNames: string[] | null }) => {
    const { currentTheme, themeCSS, changeTheme } = useThemeSelect();
    const sortedModelNames = modelNames?.sort();
    return (
        <>
            <Helmet defer>
                <style>{themeCSS}</style>
            </Helmet>
            <ReactNavBar className='mb-3' variant='dark' bg='primary' expand='sm'>
                <Container>
                    {/* <Link to={'/'}> */}
                    <ReactNavBar.Brand>
                        <Logo
                            height='30'
                            width='30'
                            className='d-inline-block align-top'
                        />{' '}
                        Conveyor
                    </ReactNavBar.Brand>
                    {/* </Link> */}
                    <ReactNavBar.Toggle aria-controls='collapsable-navbar' />
                    <ReactNavBar.Collapse
                        id='collapsable-navbar'
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
            {/* <Outlet /> */}
        </>
    );
}

