import React, {useEffect, useState} from "react"
import {Col, Row} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {Log} from "../../lib/log"
import {MASONRY_BREAKPOINT_COLS} from "./config"
import FilterPanel from "./FilterPanel"


export default function Catalog({
    content,
    cityFilterChangeListener,
    usecaseFilterChangeListener,
}) {
    const [output, setOutput] = useState("")

    useEffect(() => {
        if (!content || !content.length) {
            setOutput("Нічого не знайдено, спробуйте інші фільтри")
        } else {
            Log.i(`Showing ${content ? content.length : "undefined amount of"} items`)

            setOutput(<>
                <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                         className="masonry-grid"
                         columnClassName="masonry-grid-column">
                    {content}
                </Masonry>
            </>)
        }
    }, [content])

    return <>
        <Row>
            <Col md={3}>
                <FilterPanel cityFilterChangeListener={cityFilterChangeListener}
                             usecaseFilterChangeListener={usecaseFilterChangeListener}/>
            </Col>

            <Col md={9}>
                {output}
            </Col>
        </Row>
    </>
}