import React, {useEffect, useState} from "react"
import {tryResolveFacility} from "../utils"


export default function PurchaseDeclarationCard({declaration}) {
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
            <p>{declaration.summary}</p>
        }
    </>
}