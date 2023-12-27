import React, {useEffect, useState} from "react"
import Masonry from "react-masonry-css"
import DeclarationCard from "../../component/catalog/DeclarationCard"
import {DB} from "../../index"
import {Strings} from "../../lib/consts"
import type {Declaration} from "../../lib/db/objects"
import {MASONRY_BREAKPOINT_COLS} from "./config"


export default function CatalogPage() {
    const [content: Declaration[], setContent] = useState("initial")

    useEffect(() => {
        async function getProducts() {
            const {error, data} = await DB.getAllDeclarations()

            if (error) {
                //Notify user about a problem
                alert(error)
            } else if (data) {
                setContent(<>
                    <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                             className="masonry-grid"
                             columnClassName="masonry-grid-column">
                        {data.map(item =>
                            <DeclarationCard key={item.id}
                                             declaration={item}/>,
                        )}
                    </Masonry>
                </>)
            }
        }
        void getProducts()
    }, [])

    return <>
        <h2 className="fw-bold">{Strings.CATALOG}</h2>

        {content !== "initial" ?
            content :
            "Ще немає оголошень"}
    </>
}