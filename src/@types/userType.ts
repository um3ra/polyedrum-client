import {ICart} from "./cartType";

enum EnumRole {
    ADMIN='ADMIN', CLIENT="CLIENT"
}

export interface IUser {
    firstName?: string
    lastName?: string
    email: string
    password: string
}

export interface IProfile extends IUser{
    id: number
    bucket: ICart
    role: EnumRole
}