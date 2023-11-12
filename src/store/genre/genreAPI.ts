import {APIResponse, rootAPI} from "../api/rootAPI";
import {IGenre} from "../../@types/genreType";


const genreAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getGenres: build.query<APIResponse<IGenre[]>, null>({
            query() {
                return 'genres'
            },
            providesTags: ['Genre'],
        }),
        getGenreByName: build.query<APIResponse<IGenre>, string>({
            query(name) {
                return `/genres/${name}`
            }
        }),
        createGenre: build.mutation<APIResponse<string>, IGenre>({
            query(data) {
                return {
                    url: 'genres/create',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Genre'],
        }),
        updateGenre:
            build.mutation<APIResponse<string>, { name: string, data: IGenre }>({
                query({name, data}) {
                    return {
                        url: `genres/${name}`,
                        method: 'PUT',
                        body: data,
                    }
                },
                invalidatesTags: ['Genre'],
            }),
        deleteGenreByName: build.mutation<APIResponse<string>, string>({
            query(name) {
                return {
                    url: `/genres/${name}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Genre']
        })
    }),
})

export const {
    useGetGenresQuery,
    useGetGenreByNameQuery,
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreByNameMutation,
} = genreAPI;