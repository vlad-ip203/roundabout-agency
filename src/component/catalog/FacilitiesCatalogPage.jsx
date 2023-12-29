import React, {useEffect, useState} from "react"
import {DB} from "../../index"
import {App, Strings} from "../../lib/consts"
import CatalogPanel from "./CatalogPanel"
import FacilityCard from "./facility/FacilityCard"


export default function FacilitiesCatalogPage({userFilter = "all"}) {
    const [facilities, setFacilities] = useState([])
    const [cityFilter, setCityFilter] = useState("all")
    const [usecaseFilter, setUsecaseFilter] = useState("all")
    const [content, setContent] = useState([])

    useEffect(() => {
        async function loadData() {
            const {error, data} = await DB.getAllFacilities()

            if (error) {
                //Notify user about a problem
                alert(error)
            } else {
                setFacilities(data)
            }
        }
        void loadData()
    }, [])

    useEffect(() => {
        if (facilities) {
            setContent(facilities
                .filter(f => userFilter === "all" || f.user_id === userFilter)
                .filter(f => cityFilter === "all" || f.city === cityFilter)
                .filter(f => usecaseFilter === "all" || f.type_usecase === usecaseFilter)
                .map(f =>
                    <FacilityCard key={f.id}
                                  facility={f}
                                  linkTo={App.FACILITY_VIEW.replace(":id", f.id)}/>,
                ))
        } else {
            //List is empty, no data
            setContent([])
        }
    }, [cityFilter, facilities, usecaseFilter, userFilter])

    return <>
        <h2 className="mb-3 fw-bold">Об'єкти нерухомості</h2>
        <h4>
            {userFilter === "all" ?
                "Вся нерухомість на сайті" :
                Strings.USER_FACILITIES}
        </h4>

        <CatalogPanel content={content}
                      cityFilterChangeListener={setCityFilter}
                      usecaseFilterChangeListener={setUsecaseFilter}/>
    </>
}