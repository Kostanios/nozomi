import axiosInstance from '../config/axiosConfig';
import { User } from '../model/auth.model';

export const AuthService = {
    login: async (username: string, password: string) => axiosInstance.post<{ user: User, token: string }>('/login', {
        username,
        password
    }),
    createUser: async (username: string, password: string) => axiosInstance.post<{ user: User, token: string }>('/reg', {
        username,
        password
    }),
    getCurrentUser: async () => axiosInstance.get<User>('/api/users/me')
};
