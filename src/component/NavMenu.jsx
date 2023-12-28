import {faCircleHalfStroke, faMoon, faSun} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useEffect, useState} from "react"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"
import {DB} from "../index"
import {App, Strings} from "../lib/consts"
import {getSession, getTheme, setTheme, useGlobalState} from "../lib/context"
import {signOut} from "../lib/db/auth/auth"
import {Log} from "../lib/log"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "../lib/theme/consts"
import Logo from "./logo/Logo"


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

    const [profile, setProfile] = useState(null)

    //Add user menu items
    useEffect(() => {
        const session = getSession(state)

        //User not authorized, leaving guest mode
        if (!session)
            return

        async function getProfile() {
            Log.v("Getting user profile for NavMenu")

            const {user} = session

            const {error, data} = await DB.getProfile(user.id)

            if (error) {
                //Notify user about a problem
                alert(error)
            } else {
                //Update profile properties
                setProfile(data)
            }
        }
        void getProfile()
    }, [state])

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
                        <Link className="nav-link" to={App.SEARCH}>{Strings.SEARCH}</Link>
                        <Link className="nav-link" to={App.ABOUT}>{Strings.ABOUT}</Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {!profile &&
                            <Link className="nav-link fw-bold" to={App.AUTH}>{Strings.AUTH}</Link>
                        }

                        {profile &&
                            <NavDropdown className="fw-bold" title={profile.name || "Профіль користувача"}>
                                <Link className="dropdown-item" to={App.PROFILE}>{Strings.PROFILE}</Link>
                                <Link className="dropdown-item" to={App.HOME}
                                      onClick={signOut}>{Strings.SIGN_OUT}</Link>
                            </NavDropdown>
                        }

                        {getThemeIcon(state, dispatch)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}