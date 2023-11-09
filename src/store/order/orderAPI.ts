import {rootAPI} from "../api/rootAPI";
import {IOrder} from "../../@types/orderType";

const orderAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getUserOrders: build.query<IOrder[], null>({
            query() {
                return "orders/user"
            },
            providesTags: ['Order'],
        }),
        checkout: build.mutation({
            query() {
                return {
                    url: 'orders',
                    method: 'POST'
                }
            },
            invalidatesTags: ['Order', 'Cart'],
        })
    })
})

export const {useGetUserOrdersQuery, useCheckoutMutation} = orderAPI;