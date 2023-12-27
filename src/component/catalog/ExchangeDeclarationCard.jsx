import React, {useEffect, useState} from "react"
import {tryResolveFacility} from "../../lib/db/objects"
import FacilityCard from "./FacilityCard"


export default function ExchangeDeclarationCard({declaration}) {
    const [facility, setFacility] = useState(null)

    useEffect(() => {
        async function resolveDeclaration() {
            await tryResolveFacility(declaration.facility_id)
                .then(value => {
                    declaration.facility = value
                    setFacility(value)
                })

            await tryResolveFacility(declaration.exchange_facility_id)
                .then(value => {
                    declaration.exchange_facility = value
                })
        }
        void resolveDeclaration()
    }, [declaration])

    return <>
        {facility &&
            <FacilityCard facility={facility}
                          className="declaration-exchange"/>
        }
    </>
}