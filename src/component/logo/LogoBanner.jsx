import React from "react"
import {Strings} from "../../lib/consts"
import Logo from "./Logo"
import styles from "./styles.module.scss"


export default function LogoBanner() {
    return <>
        <Logo className={styles.logo + " " + styles.logoBanner}/>

        <h1 className="fw-bold">{Strings.SITE_NAME}</h1>

        <h5 className="text-primary-emphasis fw-bold">Агентство нерухомості</h5>

        <p>
            Продаж / Оренда / Купівля / Обмін
            <br/>
            та інші операції з нерухомістю
        </p>
    </>
}