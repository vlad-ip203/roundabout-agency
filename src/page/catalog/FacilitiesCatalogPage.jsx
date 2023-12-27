import React, {useEffect, useState} from "react"
import Masonry from "react-masonry-css"
import FacilityCard from "../../component/FacilityCard"
import {DB} from "../../index"
import {Strings} from "../../lib/consts"
import {Log} from "../../lib/log"
import {MASONRY_BREAKPOINT_COLS} from "./config"


export default function FacilitiesCatalogPage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            const {data, error} = await DB.facilities()
                .select("id, user_id, title, summary, description, city, address, location, area, type_usecase, type_size, image_urls")
            //.limit(20)

            if (error) {
                Log.w("Error getting profile data: " + error)
            } else if (data) {
                setProducts(data)
            }

            console.log(data)
        }
        void getProducts()
    }, [])

    return <>
        <h2 className="fw-bold">{Strings.CATALOG}</h2>

        <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                 className="masonry-grid"
                 columnClassName="masonry-grid-column">
            {products.map(item =>
                <FacilityCard key={item.id}
                              {...item} />,
            )}
        </Masonry>
    </>
}