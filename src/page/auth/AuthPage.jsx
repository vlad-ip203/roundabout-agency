import {Auth} from "@supabase/auth-ui-react"
import React, {useEffect, useState} from "react"
import {Container} from "react-bootstrap"
import {redirect} from "react-router-dom"
import {SUPABASE} from "../../index"
import {App} from "../../lib/consts"
import {getAppTheme, useGlobalState} from "../../lib/context"
import {NAV_AUTH} from "../../lib/strings"
import {THEME_LIGHT} from "../../lib/theme"
import {AUTH_FORM_LOCALE, AUTH_FORM_THEME} from "./config"
import styles from "./styles.module.css"


export default function AuthPage() {
    const [state] = useGlobalState()
    const theme = getAppTheme(state)

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
        redirect(App.HOME)
        return
    }

    return <>
        <h2 className="fw-bold">{NAV_AUTH}</h2>

        <p>
            Створення акаунту дає можливість не тільки переглядати оголошення про нерухомість, а також відповідати на
            них і публікувати власні.
        </p>

        <Container className={"mx-auto " + styles.formBlock}>
            <Auth supabaseClient={SUPABASE}
                  appearance={{theme: AUTH_FORM_THEME}}
                  localization={{variables: AUTH_FORM_LOCALE}}
                  theme={
                      theme === THEME_LIGHT ?
                          "light" :
                          "dark"
                  }
                  providers={[
                      "google",
                      "apple",
                      "facebook",
                      "twitter",
                  ]}/>
        </Container>
    </>
}