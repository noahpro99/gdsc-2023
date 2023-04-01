export interface Lot {
    id: string
    name: string | null
    address: string | null
    description: string | null
    price: number | null
    rating: number | null
    spots: number | null
    lat: number
    lng: number
}


export interface User {
    uid: string
    name: string | null
    email: string
    favoriteLotIds: string[]
}