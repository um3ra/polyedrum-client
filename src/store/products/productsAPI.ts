import { APIResponse, rootAPI } from "../api/rootAPI";
import { IAuthor, IProduct, IProductsItem } from "../../@types/productType";

const productsAPI = rootAPI.injectEndpoints({
	endpoints: (build) => ({
		getProductByName: build.query<APIResponse<IProduct>, string>({
			query(name) {
				return `/products/${name}`;
			},
			providesTags: ["Product"]
		}),

		getAllProductAuthors: build.query<APIResponse<IAuthor[]>, null>({
			query() {
				return "/products/author/all";
			}
		}),

		createProduct: build.mutation<
			APIResponse<string>,
			Omit<IProduct, "id">
		>({
			query(body) {
				return {
					url: "/products/create",
					method: "POST",
					body
				};
			}
		}),

		uploadProductImage: build.mutation<
			APIResponse<string>,
			{ img: string; product: string }
		>({
			query({ img, product }) {
				const formData = new FormData();
				formData.append("image", img);
				formData.append("product", product);
				return {
					url: `/products`,
					method: "POST",
					formData: true,
					body: formData
				};
			},
			invalidatesTags: ["Product"]
		}),

		deleteProduct: build.mutation<APIResponse<string>, number>({
			query(id) {
				return {
					url: `/products/${id}`,
					method: "DELETE"
				};
			}
		}),

		updateProduct: build.mutation<
			APIResponse<string>,
			{ id: number; productData: Omit<IProduct, "id"> }
		>({
			query({ id, productData }) {
				return {
					url: `products/update/${id}`,
					method: "PUT",
					body: productData
				};
			}
		}),
		updateProductGenres: build.mutation<
			APIResponse<string>,
			{ id: number; genres: string[] }
		>({
			query({ id, genres }) {
				return {
					url: `products/${id}/genres`,
					method: "PUT",
					body: genres
				};
			},
			invalidatesTags: ["Product"]
		})
	}),
	overrideExisting: false
});

export const {
	useGetProductByNameQuery,
	useGetAllProductAuthorsQuery,
	useCreateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
	useLazyGetProductByNameQuery,
	useUpdateProductGenresMutation
} = productsAPI;
