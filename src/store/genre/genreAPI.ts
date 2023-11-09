import {rootAPI} from "../api/rootAPI";
import {IGenre} from "../../@types/genreType";


const genreAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getGenres: build.query<IGenre, null>({
            query() {
                return 'genres'
            },
            providesTags: ['Genre'],
        }),
        getGenreByName: build.query<IGenre, string>({
            query(name) {
                return `/genres/${name}`
            }
        }),
        createGenre: build.mutation({
            query(data: IGenre) {
                return {
                    url: 'genres/create',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Genre'],
        }),
        updateGenre: build.mutation({
            query({name, data}: {name: string, data: IGenre}) {
                return {
                    url: `genres/${name}`,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: ['Genre'],
        }),
        deleteGenreByName: build.mutation({
            query(name: string) {
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