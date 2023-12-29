import React, {useEffect, useState} from "react"
import {Carousel, Col, Container, Row, Table} from "react-bootstrap"
import {useParams} from "react-router-dom"
import {DB} from "../../../index"
import ProfilePill from "../../user/ProfilePill"
import {tryResolve, tryResolveFacility} from "../utils"


export default function ViewFacilityPage() {
    const {id} = useParams()
    const [facility, setFacility] = useState(null)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        async function getData() {
            const f = await tryResolveFacility(id)
            setFacility(f)

            if (f)
                if (f.user_id)
                    setProfile(await tryResolve(DB.getProfile(f.user_id)))
        }
        void getData()
    }, [id])

    if (!facility)
        return "Нерухомість за цим ідентифікатором не знайдено"

    const location_link = "https://google.com/maps/place/" + facility.location.join(",")

    return (
        <Container className="my-5">
            <Row>
                <Col md={8}>
                    <Carousel>
                        {facility.image_urls.map((url, index) => (
                            <Carousel.Item key={index}>
                                <img className="d-block w-100" src={url} alt={`Slide ${index + 1}`}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>

                <Col md={4}>
                    <h1>{facility.title}</h1>

                    {profile &&
                        <ProfilePill profile={profile}/>
                    }

                    <p>{facility.summary}</p>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={12}>
                    <p>{facility.description}</p>

                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td>Адреса</td>
                            <td><a href={location_link}>{facility.address}, {facility.city}</a></td>
                        </tr>
                        <tr>
                            <td>Площа</td>
                            <td>{facility.area} м²</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
};

