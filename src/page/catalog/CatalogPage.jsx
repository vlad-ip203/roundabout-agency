import React, {useEffect, useState} from "react"
import Masonry from "react-masonry-css"
import FacilityCard from "../../component/catalog/FacilityCard"
import {DB} from "../../index"
import {Strings} from "../../lib/consts"
import {MASONRY_BREAKPOINT_COLS} from "./config"


export default function FacilitiesCatalogPage() {
    const [content, setContent] = useState([])

    useEffect(() => {
        async function getProducts() {
            const {error, data} = await DB.getAllDeclarations()

            if (error) {
                //Notify user about a problem
                alert(error)
            } else {
                setContent(data)
            }
        }
        void getProducts()
    }, [])

    return <>
        <h2 className="fw-bold">{Strings.CATALOG}</h2>

        <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                 className="masonry-grid"
                 columnClassName="masonry-grid-column">
            {content.map(item =>
                <FacilityCard key={item.id}
                              {...item} />,
            )}
        </Masonry>
    </>
}