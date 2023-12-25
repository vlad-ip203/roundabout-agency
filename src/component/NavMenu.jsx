import React from "react"
import {Container, DropdownItem, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"
import {App, Strings} from "../lib/consts"
import {setTheme, useGlobalState} from "../lib/context"
import {THEMES} from "../lib/theme"
import Logo from "./logo/Logo"


export default function NavMenu() {
    const [, dispatch] = useGlobalState()

    return (
        <Navbar className="px-2 bg-body-tertiary"
                expand="md">
            <Container>
                <Link className="navbar-brand" to={App.HOME}>
                    <Logo/>
                    {" "}
                    {Strings.SITE_NAME}
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={App.SEARCH}>{Strings.NAV_SEARCH}</Link>
                        <Link className="nav-link" to={App.ABOUT}>{Strings.NAV_ABOUT}</Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title="Профіль.....">
                            <Link className="dropdown-item" to={App.AUTH}>{Strings.NAV_AUTH}</Link>

                            <NavDropdown.Divider/>

                            <NavDropdown.Header>{Strings.NAV_THEME}</NavDropdown.Header>
                            {THEMES.map(key =>
                                <DropdownItem key={key}
                                              onClick={() => setTheme(dispatch, key)}>
                                    {Strings.NAV_THEME_LIST[key]}
                                </DropdownItem>,
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}