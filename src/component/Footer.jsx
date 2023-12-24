import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import {App} from "../lib/consts"
import {NAV_ABOUT, NAV_HOME} from "../lib/strings"
import LogoBanner from "./logo/LogoBanner"


export default function Footer() {
    return (
        <footer className="px-2 py-5 bg-body-secondary">
            <Container>
                <Row>
                    <Col md={6} lg={4} className="mb-4">
                        <LogoBanner/>
                    </Col>

                    <Col>
                        <h5>Навігація</h5>

                        <ul className="list-unstyled">
                            <li><Link to={App.HOME}>{NAV_HOME}</Link></li>
                            <li><Link to={App.ABOUT}>{NAV_ABOUT}</Link></li>
                        </ul>
                    </Col>

                    <Col>
                        <h5>Контакти</h5>

                        <ul className="list-unstyled">
                            <li><a href="tel:+380669957468">+38 066 995 7468</a></li>
                            <li><a href="tel:+380669957468">+38 067 665 4764</a></li>
                            <li><a href="tel:+380669957468">+38 096 457 1546</a></li>
                            <li><a href="mailto:contact@rozvorot.if">contact@rozvorot.if</a></li>
                        </ul>

                        <h5>Соцмережі</h5>

                        <ul className="list-unstyled">
                            <li><a href="https://twitter.com"
                                   target="_blank"
                                   rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://facebook.com"
                                   target="_blank"
                                   rel="noopener noreferrer">Facebook</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}