import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {App} from "../../lib/consts"
import {getSessionProfile, useGlobalState} from "../../lib/context"
import {ProfileRole} from "../../lib/db/objects"
import DeclarationsCatalogPage from "../catalog/DeclarationsCatalogPage"


export default function EvaluatorDeclarationsCatalogPage() {
    const [state] = useGlobalState()
    const profile = getSessionProfile(state)

    const navigate = useNavigate()

    useEffect(() => {
        //User not authorized, return to auth page
        if (!profile)
            return navigate(App.AUTH)

        if (profile.role !== ProfileRole.EVALUATOR)
            return navigate(App.ERROR_FORBIDDEN)
    }, [navigate, profile])

    return <DeclarationsCatalogPage evaluatorModeFilter={true}/>
}