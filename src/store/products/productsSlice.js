import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productList: null,
        loading: false,
        filter: {
            currentSelection: {
                selectionName: null,
                selectionType: null,
            },
            order: "ASC",
            sort: "title",
            pagination: {
                pageNo: 0,
                pageSize: 9,
                totalCount: null,
                totalPages: null,
            },
        },
    },
    reducers: {
        toggleCurrentSelection(state, {payload}){
            state.filter.currentSelection = payload;
        },
        setPaginationData(state, {payload}){
            state.filter.pagination = payload;
        },
        setSortData(state, {payload}){
            const {order, sort} = payload;
            state.filter = {...state.filter, order, sort};
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, {payload}) => {
            state.productList = payload;
            state.message = null;
            state.loading = false;
        })
        builder.addCase(getAllProducts.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const getAllProducts = createAsyncThunk("products/getAllProducts", async ({name='', sortType='', pageNo=''}, thunkAPI) => {
    try{
        const filterData = thunkAPI.getState().products.filter;
        const {pagination, currentSelection, sort, order} = filterData;
        let params = `?pageNo=${pageNo}&pageSize=${pagination.pageSize}&order=${order}&sort=${sort}`;
        let queryName = name;
        let queryType = sortType;
        if (queryName && queryType){
            params = `/${queryType}/${queryName}${params}`
        }else if(currentSelection.selectionName && currentSelection.selectionType){
            queryName = currentSelection.selectionName;
            queryType = currentSelection.selectionType;
            params = `/${queryType}/${queryName}${params}`
        }
        const { data } = await (await fetch(process.env.REACT_APP_API_URL + `/products${params}`)).json();

        const paginationData = {
            pageNo: data.pageNo,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPages: data.totalPages,
        }
        queryName = decodeURI(queryName);
        queryType = decodeURI(queryType);
        thunkAPI.dispatch(setPaginationData(paginationData));
        thunkAPI.dispatch(toggleCurrentSelection({selectionName: queryName, selectionType: queryType}));
        return data.items;
    }catch (err){
        console.log(err);
        return thunkAPI.rejectWithValue(err);
    }
})


export const {toggleCurrentSelection, setPaginationData, setSortData} = productsSlice.actions;
export default productsSlice.reducer;