import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {App} from "../../lib/consts"
import {getSessionProfile, useGlobalState} from "../../lib/context"
import {Log} from "../../lib/log"
import DeclarationsCatalogPage from "../catalog/DeclarationsCatalogPage"
import FacilitiesCatalogPage from "../catalog/FacilitiesCatalogPage"


export const ContentType = {
    FACILITIES: 0,
    DECLARATIONS: 1,
}


export default function UserContentCatalogPage({contentType}) {
    const [state] = useGlobalState()
    const profile = getSessionProfile(state)

    const navigate = useNavigate()

    const [userFilter, setUserFilter] = useState("all")

    useEffect(() => {
        //User not authorized, return to auth page
        if (!profile)
            return navigate(App.AUTH)

        Log.i(`Applying filters: user=${profile.id}`)
        setUserFilter(profile.id)
    }, [navigate, profile])

    return contentType === ContentType.FACILITIES ?
        <FacilitiesCatalogPage userFilter={userFilter}/> :
        <DeclarationsCatalogPage userFilter={userFilter}/>
}