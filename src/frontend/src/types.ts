export interface Lot {
    id: string
    name: string | null
    address: string | null
    description: string | null
    price: number | null
    rating: number | null
    spots: number
    lat: number
    lng: number
    forecasts: number[]
}


export interface User {
    uid: string
    name: string | null
    email: string
    favoriteLotIds: string[]
}