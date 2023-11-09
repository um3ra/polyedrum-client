interface IOrderDetailsItem {
    id: number
    amount: number
    sum: number
    product
}

export interface IOrder {
    id: number
    dateOfCreation: string
    dateOfChange?: string
    orderDetails: IOrderDetailsItem[]
}