import React from "react"
import {Container, DropdownItem, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"
import {App} from "../lib/consts"
import {setTheme, useGlobalState} from "../lib/context"
import {NAV_ABOUT, NAV_AUTH, NAV_SEARCH, NAV_THEME, NAV_THEME_LIST, SITE_NAME} from "../lib/strings"
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
                    {SITE_NAME}
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={App.SEARCH}>{NAV_SEARCH}</Link>
                        <Link className="nav-link" to={App.ABOUT}>{NAV_ABOUT}</Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title=".....">
                            <Link className="dropdown-item" to={App.AUTH}>{NAV_AUTH}</Link>

                            <NavDropdown.Divider/>

                            <NavDropdown.Header>{NAV_THEME}</NavDropdown.Header>
                            {THEMES.map(key =>
                                <DropdownItem key={key}
                                              onClick={() => setTheme(dispatch, key)}>
                                    {NAV_THEME_LIST[key]}
                                </DropdownItem>,
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}