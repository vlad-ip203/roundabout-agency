import {SUPABASE} from "../../index"


export async function fetchSession() {
    return SUPABASE.auth
        .getSession()
        .then(({data: {session}}) => {
            return session
        })
}

export function signOut() {
    void SUPABASE.auth
        .signOut()
}