import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    EnumOrder,
    EnumSort,
    ICurrentSelection,
    IGetAllProductsParams,
    IPagination,
    IProductsResponse,
    IProductsState
} from "../../@types/productType";
import { RootState } from "../store";

const initialState: IProductsState = {
    productList: null,
    loading: false,
    filter: {
        currentSelection: {
            selectionName: null,
            selectionType: null
        },
        destination: "",
        order: EnumOrder.ASC,
        sort: EnumSort.TITLE,
        pagination: {
            pageNo: 0,
            pageSize: 9,
            totalCount: null,
            totalPages: null
        }
    }
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        toggleCurrentSelection(
            state,
            { payload }: PayloadAction<ICurrentSelection>
        ) {
            state.filter.currentSelection = payload;
        },
        setPaginationData(state, { payload }: PayloadAction<IPagination>) {
            state.filter.pagination = payload;
        },
        setSortData(
            state,
            { payload }: PayloadAction<{ order: EnumOrder; sort: EnumSort }>
        ) {
            const { order, sort } = payload;
            state.filter = { ...state.filter, order, sort };
        },
        setSearch(state, { payload }: PayloadAction<{ destination: string }>) {
            state.filter.destination = payload.destination;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
            state.productList = payload;
            state.loading = false;
        });
        builder.addCase(getAllProducts.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const getAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async (
        { name = "", sortType = "", pageNo = 0 }: IGetAllProductsParams,
        thunkAPI
    ) => {
        try {
            const filterData = (thunkAPI.getState() as RootState).products
                .filter;
            const { pagination, currentSelection, sort, order } = filterData;

            let params = `?destination=${filterData.destination}&pageNo=${pageNo}&pageSize=${pagination.pageSize}&order=${order}&sort=${sort}`;
            let queryName = name;
            let queryType = sortType;
            if (queryName && queryType) {
                params = `/${queryType}/${queryName}${params}`;
            } else if (
                currentSelection.selectionName &&
                currentSelection.selectionType
            ) {
                queryName = currentSelection.selectionName;
                queryType = currentSelection.selectionType;
                params = `/${queryType}/${queryName}${params}`;
            }
            const { data }: { data: IProductsResponse } = await (
                await fetch(
                    process.env.REACT_APP_API_URL + `/products${params}`
                )
            ).json();

            const paginationData = {
                pageNo: data.pageNo,
                pageSize: data.pageSize,
                totalCount: data.totalCount,
                totalPages: data.totalPages
            };
            queryName = decodeURI(queryName);
            queryType = decodeURI(queryType);
            thunkAPI.dispatch(setPaginationData(paginationData));
            thunkAPI.dispatch(
                toggleCurrentSelection({
                    selectionName: queryName,
                    selectionType: queryType
                })
            );
            return data.items;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const {
    toggleCurrentSelection,
    setPaginationData,
    setSortData,
    setSearch
} = productsSlice.actions;
export default productsSlice.reducer;
