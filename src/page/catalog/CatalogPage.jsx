import React, {useEffect, useState} from "react"
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap"
import Masonry from "react-masonry-css"
import ExchangeDeclarationCard from "../../component/catalog/ExchangeDeclarationCard"
import PurchaseDeclarationCard from "../../component/catalog/PurchaseDeclarationCard"
import SaleDeclarationCard from "../../component/catalog/SaleDeclarationCard"
import {DB} from "../../index"
import {Log} from "../../lib/log"
import {onlyUniqueComparator} from "../../lib/utils"
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

export default function CatalogPage() {
    const [declarations, setDeclarations] = useState([])
    const [facilities, setFacilities] = useState([])
    const [cityFilters, setCityFilters] = useState([])
    const [typeFilter, setTypeFilter] = useState(TypeFilter.SALE)
    const [cityFilter, setCityFilter] = useState("all")
    const [usecaseFilter, setUsecaseFilter] = useState("all")
    const [content, setContent] = useState("loading")

    useEffect(() => {
        async function loadData() {
            setDeclarations(await getAllTypedDeclarations())
            setFacilities(await tryResolve(DB.getAllFacilities()))
        }
        void loadData()
    }, [])

    useEffect(() => {
        setCityFilters(facilities
            .map(f => f.city)
            .filter(onlyUniqueComparator))
    }, [facilities])

    useEffect(() => {
        if (declarations) {
            setContent(<>
                <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                         className="masonry-grid"
                         columnClassName="masonry-grid-column">
                    {declarations
                        .filter(d => d.type === typeFilter || typeFilter === TypeFilter.UNSET)
                        .filter(d => (d.facility && d.facility.city === cityFilter) || cityFilter === "all")
                        .filter(d => (d.facility && d.facility.type_usecase === usecaseFilter) || usecaseFilter === "all")
                        .map(getDeclarationCard)}
                </Masonry>
            </>)
        } else {
            //List is empty, no data
            setContent("empty")
        }
    }, [cityFilter, declarations, typeFilter, usecaseFilter])

    function handleTypeFilterChange(filter) {
        setTypeFilter(filter)

        Log.i(`Applying filters: ${typeFilter}, ${cityFilter}, ${usecaseFilter}`)
    }

    function handleFilterChange(event) {
        event.preventDefault()

        setCityFilter(event.target.elements.city.value)
        setUsecaseFilter(event.target.elements.type_usecase.value)

        Log.i(`Applying filters: ${typeFilter}, ${cityFilter}, ${usecaseFilter}`)
    }

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

        <Row>
            <Col md={3}>
                <h4>Фільтри</h4>

                <Form onSubmit={handleFilterChange}>
                    <Form.Group controlId="city" className="mb-3">
                        <Form.Label>Місто</Form.Label>
                        <Form.Control as="select">
                            <option value="all">Всі</option>
                            {cityFilters.map(city =>
                                <option value={city}>{city}</option>,
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="type_usecase" className="mb-3">
                        <Form.Label>Призначення</Form.Label>
                        <Form.Control as="select">
                            <option value="all">Будь-які</option>
                            <option value="residential">Житлові</option>
                            <option value="office">Офісні</option>
                            <option value="storage">Сховища</option>
                            <option value="industrial">Індустріальні</option>
                            <option value="commercial">Комерційні</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">Застосувати</Button>
                </Form>
            </Col>

            <Col md={9}>
                {content === "loading" ? "Завантаження..." :
                    content === "empty" ? "Немає оголошень. Спробуйте інші фільтри" :
                        content}
            </Col>
        </Row>
    </>
}