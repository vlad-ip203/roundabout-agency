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

export class Declaration {
    id: number
    issuer_id: string
    consumer_id: string
    evaluator_id: string
    type: string
    title: string
    summary: string

    constructor(data) {
        this.id = data.id
        this.created_at = data.created_at
        this.issuer_id = data.issuer_id
        this.consumer_id = data.consumer_id
        this.evaluator_id = data.evaluator_id
        this.type = data.type
        this.title = data.title
        this.summary = data.summary
    }
}