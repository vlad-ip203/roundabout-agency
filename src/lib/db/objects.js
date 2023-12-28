import {DB} from "../../index"


export class Profile {
    id: number
    created_at: string
    updated_at: string
    name: string
    phone: string
    avatar_url: string

    constructor(data) {
        this.id = data.id
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.name = data.name
        this.phone = data.phone
        this.avatar_url = data.avatar_url
    }
}


export class Facility {
    id: number
    created_at: string
    user_id: string
    title: string
    summary: string
    description: string
    city: string
    address: string
    location: Array[number]
    area: number
    type_size: string
    type_usecase: string
    image_urls: Array[string]

    constructor(data) {
        this.id = data.id
        this.created_at = data.created_at
        this.user_id = data.user_id
        this.title = data.title
        this.summary = data.summary
        this.description = data.description
        this.city = data.city
        this.address = data.address
        this.location = data.location
        this.area = data.area
        this.type_size = data.type_size
        this.type_usecase = data.type_usecase
        this.image_urls = data.image_urls
    }
}

export async function tryResolveFacility(id) {
    if (!id)
        return

    const {error, data} = await DB.getFacility(id)

    if (!error)
        return new Facility(data)
}


export class Declaration {
    id: number
    issuer_id: string
    consumer_id: string
    evaluator_id: string
    type: string
    title: string
    summary: string
    open: boolean

    constructor(data) {
        this.id = data.id
        this.created_at = data.created_at
        this.issuer_id = data.issuer_id
        this.consumer_id = data.consumer_id
        this.evaluator_id = data.evaluator_id
        this.type = data.type
        this.title = data.title
        this.summary = data.summary
        this.open = data.open
    }
}

export class ExchangeDeclaration extends Declaration {
    id: number
    facility_id: number
    facility: Facility = null
    exchange_facility_id: number
    exchange_facility: Facility = null

    constructor(data) {
        super(data.declarations)
        this.id = data.id
        this.facility_id = data.facility_id
        this.exchange_facility_id = data.exchange_facility_id
    }
}

export class PurchaseDeclaration extends Declaration {
    id: number
    price: number
    facility_id: number
    facility: Facility = null

    constructor(data) {
        super(data.declarations)
        this.id = data.id
        this.price = data.price
        this.facility_id = data.facility_id
    }
}

export class SaleDeclaration extends Declaration {
    id: number
    facility_id: number
    facility: Facility = null
    price: number

    constructor(data) {
        super(data.declarations)
        this.id = data.id
        this.facility_id = data.facility_id
        this.price = data.price
    }
}