import {faDrawPolygon, faMapMarked} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {Card} from "react-bootstrap"


export default function FacilityCard({facility}) {
    return <>
        {facility &&
            <Card className="my-4">
                <Card.Img variant="top"
                          src={facility.image_urls[0]}
                          alt={facility.title}/>

                <Card.Body>
                    <Card.Title>{facility.title}</Card.Title>
                    <Card.Text>{facility.summary}</Card.Text>

                    <Card.Text className="text-body-tertiary"
                               style={{fontSize: "0.93rem"}}>
                        <FontAwesomeIcon icon={faMapMarked}
                                         width={28}/>
                        {" "}
                        Адреса: {facility.address}, {facility.city}
                        <br/>
                        <FontAwesomeIcon icon={faDrawPolygon}
                                         width={28}/>
                        {" "}
                        Площа: {facility.area} м²
                    </Card.Text>
                </Card.Body>
            </Card>
        }
    </>
}