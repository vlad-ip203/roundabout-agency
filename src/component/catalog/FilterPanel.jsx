import React, {useEffect, useState} from "react"
import {Button, Form} from "react-bootstrap"
import {DB} from "../../index"
import {Log} from "../../lib/log"
import {onlyUniqueComparator} from "../../lib/utils"
import {tryResolve} from "./utils"


export default function FilterPanel({
    cityFilterChangeListener,
    usecaseFilterChangeListener,
}) {
    const [facilities, setFacilities] = useState([])
    const [cityFilters, setCityFilters] = useState([])

    useEffect(() => {
        async function loadData() {
            setFacilities(await tryResolve(DB.getAllFacilities()))
        }
        void loadData()
    }, [])

    useEffect(() => {
        setCityFilters(facilities
            .map(f => f.city)
            .filter(onlyUniqueComparator))
    }, [facilities])

    function handleFilterChange(event) {
        event.preventDefault()

        const cityFilter = event.target.elements.city.value
        const usecaseFilter = event.target.elements.type_usecase.value

        Log.i(`Applying filters: city=${cityFilter}, usecase=${usecaseFilter}`)
        cityFilterChangeListener(cityFilter)
        usecaseFilterChangeListener(usecaseFilter)
    }

    return <>
        <h4>Фільтри</h4>

        <Form onSubmit={handleFilterChange}>
            <Form.Group controlId="city" className="mb-3">
                <Form.Label>Місто</Form.Label>
                <Form.Control as="select">
                    <option value="all">Всі</option>
                    {cityFilters.map((city, index) =>
                        <option key={`city${index}`} value={city}>{city}</option>,
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
    </>
}