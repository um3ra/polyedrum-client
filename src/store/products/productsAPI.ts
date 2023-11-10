import {rootAPI} from "../api/rootAPI";
import {IAuthor, IProductsItem} from "../../@types/productType";

const productsAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getProductByName: build.query<IProductsItem, string>({
            query(name) {
                return `/products/${name}`
            },
            providesTags: ['Product'],
        }),

        getAllProductAuthors: build.query<IAuthor[], null>({
            query() {
                return '/products/author/all'
            }
        }),

        createProduct: build.mutation({
            query(body: IProductsItem) {
                return {
                    url: '/products/create',
                    method: 'POST',
                    body
                }
            },
        }),

        uploadProductImage: build.mutation({
            query({img, product}: {img: string, product: string}) {
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
            query(id: number) {
                return {
                    url: `/products/${id}`,
                    method: 'DELETE',
                }
            }
        }),

        updateProduct: build.mutation({
            query({id, productData}: {id: number, productData: IProductsItem}) {
                return {
                    url: `products/update/${id}`,
                    method: 'PUT',
                    body: productData,
                }
            }
        }),

        addProductToGenre: build.mutation({
            query({name, genre}: {name: string, genre: string}) {
                return {
                    url: `products/${name}?genre=${genre}`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['Product'],
        }),

        deleteGenreFromProduct: build.mutation({
            query({product, genre}: {product: string, genre: string}) {
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