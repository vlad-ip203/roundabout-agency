import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {App} from "../../lib/consts"
import {getSession, useGlobalState} from "../../lib/context"
import {Log} from "../../lib/log"
import DeclarationsCatalogPage from "../catalog/DeclarationsCatalogPage"


export default function UserDeclarationsPage() {
    const [state] = useGlobalState()
    const session = getSession(state)

    const navigate = useNavigate()

    const [userFilter, setUserFilter] = useState("all")

    useEffect(() => {
        //User not authorized, return to auth page
        if (!session)
            return navigate(App.AUTH)

        const {user} = session
        
        Log.i(`Applying filters: user=${user.id}`)
        setUserFilter(user.id)
    }, [navigate, session])


    return <DeclarationsCatalogPage userFilter={userFilter}/>
}