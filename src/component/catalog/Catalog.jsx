import React from "react"
import {Col, Row} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {Log} from "../../lib/log"
import {MASONRY_BREAKPOINT_COLS} from "./config"
import FiltersPanel from "./FiltersPanel"


export default function Catalog({
    content,
    cityFilterChangeListener,
    usecaseFilterChangeListener,
}) {
    Log.i(`Showing ${content ? content.length : "undefined amount of"} items`)

    return <>
        <Row>
            <Col md={3}>
                <FiltersPanel cityFilterChangeListener={cityFilterChangeListener}
                              usecaseFilterChangeListener={usecaseFilterChangeListener}/>
            </Col>

            <Col md={9}>
                <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                         className="masonry-grid"
                         columnClassName="masonry-grid-column">
                    {content === "loading" ? "Завантаження..." :
                        content === "empty" ? "Нічого не знайдено, спробуйте інші фільтри" :
                            content}
                </Masonry>
            </Col>
        </Row>
    </>
}