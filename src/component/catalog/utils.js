import {DB} from "../../index"
import {Facility} from "../../lib/db/objects"


export async function tryResolveFacility(id) {
    if (!id)
        return

    const {error, data} = await DB.getFacility(id)

    if (!error)
        return new Facility(data)
}