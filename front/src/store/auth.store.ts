import {AxiosError} from "axios";
import { create } from 'zustand';

import { AuthState, InitialAuthState } from "../model/auth.model";
import { AuthService } from "../api/auth.service";
import { clearJWT, setJWT } from "../config/axiosConfig";

const initialState: InitialAuthState = {
    user: null,
    loading: {
        user: false,
        login: false,
        createUser: false
    },
    error: {
        user: null,
        login: null,
        createUser: null
    },
};

export const authStore = create<AuthState>((set, get) => ({
    logOut: () => {
        set({
            user: null
        })
        clearJWT()
        window.location.pathname = '/'
        localStorage.clear()
    },
    createUser: async (username: string, password: string, onSuccess) => {
        try {
            set({
                loading: {
                    ...get().loading,
                    createUser: true
                }
            })

            const loginRes = await AuthService.createUser(username, password);

            setJWT(loginRes.data.token);

            set({
                user: loginRes.data.user,
                loading: {
                    ...get().loading,
                    createUser: false,
                    user: true
                },
                error: {
                    ...get().error,
                    createUser: null
                }
            })

            onSuccess();
        } catch (err) {
            const error = err as AxiosError<Error>;
            console.error(error);
            set({
                loading: {
                    ...get().loading,
                    createUser: false,
                },
                error: {
                    ...get().error,
                    createUser: error
                }
            })
        }
    },
    logIn: async (username: string, password: string, onSuccess) => {
        try {
            set({
                loading: {
                    ...get().loading,
                    login: true
                }
            })

            const loginRes = await AuthService.login(username, password);

            setJWT(loginRes.data.token);

            set({
                user: loginRes.data.user,
                loading: {
                    ...get().loading,
                    login: false
                },
                error: {
                    ...get().error,
                    login: null
                }
            })

            onSuccess();
        } catch (err) {
            const error = err as AxiosError<Error>;
            console.error(error);
            set({
                loading: {
                    ...get().loading,
                    login: false
                },
                error: {
                    ...get().error,
                    login: error
                }
            })
        }
    },
    getCurrentUser: async (onSuccess) => {
        try {
            set({
                loading: {
                    ...get().loading,
                    user: true
                },
            })

            const userRes = await AuthService.getCurrentUser();

            if (userRes.data) {
                set({
                    user: userRes.data,
                    loading: {
                        ...get().loading,
                        user: false
                    },
                    error: {
                        ...get().error,
                        user: null
                    }
                })
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            const error = err as AxiosError<Error>
            set({
                user: null,
                loading: {
                    ...get().loading,
                    user: false
                },
                error: {
                    ...get().error,
                    user: error
                }
            })
        }
    },
    ...initialState,
}));
