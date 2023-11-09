import {rootAPI} from "../api/rootAPI";
import {ICategory} from "../../@types/categoryType";

const categoryAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getCategories: build.query<ICategory, null>({
            query() {
                return 'categories'
            },
            providesTags: ['Category'],
        }),

        getCategoryByName: build.query<ICategory, string>({
            query(name) {
                return `categories/${name}`
            },
            providesTags: ['Category'],
        }),

        deleteCategoryByName: build.mutation({
            query(name: string) {
                return {
                    url: `categories/${name}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Category'],
        }),

        updateCategoryByName: build.mutation({
            query({name, categoryData}: {name: string, categoryData: ICategory}) {
                return {
                    url: `categories/${name}`,
                    method: 'PUT',
                    body: categoryData,
                }
            },
            invalidatesTags: ['Category']
        }),

        createCategory: build.mutation({
            query(categoryData: ICategory) {
                return {
                    url: 'categories',
                    method: 'POST',
                    body: categoryData,
                }
            },
            invalidatesTags: ['Category'],

        }),

        addGenreToCategory: build.mutation({
            query({category, genre}: {category: string, genre: string}) {
                return {
                    url: `categories/${category}?genre=${genre}`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['Category']
        }),

        deleteGenreFromCategory: build.mutation({
            query({category, genre}: {category: string, genre: string}) {
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