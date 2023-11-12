import {APIResponse, rootAPI} from "../api/rootAPI";
import {IAuthResponse, IProfile, IUser} from "../../@types/userType";


const userAPI = rootAPI.injectEndpoints({
    endpoints: build => ({

        login:
            build.mutation<APIResponse<IAuthResponse>, IUser>({
                query(body) {
                    return {
                        url: '/auth/login',
                        method: 'POST',
                        body,
                    }
                },
            }),

        register:
            build.mutation<APIResponse<IAuthResponse>, IUser>({
                query(body) {
                    return {
                        url: '/auth/register',
                        method: 'POST',
                        body,
                    }
                }
            }),

        getUserProfile:
            build.query<APIResponse<IProfile>, null>({
                query() {
                    return {
                        url: 'user/profile',
                        method: 'GET',
                    }
                },

                providesTags: ['User']
            }),

        updateUserData:
            build.mutation<APIResponse<string>, { id: number, body: IUser }>({
                query({id, body}) {
                    return {
                        url: `user/${id}`,
                        method: "PUT",
                        body
                    }
                },
                invalidatesTags: ['User'],
            }),
        getUsers:
            build.query<APIResponse<IUser[]>, null>({
                query() {
                    return {
                        url: "/user",
                        method: "GET",
                    }
                }
            }),
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