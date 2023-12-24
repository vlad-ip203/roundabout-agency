import React from "react"
import {Container, Nav, Navbar} from "react-bootstrap"
import {Link} from "react-router-dom"
import {NAV_ABOUT, SITE_NAME} from "../lib/strings"
import Logo from "./logo/Logo"
import {App} from "../lib/consts"


export default function Header() {
    return (
        <header className="sticky-top">
            <Navbar className="bg-body-tertiary"
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
                            <Link className="nav-link" to={App.ABOUT}>
                                {NAV_ABOUT}
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}