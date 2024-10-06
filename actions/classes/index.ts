import axios from "axios";

// types
import { IClassEntity, IGetClassesQueryParams, IGetClassesResponse } from "./types";
import { ClassFormData, ClassFormDataPartialUpdate } from "./schemas";

const BACKEND_URL = `${process.env.BACKEND_URL}/classes`;

export const getClassById = async (classId: number, token: string, showRels: boolean = false) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/${classId}?showRels=${showRels}`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
            throw new Error('Um erro desconhecido aconteceu');
        }
    }
};


export const createClass = async (data: ClassFormData, token: string): Promise<IClassEntity | null> => {
    const { name, semester, year } = data;

    try {
        const res = await axios.post(BACKEND_URL, { name, semester, year }, {
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

export const partialUpdateClass = async (classId: number, data: ClassFormDataPartialUpdate, token: string): Promise<IClassEntity | null> => {
    try {
        const res = await axios.patch(`${BACKEND_URL}/${classId}`, {
            ...data,
        }, {
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

export const getAllByTeacher = async (teacherId: number, token: string): Promise<IClassEntity[] | null> => {
    try {
        const res = await axios.get(`${BACKEND_URL}/teachers/${teacherId}`, {
            'headers': {
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

export const getAllClasses = async (token: string, queryParams?: IGetClassesQueryParams): Promise<IGetClassesResponse | null> => {
    try {
        const url = new URL(`${BACKEND_URL}`);

        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                if (queryParams[key as keyof IGetClassesQueryParams] !== undefined) {
                    url.searchParams.append(key, queryParams[key as keyof IGetClassesQueryParams]!.toString());
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

export const deleteClass = async (classId: number, token: string) => {

    try {
        const res = await axios.delete(`${BACKEND_URL}/${classId}`, {
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