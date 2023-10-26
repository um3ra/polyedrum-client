import {rootAPI} from "../api/rootAPI";

const productsAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getProductByName: build.query({
            query(name) {
                return `/products/${name}`
            },
            providesTags: ['Product'],
        }),

        getAllProductAuthors: build.query({
            query() {
                return '/products/author/all'
            }
        }),

        createProduct: build.mutation({
            query(body) {
                return {
                    url: '/products/create',
                    method: 'POST',
                    body
                }
            },
        }),
        uploadProductImage: build.mutation({
            query({img, product}) {
                const formData = new FormData();
                formData.append('image', img);
                formData.append('product', product);
                return {
                    url: `/products`,
                    method: 'POST',
                    formData: true,
                    body: formData
                }
            },
            invalidatesTags: ['Product'],
        }),

        deleteProduct: build.mutation({
            query(id) {
                return {
                    url: `/products/${id}`,
                    method: 'DELETE',
                }
            }
        }),

        updateProduct: build.mutation({
            query({id, productData}) {
                return {
                    url: `products/update/${id}`,
                    method: 'PUT',
                    body: productData,
                }
            }
        }),

        addProductToGenre: build.mutation({
            query({name, genre}) {
                return {
                    url: `products/${name}?genre=${genre}`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['Product'],
        }),
        deleteGenreFromProduct: build.mutation({
            query({product, genre}) {
                return {
                    url: `products/${product}/genre/${genre}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: ['Product'],
        })
    }),
    overrideExisting: false
})

export const {
    useGetProductByNameQuery,
    useGetAllProductAuthorsQuery,
    useCreateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useAddProductToGenreMutation,
    useDeleteGenreFromProductMutation,
} = productsAPI;