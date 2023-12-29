import {faCoins} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useEffect} from "react"
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import {App} from "../../../lib/consts"
import {tryResolveFacility} from "../utils"


export default function PurchaseDeclarationCard({declaration}) {
    useEffect(() => {
        async function resolveDeclaration() {
            await tryResolveFacility(declaration.facility_id)
                .then(value => {
                    declaration.facility = value
                })
        }
        void resolveDeclaration()
    }, [declaration])

    return <>
        <Link to={App.DECLARATION_VIEW.replace(":id", declaration.id)}>
            <Card className="my-4 declaration-purchase">
                <Card.Body>
                    <Card.Title>{declaration.title}</Card.Title>
                    <Card.Text>{declaration.summary}</Card.Text>

                    <Card.Text className="text-body-tertiary"
                               style={{fontSize: "0.93rem"}}>
                        <FontAwesomeIcon icon={faCoins}
                                         width={28}/>
                        {" "}
                        Ціна: {declaration.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    </>
}