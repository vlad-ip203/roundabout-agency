import React, {useEffect, useState} from "react"
import {Container} from "react-bootstrap"
import {DB} from "../../index"
import {Strings} from "../../lib/consts"
import {Log} from "../../lib/log"
import ExchangeDeclarationCard from "./declaration/ExchangeDeclarationCard"
import PurchaseDeclarationCard from "./declaration/PurchaseDeclarationCard"
import SaleDeclarationCard from "./declaration/SaleDeclarationCard"
import CatalogPanel from "./CatalogPanel"
import {TypeFilter} from "./config"
import DeclarationTypeFilterBlock from "./DeclarationTypeFilterBlock"
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

export default function DeclarationsCatalogPage({
    userFilter = "all",
    evaluatorModeFilter = false,
}) {
    const [declarations, setDeclarations] = useState([])
    const [typeFilter, setTypeFilter] = useState(TypeFilter.SALE)
    const [cityFilter, setCityFilter] = useState("all")
    const [usecaseFilter, setUsecaseFilter] = useState("all")
    const [content, setContent] = useState([])

    useEffect(() => {
        async function loadData() {
            setDeclarations(await getAllTypedDeclarations())
        }
        void loadData()
    }, [])

    useEffect(() => {
        if (declarations) {
            setContent(declarations
                .filter(d => userFilter === "all" || d.issuer_id === userFilter)
                .filter(d => !evaluatorModeFilter || !d.evaluator_id)
                .filter(d => typeFilter === TypeFilter.UNSET || d.type === typeFilter)
                .filter(d => cityFilter === "all" || (d.facility && d.facility.city === cityFilter))
                .filter(d => usecaseFilter === "all" || (d.facility && d.facility.type_usecase === usecaseFilter))
                .map(getDeclarationCard))
        } else {
            //List is empty, no data
            setContent([])
        }
    }, [
        cityFilter,
        declarations,
        evaluatorModeFilter,
        typeFilter,
        usecaseFilter,
        userFilter,
    ])

    function handleTypeFilterChange(type) {
        setTypeFilter(type)

        Log.i(`Applying filters: type=${typeFilter}`)
    }

    return <>
        <h2 className="mb-3 fw-bold">
            {typeFilter === TypeFilter.EXCHANGE ? "Обмін нерухомості" :
                typeFilter === TypeFilter.PURCHASE ? "Покупка нерухомості" :
                    typeFilter === TypeFilter.SALE ? "Продаж нерухомості" :
                        "Всі оголошення"}
        </h2>
        <h4>
            {userFilter === "all" ?
                "Всі оголошення на сайті" :
                Strings.USER_DECLARATIONS}
        </h4>

        <Container className="my-4">
            <DeclarationTypeFilterBlock typeFilterChangeListener={handleTypeFilterChange}/>
        </Container>

        <CatalogPanel content={content}
                      cityFilterChangeListener={setCityFilter}
                      usecaseFilterChangeListener={setUsecaseFilter}/>
    </>
}