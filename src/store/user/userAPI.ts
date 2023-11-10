import {rootAPI} from "../api/rootAPI";
import {IProfile, IUser} from "../../@types/userType";


const userAPI = rootAPI.injectEndpoints({
    endpoints: build => ({

        login: build.mutation({
            query(body: IUser) {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }
            },
        }),

        register: build.mutation({
            query(body: IUser) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body,
                }
            }
        }),

        getUserProfile: build.query<IProfile, null>({
            query() {
                return {
                    url: 'user/profile',
                    method: 'GET',
                }
            },

            providesTags: ['User']
        }),

        updateUserData: build.mutation({
            query({id, body}: {id: number, body: IUser}) {
                return {
                    url: `user/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ['User'],
        }),
        getUsers: build.query<IUser[], null>({
            query() {
                return {
                    url: "/user",
                    method: "GET",
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
} = userAPI;