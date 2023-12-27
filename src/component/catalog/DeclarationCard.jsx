import {faDrawPolygon, faMapMarked} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {Card} from "react-bootstrap"


export default function DeclarationCard({image_urls, title, summary, city, address, area}) {
    return (
        <Card className="my-4">
            <Card.Img variant="top"
                      src={image_urls[0]}
                      alt={title}/>

            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{summary}</Card.Text>

                <Card.Text className="text-body-tertiary"
                           style={{fontSize: "0.93rem"}}>
                    <FontAwesomeIcon icon={faMapMarked}
                                     width={28}/>
                    {" "}
                    Адреса: {address}, {city}
                    <br/>
                    <FontAwesomeIcon icon={faDrawPolygon}
                                     width={28}/>
                    {" "}
                    Площа: {area} м²
                </Card.Text>
            </Card.Body>
        </Card>
    )
}