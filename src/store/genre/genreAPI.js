import {rootAPI} from "../api/rootAPI";


const genreAPI = rootAPI.injectEndpoints({
    endpoints: build => ({
        getGenres: build.query({
            query() {
                return 'genres'
            },
            providesTags: ['Genre'],
        }),
        getGenreByName: build.query({
            query(name) {
                return `/genres/${name}`
            }
        }),
        createGenre: build.mutation({
            query(data) {
                return {
                    url: 'genres/create',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['Genre'],
        }),
        updateGenre: build.mutation({
            query({name, data}) {
                return {
                    url: `genres/${name}`,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: ['Genre'],
        }),
        deleteGenreByName: build.mutation({
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