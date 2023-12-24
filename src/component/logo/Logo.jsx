import {faArrowsToDot} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./styles.module.scss"


export default function Logo(props) {
    return (
        <FontAwesomeIcon icon={faArrowsToDot}
                         className={styles.logo}
                         {...props}/>
    )
}