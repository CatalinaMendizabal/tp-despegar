
export interface CreateCartDTO {
    userId: number
}

export interface CartDTO {
    id: number
    userId: number
    flights: number[]
}
