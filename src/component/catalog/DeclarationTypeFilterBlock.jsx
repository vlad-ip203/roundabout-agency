import React from "react"
import {Button, ButtonGroup} from "react-bootstrap"
import {TypeFilter} from "./config"


export default function DeclarationTypeFilterBlock({typeFilterChangeListener}) {
    return (
        <ButtonGroup className="w-100">
            <Button type="radio" onClick={() => typeFilterChangeListener(TypeFilter.SALE)}>Продаж</Button>
            <Button type="radio" onClick={() => typeFilterChangeListener(TypeFilter.EXCHANGE)}>Обмін</Button>
            <Button type="radio" onClick={() => typeFilterChangeListener(TypeFilter.PURCHASE)}>Покупка</Button>
        </ButtonGroup>
    )
}