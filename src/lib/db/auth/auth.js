import {DB} from "../../../index"
import {reload} from "../../context"


export async function signOut() {
    await DB.authClient().signOut()
    reload()
}