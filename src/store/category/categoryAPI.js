import {rootAPI} from "../api/rootAPI";

const categoryAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getCategories: build.query({
            query() {
                return 'categories'
            },
            providesTags: ['Category'],
        }),

        getCategoryByName: build.query({
            query(name) {
                return `categories/${name}`
            },
            providesTags: ['Category'],
        }),

        deleteCategoryByName: build.mutation({
            query(name) {
                return {
                    url: `categories/${name}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Category'],
        }),

        updateCategoryByName: build.mutation({
            query({name, categoryData}) {
                return {
                    url: `categories/${name}`,
                    method: 'PUT',
                    body: categoryData,
                }
            },
            invalidatesTags: ['Category']
        }),

        createCategory: build.mutation({
            query(categoryData) {
                return {
                    url: 'categories',
                    method: 'POST',
                    body: categoryData,
                }
            },
            invalidatesTags: ['Category'],

        }),

        addGenreToCategory: build.mutation({
            query({category, genre}) {
                return {
                    url: `categories/${category}?genre=${genre}`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['Category']
        }),

        deleteGenreFromCategory: build.mutation({
            query({category, genre}) {
                return {
                    url: `categories/${category}/genre/${genre}`,
                    method: 'PUT'
                }
            },
            invalidatesTags: ['Category'],
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByNameQuery,
    useDeleteCategoryByNameMutation,
    useUpdateCategoryByNameMutation,
    useCreateCategoryMutation,
    useAddGenreToCategoryMutation,
    useDeleteGenreFromCategoryMutation,
} = categoryAPI;