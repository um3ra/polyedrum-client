import {rootAPI} from "../api/rootAPI";


const userApi = rootAPI.injectEndpoints({
    endpoints: build => ({

        login: build.mutation({
            query(body) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }
            },
        }),

        register: build.mutation({
            query(body) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body,
                }
            }
        }),

        getUserProfile: build.query({
            query() {
                return {
                    url: 'user/profile',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            },

            providesTags: ['User']
        }),

        updateUserData: build.mutation({
            query({id, ...body}) {
                return {
                    url: `user/${id}`,
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body
                }
            },
            invalidatesTags: ['User'],
        }),
        getUsers: build.query({
            query() {
                return {
                    url: "/user",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            }
        })
    })
})

export const {
    useGetUserProfileQuery,
    useLazyGetUserProfileQuery,
    useGetUsersQuery,
    useUpdateUserDataMutation,
    useLoginMutation,
    useRegisterMutation
} = userApi;