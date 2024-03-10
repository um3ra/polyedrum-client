import { APIResponse, rootAPI } from "../api/rootAPI";
import { ICategory } from "../../@types/categoryType";

const categoryAPI = rootAPI.injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query<APIResponse<ICategory[]>, null>({
			query() {
				return "categories";
			},
			providesTags: ["Category"]
		}),

		getCategoryByName: build.query<APIResponse<ICategory>, string>({
			query(name) {
				return `categories/${name}`;
			},
			providesTags: ["Category"]
		}),

		deleteCategory: build.mutation<APIResponse<string>, number>({
			query(id) {
				return {
					url: `categories/${id}`,
					method: "DELETE"
				};
			},
			invalidatesTags: ["Category"]
		}),

		updateCategoryByName: build.mutation<
			APIResponse<string>,
			{ id: number; categoryData: ICategory }
		>({
			query({ id, categoryData }) {
				return {
					url: `categories/${id}`,
					method: "PUT",
					body: categoryData
				};
			},
			invalidatesTags: ["Category"]
		}),

		createCategory: build.mutation<APIResponse<string>, ICategory>({
			query(categoryData) {
				return {
					url: "categories",
					method: "POST",
					body: categoryData
				};
			},
			invalidatesTags: ["Category"]
		}),

		addGenreToCategory: build.mutation<
			APIResponse<string>,
			{ category: string; genre: string }
		>({
			query({ category, genre }) {
				return {
					url: `categories/${category}?genre=${genre}`,
					method: "POST"
				};
			},
			invalidatesTags: ["Category"]
		}),

		deleteGenreFromCategory: build.mutation<
			APIResponse<string>,
			{ category: string; genre: string }
		>({
			query({ category, genre }) {
				return {
					url: `categories/${category}/genre/${genre}`,
					method: "PUT"
				};
			},
			invalidatesTags: ["Category"]
		}),

		updateCategoryGenres: build.mutation<
			APIResponse<string>,
			{ id: number; genres: string[] }
		>({
			query({ id, genres }) {
				return {
					url: `categories/${id}/genres`,
					method: "PUT",
					body: genres
				};
			},
			invalidatesTags: ["Category"]
		})
	})
});

export const {
	useGetCategoriesQuery,
	useGetCategoryByNameQuery,
	useDeleteCategoryMutation,
	useUpdateCategoryByNameMutation,
	useCreateCategoryMutation,
	useAddGenreToCategoryMutation,
	useDeleteGenreFromCategoryMutation,
	useUpdateCategoryGenresMutation
} = categoryAPI;
