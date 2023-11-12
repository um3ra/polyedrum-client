import {APIResponse, rootAPI} from "../api/rootAPI";
import {ICategory} from "../../@types/categoryType";

const categoryAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getCategories: build.query<APIResponse<ICategory[]>, null>({
            query() {
                return 'categories'
            },
            providesTags: ['Category'],
        }),

        getCategoryByName: build.query<APIResponse<ICategory>, string>({
            query(name) {
                return `categories/${name}`
            },
            providesTags: ['Category'],
        }),

        deleteCategoryByName: build.mutation<APIResponse<string>, string>({
            query(name) {
                return {
                    url: `categories/${name}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Category'],
        }),

        updateCategoryByName: build.mutation<APIResponse<string>, {name: string, categoryData: ICategory}>({
            query({name, categoryData}) {
                return {
                    url: `categories/${name}`,
                    method: 'PUT',
                    body: categoryData,
                }
            },
            invalidatesTags: ['Category']
        }),

        createCategory: build.mutation<APIResponse<string>, ICategory>({
            query(categoryData) {
                return {
                    url: 'categories',
                    method: 'POST',
                    body: categoryData,
                }
            },
            invalidatesTags: ['Category'],

        }),

        addGenreToCategory: build.mutation<APIResponse<string>, {category: string, genre: string}>({
            query({category, genre}) {
                return {
                    url: `categories/${category}?genre=${genre}`,
                    method: 'POST',
                }
            },
            invalidatesTags: ['Category']
        }),

        deleteGenreFromCategory: build.mutation<APIResponse<string>, {category: string, genre: string}>({
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