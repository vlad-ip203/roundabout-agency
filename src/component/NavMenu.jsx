import React, {useEffect, useState} from "react"
import {Container, DropdownItem, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"
import {DB} from "../index"
import {App, Strings} from "../lib/consts"
import {getSession, setTheme, useGlobalState} from "../lib/context"
import {signOut} from "../lib/db/auth/auth"
import {Log} from "../lib/log"
import {THEMES} from "../lib/theme/consts"
import Logo from "./logo/Logo"


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
            Log.v("Getting user profile")

            const {user} = session

            const {data, error} = await DB.profiles()
                .select("name")
                .eq("id", user.id)
                .single()

            if (error) {
                Log.w("Error getting profile data: " + error)
            } else if (data) {
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
                        <Link className="nav-link" to={App.SEARCH}>{Strings.SEARCH}</Link>
                        <Link className="nav-link" to={App.ABOUT}>{Strings.ABOUT}</Link>
                    </Nav>

                    {!profile &&
                        <Nav className="ms-auto">
                            <Link className="dropdown-item" to={App.AUTH}>{Strings.AUTH}</Link>
                        </Nav>
                    }

                    {profile &&
                        <Nav>
                            <NavDropdown title={profile.name || "Профіль користувача"}>
                                <Link className="dropdown-item" to={App.PROFILE}>{Strings.PROFILE}</Link>
                                <Link className="dropdown-item" to={App.HOME}
                                      onClick={signOut}>{Strings.SIGN_OUT}</Link>

                                <NavDropdown.Divider/>

                                <NavDropdown.Header>{Strings.THEME}</NavDropdown.Header>
                                {THEMES.map(key =>
                                    <DropdownItem key={key}
                                                  onClick={() => setTheme(dispatch, key)}>
                                        {Strings.THEME_LIST[key]}
                                    </DropdownItem>,
                                )}
                            </NavDropdown>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}