import {useEffect} from "react"
import {DB} from "../../index"
import {setSession, useGlobalState} from "../context"


export default function SessionProvider() {
    const [, dispatch] = useGlobalState()

    useEffect(() => {
        DB.auth()
            .getSession()
            .then(({data: {session}}) => {
                setSession(dispatch, session)
            })

        const {
            data: {subscription},
        } = DB.auth()
            .onAuthStateChange((_event, session) => {
                setSession(dispatch, session)
            })

        return () => subscription.unsubscribe()
    }, [dispatch])
}