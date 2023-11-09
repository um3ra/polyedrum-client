import {IGenre} from "./genreType";

export interface ICategory {
    id: number
    string: string
    genres: Array<IGenre>
}