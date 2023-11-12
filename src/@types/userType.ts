import {ICart} from "./cartType";

enum EnumRole {
    ADMIN='ADMIN', CLIENT="CLIENT"
}

export interface IUser {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    matchingPassword?: string
}

export interface IAuthResponse{
    message: string
    token: string
    mail: string
}

export interface IProfile extends IUser{
    id: number
    bucket: ICart
    role: EnumRole
}

export interface IAuthState {
    token: string | null,
    isLoggedIn: boolean,
    email: string | null,
}