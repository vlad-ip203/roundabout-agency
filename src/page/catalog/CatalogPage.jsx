import React, {useEffect, useState} from "react"
import Masonry from "react-masonry-css"
import ExchangeDeclarationCard from "../../component/catalog/ExchangeDeclarationCard"
import PurchaseDeclarationCard from "../../component/catalog/PurchaseDeclarationCard"
import SaleDeclarationCard from "../../component/catalog/SaleDeclarationCard"
import {DB} from "../../index"
import {Log} from "../../lib/log"
import {MASONRY_BREAKPOINT_COLS, TypeFilter} from "./config"


async function tryResolve(promise) {
    const {error, data} = await promise

    if (error) {
        //Notify user about a problem
        alert(error)
        return []
    }

    return data
}

async function supplyDeclarationsData(typeFilter) {
    if (typeFilter === TypeFilter.EXCHANGE)
        return await tryResolve(DB.getAllExchangeDeclarations())

    if (typeFilter === TypeFilter.PURCHASE)
        return await tryResolve(DB.getAllPurchaseDeclarations())

    if (typeFilter === TypeFilter.SALE)
        return await tryResolve(DB.getAllSaleDeclarations())

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

export default function CatalogPage() {
    const [typeFilter, setTypeFilter] = useState(TypeFilter.UNSET)
    const [content, setContent] = useState("loading")

    useEffect(() => {
        async function applyFilter() {
            const data = await supplyDeclarationsData(typeFilter)

            if (data) {
                setContent(<>
                    <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                             className="masonry-grid"
                             columnClassName="masonry-grid-column">
                        {data.map(declaration => getDeclarationCard(declaration))}
                    </Masonry>
                </>)
            } else {
                //List is empty, no data
                setContent("empty")
            }
        }
        void applyFilter()
    }, [typeFilter])

    return <>
        <h2 className="fw-bold">{
            typeFilter === TypeFilter.EXCHANGE ? "Обмін нерухомості" :
                typeFilter === TypeFilter.PURCHASE ? "Покупка нерухомості" :
                    typeFilter === TypeFilter.SALE ? "Продаж нерухомості" :
                        "Всі оголошення"
        }</h2>

        {content === "loading" ? "Завантаження..." :
            content === "empty" ? "Ще немає оголошень. Заходьте пізніше" :
                content}
    </>
}