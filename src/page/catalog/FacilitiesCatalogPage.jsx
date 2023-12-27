import React, {useEffect, useState} from "react"
import Masonry from "react-masonry-css"
import FacilityCard from "../../component/catalog/FacilityCard"
import {DB} from "../../index"
import {Strings} from "../../lib/consts"
import type {Facility} from "../../lib/db/objects"
import {MASONRY_BREAKPOINT_COLS} from "./config"


//TODO 27.12.2023: Remove facilities catalog
export default function FacilitiesCatalogPage() {
    const [content: Facility[], setContent] = useState("initial")

    useEffect(() => {
        async function getData() {
            const {error, data} = await DB.getAllFacilities()

            if (error) {
                //Notify user about a problem
                alert(error)
            } else {
                setContent(<>
                    <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                             className="masonry-grid"
                             columnClassName="masonry-grid-column">
                        {data.map(item => {
                                console.log("Images: ", item)
                                return <FacilityCard key={item.id}
                                                     facility={item}/>
                            },
                        )}
                    </Masonry>
                </>)
            }
        }
        void getData()
    }, [])

    return <>
        <h2 className="fw-bold">{Strings.CATALOG_FACILITIES}</h2>

        {content !== "initial" ?
            content :
            "Ще немає оголошень"}
    </>
}