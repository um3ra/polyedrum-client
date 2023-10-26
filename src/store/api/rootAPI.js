import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const rootAPI = createApi({
    reducerPath: 'root',
    tagTypes:
        ['Cart', 'User', 'Category', 'Product', 'Genre', 'Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
});