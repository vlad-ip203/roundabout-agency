import {createClient, SupabaseClient} from "@supabase/supabase-js"
import {Log} from "../log"
import {Declaration, ExchangeDeclaration, Facility, Profile, PurchaseDeclaration, SaleDeclaration} from "./objects"


const SERVER_URL = "https://mcqwnznlvqkexbxtxjdg.supabase.co"
const SERVER_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXduem5sdnFrZXhieHR4amRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NTgzMTQsImV4cCI6MjAxOTAzNDMxNH0.eIL90ITkD7yuu_kvLBysQsJ9L2puWD2H4Ihlt-KY8Jw"


const PRIMARY_KEY = "id"

const PROFILES = "profiles"
const PROFILES_COLUMNS = "id,created_at,updated_at,name,phone,avatar_url,role"
const AVATARS = "avatars"

const FACILITIES = "facilities"
const FACILITIES_COLUMNS = "id,created_at,user_id,title,summary,description,city,address,location,area,type_size,type_usecase,image_urls"

const DECLARATIONS = "declarations"
const DECLARATIONS_COLUMNS = "id,created_at,issuer_id,consumer_id,evaluator_id,type,title,summary,open"
const DECLARATIONS_EXCHANGE = "declarations_exchange"
const DECLARATIONS_EXCHANGE_COLUMNS = "id,facility_id,exchange_facility_id"
const DECLARATIONS_PURCHASE = "declarations_purchase"
const DECLARATIONS_PURCHASE_COLUMNS = "id,price,facility_id"
const DECLARATIONS_SALE = "declarations_sale"
const DECLARATIONS_SALE_COLUMNS = "id,facility_id,price"


export default class DatabaseManager {
    _client: SupabaseClient

    constructor() {
        this._client = createClient(SERVER_URL, SERVER_ANON_KEY)
    }


    client() {
        return this._client
    }

    authClient() {
        return this._client.auth
    }


    #profiles() {
        return this._client.from(PROFILES)
    }

    async getProfile(id) {
        const {
            data,
            error,
        } = await this.#profiles()
            .select(PROFILES_COLUMNS)
            .eq(PRIMARY_KEY, id)
            .single()

        const out = {
            error: "",
            data: null,
        }

        if (error) {
            out.error = "Error getting profile: " + error.message
            Log.w(out.error)
            return out
        }

        out.data = new Profile(data)
        return out
    }

    async updateProfile(id, updates) {
        const {
            error,
        } = await this.#profiles()
            .update(updates)
            .eq(PRIMARY_KEY, id)

        const out = {
            error: "",
        }

        if (error) {
            out.error = "Error updating profile: " + error.message
            Log.w(out.error)
        }

        return out
    }


    #avatars() {
        return this._client.storage.from(AVATARS)
    }

    async getAvatarUrl(path) {
        const {
            data,
            error,
        } = await this.#avatars()
            .download(path)

        const out = {
            error: "",
            url: "",
        }

        if (error) {
            out.error = "Error downloading avatar: " + error.message
            Log.w(out.error)
            return out
        }

        out.url = URL.createObjectURL(data)
        return out
    }

    async uploadAvatar(path, file) {
        const {
            error,
        } = await this.#avatars()
            .upload(path, file)

        const out = {
            error: "",
        }

        if (error) {
            out.error = "Error uploading avatar: " + error.message
            Log.w(out.error)
        }

        return out
    }


    #facilities() {
        return this._client.from(FACILITIES)
    }

    async getAllFacilities() {
        const {
            data,
            error,
        } = await this.#facilities()
            .select(FACILITIES_COLUMNS)

        const out = {
            error: "",
            data: [],
        }

        if (error) {
            out.error = "Error getting facilities: " + error.message
            Log.w(out.error)
            return out
        }

        for (const i in data)
            out.data.push(new Facility(data[i]))
        Log.v(`Returning ${out.data.length} facilities`)
        return out
    }

    async getFacility(id) {
        const {
            data,
            error,
        } = await this.#facilities()
            .select(FACILITIES_COLUMNS)
            .eq(PRIMARY_KEY, id)
            .single()

        const out = {
            error: "",
            data: null,
        }

        if (error) {
            out.error = "Error getting facility: " + error.message
            Log.w(out.error)
            return out
        }

        out.data = new Facility(data)
        return out
    }


    #declarations() {
        return this._client.from(DECLARATIONS)
    }

    async getAllDeclarations() {
        const {
            data,
            error,
        } = await this.#declarations()
            .select(DECLARATIONS_COLUMNS)

        const out = {
            error: "",
            data: [],
        }

        if (error) {
            out.error = "Error getting declarations: " + error.message
            Log.w(out.error)
            return out
        }

        for (const i in data)
            out.data.push(new Declaration(data[i]))
        Log.v(`Returning ${out.data.length} declarations`)
        return out
    }

    async getDeclaration(id) {
        const {
            data,
            error,
        } = await this.#declarations()
            .select(DECLARATIONS_COLUMNS)
            .eq(PRIMARY_KEY, id)
            .single()

        const out = {
            error: "",
            data: null,
        }

        if (error) {
            out.error = "Error getting declaration: " + error.message
            Log.w(out.error)
            return out
        }

        out.data = new Declaration(data)
        return out
    }

    async joinDeclaration(id, consumer_id) {
        const updates = {
            consumer_id,
            evaluator_id: null, //Also, reset previously evaluated status
        }

        const {
            error,
        } = await this.#declarations()
            .update(updates)
            .eq(PRIMARY_KEY, id)

        const out = {
            error: "",
        }

        if (error) {
            out.error = "Error updating declaration: " + error.message
            Log.w(out.error)
        }

        return out
    }

    async approveDeclaration(id, consumer_id, evaluator_id) {
        const updates = {
            consumer_id,
            evaluator_id,
            open: consumer_id == null
        }

        const {
            error,
        } = await this.#declarations()
            .update(updates)
            .eq(PRIMARY_KEY, id)

        const out = {
            error: "",
        }

        if (error) {
            out.error = "Error updating declaration: " + error.message
            Log.w(out.error)
        }

        return out
    }

    async rejectDeclaration(id, evaluator_id) {
        const {
            error,
        } = await this.#declarations()
            .delete()
            .eq(PRIMARY_KEY, id)

        const out = {
            error: "",
        }

        if (error) {
            out.error = "Error updating declaration: " + error.message
            Log.w(out.error)
        }

        return out
    }


    #exchangeDeclarations() {
        return this._client.from(DECLARATIONS_EXCHANGE)
    }

    async getAllExchangeDeclarations() {
        const {
            data,
            error,
        } = await this.#exchangeDeclarations()
            .select(`
                ${DECLARATIONS_EXCHANGE_COLUMNS},
                ${DECLARATIONS} ( ${DECLARATIONS_COLUMNS} )
            `)

        const out = {
            error: "",
            data: [],
        }

        if (error) {
            out.error = "Error getting exchange declarations: " + error.message
            Log.w(out.error)
            return out
        }

        for (const i in data)
            out.data.push(new ExchangeDeclaration(data[i]))
        Log.v(`Returning ${out.data.length} exchange declarations`)
        return out
    }

    async getExchangeDeclaration(id) {
        const {
            data,
            error,
        } = await this.#exchangeDeclarations()
            .select(`
                ${DECLARATIONS_EXCHANGE_COLUMNS},
                ${DECLARATIONS} ( ${DECLARATIONS_COLUMNS} )
            `)
            .eq(PRIMARY_KEY, id)
            .single()

        const out = {
            error: "",
            data: null,
        }

        if (error) {
            out.error = "Error getting exchange declaration: " + error.message
            Log.w(out.error)
            return out
        }

        out.data = new ExchangeDeclaration(data)
        return out
    }


    #purchaseDeclarations() {
        return this._client.from(DECLARATIONS_PURCHASE)
    }

    async getAllPurchaseDeclarations() {
        const {
            data,
            error,
        } = await this.#purchaseDeclarations()
            .select(`
                ${DECLARATIONS_PURCHASE_COLUMNS},
                ${DECLARATIONS} ( ${DECLARATIONS_COLUMNS} )
            `)

        const out = {
            error: "",
            data: [],
        }

        if (error) {
            out.error = "Error getting purchase declarations: " + error.message
            Log.w(out.error)
            return out
        }

        for (const i in data)
            out.data.push(new PurchaseDeclaration(data[i]))
        Log.v(`Returning ${out.data.length} purchase declarations`)
        return out
    }

    async getPurchaseDeclaration(id) {
        const {
            data,
            error,
        } = await this.#purchaseDeclarations()
            .select(`
                ${DECLARATIONS_PURCHASE_COLUMNS},
                ${DECLARATIONS} ( ${DECLARATIONS_COLUMNS} )
            `)
            .eq(PRIMARY_KEY, id)
            .single()

        const out = {
            error: "",
            data: null,
        }

        if (error) {
            out.error = "Error getting purchase declaration: " + error.message
            Log.w(out.error)
            return out
        }

        out.data = new PurchaseDeclaration(data)
        return out
    }


    #saleDeclarations() {
        return this._client.from(DECLARATIONS_SALE)
    }

    async getAllSaleDeclarations() {
        const {
            data,
            error,
        } = await this.#saleDeclarations()
            .select(`
                ${DECLARATIONS_SALE_COLUMNS},
                ${DECLARATIONS} ( ${DECLARATIONS_COLUMNS} )
            `)

        const out = {
            error: "",
            data: [],
        }

        if (error) {
            out.error = "Error getting sale declarations: " + error.message
            Log.w(out.error)
            return out
        }

        for (const i in data)
            out.data.push(new SaleDeclaration(data[i]))
        Log.v(`Returning ${out.data.length} sale declarations`)
        return out
    }

    async getSaleDeclaration(id) {
        const {
            data,
            error,
        } = await this.#saleDeclarations()
            .select(`
                ${DECLARATIONS_SALE_COLUMNS},
                ${DECLARATIONS} ( ${DECLARATIONS_COLUMNS} )
            `)
            .eq(PRIMARY_KEY, id)
            .single()

        const out = {
            error: "",
            data: null,
        }

        if (error) {
            out.error = "Error getting sale declaration: " + error.message
            Log.w(out.error)
            return out
        }

        out.data = new SaleDeclaration(data)
        return out
    }
}