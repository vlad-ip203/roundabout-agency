import React, {useEffect, useState} from "react"
import {DB} from "../../index"
import {Facility} from "../../lib/db/objects"
import DeclarationCard from "./DeclarationCard"

export default function ExchangeDeclarationCard({declaration}) {
    const [facility, setFacility] = useState(null)
    const [exchangeFacility, setExchangeFacility] = useState(null)

    useEffect(() => {
        async function resolveDeclaration() {
            if (declaration.facility_id) {
                const {error, data} = await DB.getFacility(declaration.facility_id)

                if (!error) {
                    setFacility(new Facility(data))
                }
            }

            if (declaration.exchange_facility_id) {
                const {error, data} = await DB.getFacility(declaration.exchange_facility_id)

                if (!error) {
                    setExchangeFacility(new Facility(data))
                }
            }
        }
        void resolveDeclaration()
    }, [declaration.exchange_facility_id, declaration.facility_id])


    return <>
        {facility &&
            <DeclarationCard facility={facility}/>
        }
    </>
}