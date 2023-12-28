import {Session} from "@supabase/supabase-js"
import {useEffect} from "react"
import {DB} from "../../../index"
import {setSession, setSessionProfile, useGlobalState} from "../../context"


async function trySavingSessionAndProfile(dispatch, session: Session | null) {
    setSession(dispatch, session)

    if (session) {
        //TODO 28.12.2023: Save user too
        const {user} = session

        const {error, data} = await DB.getProfile(user.id)

        if (!error)
            setSessionProfile(dispatch, data)
    }
}

export default function SessionProvider() {
    const [, dispatch] = useGlobalState()

    useEffect(() => {
        DB.authClient()
            .getSession()
            .then(({data: {session}}) =>
                trySavingSessionAndProfile(dispatch, session),
            )

        const {
            data: {subscription},
        } = DB.authClient()
            .onAuthStateChange((_event, session) =>
                trySavingSessionAndProfile(dispatch, session),
            )

        return () => subscription.unsubscribe()
    }, [dispatch])
}