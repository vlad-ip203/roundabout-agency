import {Auth} from "@supabase/auth-ui-react"
import React, {useEffect} from "react"
import {Col, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {DB} from "../../index"
import {App, Strings} from "../../lib/consts"
import {getAppTheme, getSession, useGlobalState} from "../../lib/context"
import {THEME_LIGHT} from "../../lib/theme/consts"
import {AUTH_FORM_LOCALE, AUTH_FORM_PROVIDERS, AUTH_FORM_THEME} from "./config"


export default function AuthPage() {
    const [state] = useGlobalState()
    const session = getSession(state)
    const theme = getAppTheme(state)

    const navigate = useNavigate()

    useEffect(() => {
        //User already authorized, return home
        if (session)
            return navigate(App.HOME)
    }, [navigate, session])

    return <>
        <h2 className="fw-bold">{Strings.NAV_AUTH}</h2>

        <p>
            Створення акаунту дає можливість не тільки переглядати оголошення про нерухомість, а також відповідати на
            них і публікувати власні.
        </p>

        <Row>
            <Col md={{span: 6, offset: 3}}>
                <Auth supabaseClient={DB.client}
                      appearance={{theme: AUTH_FORM_THEME}}
                      localization={{variables: AUTH_FORM_LOCALE}}
                      theme={theme === THEME_LIGHT ? "light" : "dark"}
                      providers={AUTH_FORM_PROVIDERS}/>
            </Col>
        </Row>
    </>
}