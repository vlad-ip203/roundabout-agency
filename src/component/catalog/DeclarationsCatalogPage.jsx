import React, {useEffect, useState} from "react"
import {Button, ButtonGroup, Container} from "react-bootstrap"
import {DB} from "../../index"
import {Log} from "../../lib/log"
import Catalog from "./Catalog"
import {TypeFilter} from "./config"
import ExchangeDeclarationCard from "./ExchangeDeclarationCard"
import PurchaseDeclarationCard from "./PurchaseDeclarationCard"
import SaleDeclarationCard from "./SaleDeclarationCard"
import {tryResolve} from "./utils"


async function getAllTypedDeclarations() {
    const out = []
    out.push(...await tryResolve(DB.getAllExchangeDeclarations()))
    out.push(...await tryResolve(DB.getAllPurchaseDeclarations()))
    out.push(...await tryResolve(DB.getAllSaleDeclarations()))
    out.sort((a, b) => a.id < b.id)
    Log.i(`Returning ${out.length} any-type declarations`)
    return out
}

function getDeclarationCard(declaration) {
    if (declaration.type === TypeFilter.EXCHANGE)
        return <ExchangeDeclarationCard key={declaration.id} declaration={declaration}/>

    if (declaration.type === TypeFilter.PURCHASE)
        return <PurchaseDeclarationCard key={declaration.id} declaration={declaration}/>

    if (declaration.type === TypeFilter.SALE)
        return <SaleDeclarationCard key={declaration.id} declaration={declaration}/>

    Log.w("Unknown declaration type received")
    return <></>
}

export default function DeclarationsCatalogPage() {
    const [declarations, setDeclarations] = useState([])
    const [typeFilter, setTypeFilter] = useState(TypeFilter.SALE)
    const [cityFilter, setCityFilter] = useState("all")
    const [usecaseFilter, setUsecaseFilter] = useState("all")
    const [content, setContent] = useState("loading")

    useEffect(() => {
        async function loadData() {
            setDeclarations(await getAllTypedDeclarations())
        }
        void loadData()
    }, [])

    useEffect(() => {
        if (declarations) {
            setContent(declarations
                .filter(d => d.type === typeFilter || typeFilter === TypeFilter.UNSET)
                .filter(d => (d.facility && d.facility.city === cityFilter) || cityFilter === "all")
                .filter(d => (d.facility && d.facility.type_usecase === usecaseFilter) || usecaseFilter === "all")
                .map(getDeclarationCard))
        } else {
            //List is empty, no data
            setContent("empty")
        }
    }, [cityFilter, declarations, typeFilter, usecaseFilter])

    function handleTypeFilterChange(filter) {
        setTypeFilter(filter)

        Log.i(`Applying filters: type=${typeFilter}`)
    }

    /*function handleFilterChange(city, usecase) {
        Log.i(`Applying filters in callback: city=${city}, usecase=${usecase}`)

        setCityFilter(city)
        setUsecaseFilter(usecase)
    }*/

    return <>
        <h2 className="mb-3 fw-bold">{
            typeFilter === TypeFilter.EXCHANGE ? "Обмін нерухомості" :
                typeFilter === TypeFilter.PURCHASE ? "Покупка нерухомості" :
                    typeFilter === TypeFilter.SALE ? "Продаж нерухомості" :
                        "Всі оголошення"
        }</h2>

        <Container className="mb-4">
            <ButtonGroup className="w-100">
                <Button type="radio" onClick={() => handleTypeFilterChange("sale")}>Продаж</Button>
                <Button type="radio" onClick={() => handleTypeFilterChange("exchange")}>Обмін</Button>
                <Button type="radio" onClick={() => handleTypeFilterChange("purchase")}>Покупка</Button>
            </ButtonGroup>
        </Container>

        <Catalog content={content}
                 cityFilterChangeListener={setCityFilter}
                 usecaseFilterChangeListener={setUsecaseFilter}/>
    </>
}