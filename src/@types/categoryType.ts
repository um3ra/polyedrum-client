import {IGenre} from "./genreType";

export interface ICategory {
    id: number
    name: string
    genres: Array<IGenre>
}