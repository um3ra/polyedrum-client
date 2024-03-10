import { APIResponse, rootAPI } from "../api/rootAPI";
import { IOrder } from "../../@types/orderType";

const orderAPI = rootAPI.injectEndpoints({
	endpoints: (build) => ({
		getUserOrders: build.query<APIResponse<IOrder[]>, null>({
			query() {
				return "orders/user";
			},
			providesTags: ["Order"]
		}),
		checkout: build.mutation<APIResponse<string>, null>({
			query() {
				return {
					url: "orders",
					method: "POST"
				};
			},
			invalidatesTags: ["Order", "Cart"]
		})
	})
});

export const { useGetUserOrdersQuery, useCheckoutMutation } = orderAPI;
