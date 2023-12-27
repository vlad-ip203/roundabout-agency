import FacilityCard from "./FacilityCard"


export default function DeclarationCard({facility}) {
    return <>
        {facility &&
            <FacilityCard facility={facility}/>
        }
    </>
}