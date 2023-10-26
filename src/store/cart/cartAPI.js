import {rootAPI} from "../api/rootAPI";

const cartAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getCart: build.query({
            query() {
                return {
                    url: 'bucket',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            },
            providesTags: ['Cart']
        }),

        addProductToCart: build.mutation({
            query(id) {
                return {
                    url: `bucket/add/${id}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            },
            invalidatesTags: ['Cart'],
        }),

        deleteProductFromCart: build.mutation({
            query(id) {
                return{
                    url: `bucket/delete/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
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