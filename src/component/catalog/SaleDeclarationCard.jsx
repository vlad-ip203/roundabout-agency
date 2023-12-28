import React, {useEffect, useState} from "react"
import FacilityCard from "./FacilityCard"
import {tryResolveFacility} from "./utils"


export default function SaleDeclarationCard({declaration}) {
    const [facility, setFacility] = useState(null)

    useEffect(() => {
        async function resolveDeclaration() {
            await tryResolveFacility(declaration.facility_id)
                .then(value => {
                    declaration.facility = value
                    setFacility(value)
                })
        }
        void resolveDeclaration()
    }, [declaration])

    return <>
        {facility &&
            <FacilityCard facility={facility}
                          className="declaration-sale"/>
        }
    </>
}