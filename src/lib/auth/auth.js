import {DB} from "../../index"


export function signOut() {
    void DB.auth().signOut()
}