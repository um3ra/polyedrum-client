import {APIResponse, rootAPI} from "../api/rootAPI";
import {ICart} from "../../@types/cartType";

const cartAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getCart: build.query<APIResponse<ICart>, null>({
            query() {
                return {
                    url: 'bucket',
                    method: 'GET',
                }
            },
            providesTags: ['Cart']
        }),

        addProductToCart: build.mutation<APIResponse<string>, number>({
            query(id) {
                return {
                    url: `bucket/add/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: ['Cart'],
        }),

        deleteProductFromCart: build.mutation<APIResponse<string>, number>({
            query(id) {
                return{
                    url: `bucket/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Cart'],
        })
    })
})

export const {
    useGetCartQuery,
    useAddProductToCartMutation,
    useDeleteProductFromCartMutation,
} = cartAPI;