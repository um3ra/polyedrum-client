import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";

export interface APIResponse<T>{
    data: T
    http: string
    message: string
}

export const rootAPI = createApi({
    reducerPath: 'root',
    tagTypes:
        ['Cart', 'User', 'Category', 'Product', 'Genre', 'Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
});