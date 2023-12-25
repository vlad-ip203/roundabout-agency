import {useEffect} from "react"
import {SUPABASE} from "../../index"
import {setSession, useGlobalState} from "../context"


export default function SessionProvider() {
    const [, dispatch] = useGlobalState()

    useEffect(() => {
        SUPABASE.auth
            .getSession()
            .then(({data: {session}}) => {
                setSession(dispatch, session)
            })

        const {
            data: {subscription},
        } = SUPABASE.auth
            .onAuthStateChange((_event, session) => {
                setSession(dispatch, session)
            })

        return () => subscription.unsubscribe()
    }, [dispatch])
}