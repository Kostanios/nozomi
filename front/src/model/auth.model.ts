import { AxiosError } from 'axios';

export interface InitialAuthState {
    user: User | null,
    loading: {
        user: boolean,
        login: boolean,
        createUser: boolean,
        getCurrentUser: boolean
    },
    error: {
        user: AxiosError<Error> | null,
        login: AxiosError<Error> | null,
        createUser: AxiosError<Error> | null,
        getCurrentUser: AxiosError<Error> | null
    }
}

export interface AuthState extends InitialAuthState {
    logIn: (username: string, password: string, onSuccess: () => void) => Promise<void>
    createUser: (username: string, password: string, onSuccess: () => void) => Promise<void>
    getCurrentUser: (onSuccess?: () => void, onError?: () => void) => Promise<void>
    logOut: (onSuccess?: () => void) => void
}

export interface User {
    username: string
}
