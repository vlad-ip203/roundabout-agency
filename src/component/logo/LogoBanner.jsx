import {faArrowsToDot} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {Container} from "react-bootstrap"
import {SITE_DESCRIPTION, SITE_NAME} from "../../lib/strings"
import styles from "./styles.module.css"


export default function LogoBanner() {
    return (
        <Container fluid>
            <FontAwesomeIcon icon={faArrowsToDot}
                             className={styles.logoBanner}/>

            <h1>{SITE_NAME}</h1>

            <p>{SITE_DESCRIPTION}</p>
        </Container>
    )
}