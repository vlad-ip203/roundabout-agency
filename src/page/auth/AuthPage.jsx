import {Auth} from "@supabase/auth-ui-react"
import React, {useEffect, useState} from "react"
import {Col, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {SUPABASE} from "../../index"
import {App, Strings} from "../../lib/consts"
import {getAppTheme, useGlobalState} from "../../lib/context"
import {THEME_LIGHT} from "../../lib/theme/consts"
import {AUTH_FORM_LOCALE, AUTH_FORM_THEME} from "./config"


export default function AuthPage() {
    const [state] = useGlobalState()
    const theme = getAppTheme(state)

    const navigate = useNavigate()

    const [session, setSession] = useState(null)

    useEffect(() => {
        SUPABASE.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = SUPABASE.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    //User already authorized
    if (session) {
        navigate(App.HOME)
        return
    }

    return <>
        <h2 className="fw-bold">{Strings.NAV_AUTH}</h2>

        <p>
            Створення акаунту дає можливість не тільки переглядати оголошення про нерухомість, а також відповідати на
            них і публікувати власні.
        </p>

        <Row>
            <Col md={{span: 6, offset: 3}}>
                <Auth supabaseClient={SUPABASE}
                      appearance={{theme: AUTH_FORM_THEME}}
                      localization={{variables: AUTH_FORM_LOCALE}}
                      theme={theme === THEME_LIGHT ? "light" : "dark"}
                      providers={[
                          "google",
                          "apple",
                          "facebook",
                          "twitter",
                      ]}/>
            </Col>
        </Row>
    </>
}