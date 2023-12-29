import {faCircleHalfStroke, faMoon, faSun} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"
import {App, Strings} from "../../lib/consts"
import {getSessionProfile, getTheme, setTheme, useGlobalState} from "../../lib/context"
import {signOut} from "../../lib/db/auth/auth"
import {ProfileRole} from "../../lib/db/objects"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "../../lib/theme/consts"
import Logo from "../logo/Logo"


function getThemeIcon(state, dispatch) {
    const theme = getTheme(state)

    let toggleTheme
    let toggleIcon
    if (theme === THEME_SYSTEM) {
        toggleTheme = () => setTheme(dispatch, THEME_LIGHT)
        toggleIcon = faCircleHalfStroke
    } else if (theme === THEME_LIGHT) {
        toggleTheme = () => setTheme(dispatch, THEME_DARK)
        toggleIcon = faSun
    } else {
        toggleTheme = () => setTheme(dispatch, THEME_SYSTEM)
        toggleIcon = faMoon
    }

    return <>
        <Nav.Link onClick={toggleTheme}>
            <FontAwesomeIcon icon={toggleIcon}
                             className="text-secondary-emphasis"
                             size="lg"
                             width={28}/>
        </Nav.Link>
    </>
}


export default function NavMenu() {
    const [state, dispatch] = useGlobalState()
    const profile = getSessionProfile(state)

    return (
        <Navbar className="px-2 bg-body-tertiary"
                expand="sm">
            <Container>
                <Link className="navbar-brand" to={App.HOME}>
                    <Logo/>
                    {" "}
                    {Strings.SITE_NAME}
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={App.CATALOG}>{Strings.CATALOG}</Link>
                        <Link className="nav-link" to={App.ABOUT}>{Strings.ABOUT}</Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {!profile &&
                            <Link className="nav-link fw-bold" to={App.AUTH}>{Strings.AUTH}</Link>
                        }

                        {profile &&
                            <NavDropdown className="fw-bold" title={profile.name || "Мій Акаунт"}>
                                <Link className="dropdown-item" to={App.USER_PROFILE}>
                                    {Strings.USER_PROFILE}
                                </Link>

                                {profile.role === ProfileRole.USER && <>
                                    <Link className="dropdown-item" to={App.USER_FACILITIES}>
                                        {Strings.USER_FACILITIES}
                                    </Link>
                                    <Link className="dropdown-item" to={App.USER_DECLARATIONS}>
                                        {Strings.USER_DECLARATIONS}
                                    </Link>
                                </>}

                                {profile.role === ProfileRole.EVALUATOR && <>
                                    <Link className="dropdown-item" to={App.EVALUATOR_DECLARATIONS}>
                                        {Strings.EVALUATOR_DECLARATIONS}
                                    </Link>
                                </>}

                                <Link className="dropdown-item" to={App.HOME} onClick={signOut}>
                                    {Strings.SIGN_OUT}
                                </Link>
                            </NavDropdown>
                        }

                        {getThemeIcon(state, dispatch)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}