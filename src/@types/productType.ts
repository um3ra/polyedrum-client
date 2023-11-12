import {IGenre} from "./genreType";

export enum EnumOrder {
    ASC='ASC', DESC='DESC'
}

export enum EnumSort {
    TITLE='title', PRICE='price', AUTHOR='author'
}

export interface IProductsItem{
    id: number
    title: string
    price: number
    img: string
    author: string
}

interface IProductAdditional{
    description: string
    numberOfPages: number
    publisher: string
    weight: number
}

export interface IProduct extends IProductsItem{
    genres: IGenre[]
    additional: IProductAdditional
    imageURL: string
}

export interface IPagination {
    pageNo: number
    pageSize: number
    totalCount: number | null
    totalPages: number | null
}

export interface ICurrentSelection {
    selectionName: string | null
    selectionType: string | null
}

interface IProductsFilter{
    currentSelection: ICurrentSelection
    order: EnumOrder
    sort: EnumSort
    pagination: IPagination
}

export interface IProductsState{
    productList: Array<IProductsItem> | null
    loading: boolean
    filter: IProductsFilter
}

export interface IAuthor extends IGenre{}

export interface IGetAllProductsParams{
    name?: string
    sortType?: string
    pageNo?: number
}

export interface IProductsResponse extends IPagination{
    items: Array<IProductsItem>
}