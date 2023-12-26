import {createClient, SupabaseClient} from "@supabase/supabase-js"


const URL = "https://mcqwnznlvqkexbxtxjdg.supabase.co"
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXduem5sdnFrZXhieHR4amRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NTgzMTQsImV4cCI6MjAxOTAzNDMxNH0.eIL90ITkD7yuu_kvLBysQsJ9L2puWD2H4Ihlt-KY8Jw"


export default class DatabaseManager {
    _client: SupabaseClient

    constructor() {
        this._client = createClient(URL, KEY)
    }


    client() {
        return this._client
    }

    authClient() {
        return this._client.auth
    }


    profiles() {
        return this._client.from("profiles")
    }
}