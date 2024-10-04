import axios from "axios";
import { IGetUsersQueryParams, IGetUsersResponse, IUserEntity } from "./types";
import { UpdateUserFormData } from "./schemas";

const BACKEND_URL = `${process.env.BACKEND_URL}/users`

export const deleteUserById = async (userId: number, token: string) => {
    try {
        const res = await axios.delete(`${BACKEND_URL}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("Um erro desconhecido aconteceu.");
        }
    }
}

export const getUserById = async (userId: number, token: string): Promise<IUserEntity | null> => {
    try {
        const res = await axios.get(`${BACKEND_URL}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("Um erro desconhecido aconteceu.");
        }
    }    
}

export const updateUserById = async (userId: number, userData: UpdateUserFormData, token: string) => {
    try {
        const res = await axios.patch(`${BACKEND_URL}/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("Um erro desconhecido aconteceu.");
        }
    }
}

export const getAllUsers = async (token: string, queryParams?: IGetUsersQueryParams): Promise<IGetUsersResponse | null> => {
    try {
        const url = new URL(`${BACKEND_URL}`);

        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                if (queryParams[key as keyof IGetUsersQueryParams] !== undefined) {
                    url.searchParams.append(key, queryParams[key as keyof IGetUsersQueryParams]!.toString());
                }
            });
        }

        const res = await axios.get(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = res.data;

        return data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("Um erro desconhecido aconteceu");
        }
    }
}