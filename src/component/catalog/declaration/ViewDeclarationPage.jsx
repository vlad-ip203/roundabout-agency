import React, {useEffect, useState} from "react"
import {Carousel, Col, Container, Row, Table} from "react-bootstrap"
import {Link, useParams} from "react-router-dom"
import {DB} from "../../../index"
import {App} from "../../../lib/consts"
import ProfilePill from "../../user/ProfilePill"
import {TypeFilter} from "../config"
import {tryResolve, tryResolveFacility} from "../utils"


export default function ViewDeclarationPage() {
    const {id} = useParams()
    const [declaration, setDeclaration] = useState(null)
    const [facility, setFacility] = useState(null)
    const [issuerProfile, setIssuerProfile] = useState(null)
    const [consumerProfile, setConsumerProfile] = useState(null)
    const [evaluatorProfile, setEvaluatorProfile] = useState(null)

    useEffect(() => {
        async function getData() {
            const generic = await tryResolve(DB.getDeclaration(id))

            if (!generic)
                return

            if (generic.type === TypeFilter.EXCHANGE)
                setDeclaration(await tryResolve(DB.getExchangeDeclaration(id)))
            else if (generic.type === TypeFilter.PURCHASE)
                setDeclaration(await tryResolve(DB.getPurchaseDeclaration(id)))
            else if (generic.type === TypeFilter.SALE)
                setDeclaration(await tryResolve(DB.getSaleDeclaration(id)))
        }
        void getData()
    }, [id])

    useEffect(() => {
        async function getData() {
            if (!declaration)
                return

            if (declaration.facility_id)
                setFacility(await tryResolveFacility(declaration.facility_id))

            if (declaration.issuer_id)
                setIssuerProfile(await tryResolve(DB.getProfile(declaration.issuer_id)))
            if (declaration.consumer_id)
                setConsumerProfile(await tryResolve(DB.getProfile(declaration.consumer_id)))
            if (declaration.evaluator_id)
                setEvaluatorProfile(await tryResolve(DB.getProfile(declaration.evaluator_id)))
        }
        void getData()
    }, [declaration])

    if (!declaration)
        return "Декларацію за цим ідентифікатором не знайдено"

    return (
        <Container className="my-5">
            <h1>{declaration.title}</h1>

            <p>{declaration.summary}</p>

            <Row className="my-5">
                <Col md={5}>
                    <h2>Зацікавлені сторони</h2>

                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td>Подавач</td>
                            <td>
                                {issuerProfile &&
                                    <ProfilePill profile={issuerProfile}/>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Споживач</td>
                            <td>
                                {consumerProfile &&
                                    <ProfilePill profile={consumerProfile}/>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Рієлтор-оцінник</td>
                            <td>
                                {evaluatorProfile &&
                                    <ProfilePill profile={evaluatorProfile}/>
                                }
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>

                <Col md={7}>
                    <h2>Інформація</h2>

                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td>Об'єкт нерухомості</td>
                            <td>
                                {facility &&
                                    <Link to={App.FACILITY_VIEW.replace(":id", facility.id)}>
                                        {facility.title}
                                    </Link>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Статус пропозиції</td>
                            <td>{declaration.open ? "Відкрита" : "Закрита (угоду укладено)"}</td>
                        </tr>
                        </tbody>
                    </Table>

                    {facility &&
                        <Carousel className="my-3">
                            {facility.image_urls.map((url, index) => (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100" src={url} alt={`Slide ${index + 1}`}/>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    }
                </Col>
            </Row>
        </Container>
    )
}