import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import {NAV_ABOUT, NAV_HOME} from "../lib/strings"
import LogoBanner from "./logo/LogoBanner"
import {App} from "../lib/consts"


export default function Footer() {
    return (
        <footer className="bg-body-tertiary py-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <LogoBanner/>
                    </Col>

                    <Col>
                        <h5>Контакти</h5>

                        <ul className="list-unstyled">
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </li>
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            </li>
                        </ul>
                    </Col>

                    <Col>
                        <h5>Навігація</h5>

                        <ul className="list-unstyled">
                            <li><Link to={App.HOME}>{NAV_HOME}</Link></li>
                            <li><Link to={App.ABOUT}>{NAV_ABOUT}</Link></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};