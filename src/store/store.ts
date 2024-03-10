import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import { rootAPI } from "./api/rootAPI";
import authSlice from "./auth/authSlice";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["auth"]
};

const rootReducer = combineReducers({
	auth: authSlice,
	products: productsSlice,
	[rootAPI.reducerPath]: rootAPI.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		}).concat(rootAPI.middleware),
	devTools: true
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
