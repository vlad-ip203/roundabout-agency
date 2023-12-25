import {Session} from "@supabase/supabase-js"
import {useEffect} from "react"
import {SUPABASE} from "../../index"
import {setSession, useGlobalState} from "../context"
import {fetchSession} from "./auth"


export default function SessionProvider() {
    const [, dispatch] = useGlobalState()

    useEffect(() => {
        fetchSession()
            .then(session => {
                setSession(dispatch, session)
            })

        const {
            data: {subscription},
        } = SUPABASE.auth.onAuthStateChange((_event, session) => {
            setSession(dispatch, session)
        })

        return () => subscription.unsubscribe()
    }, [dispatch])
}