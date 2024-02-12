import {AxiosError} from "axios";

export interface InitialAuthState {
    user: User | null,
    loading: {
        user: boolean,
        login: boolean,
        createUser: boolean
    },
    error: {
        user: AxiosError<Error> | null,
        login: AxiosError<Error> | null,
        createUser: AxiosError<Error> | null
    }
}

export interface AuthState extends InitialAuthState {
    logIn: (username: string, password: string, onSuccess: () => void) => Promise<void>
    createUser: (username: string, password: string, onSuccess: () => void) => Promise<void>
    getCurrentUser: (onSuccess?: () => void) => Promise<void>
    logOut: () => void
}

export interface User {
    username: string
}
