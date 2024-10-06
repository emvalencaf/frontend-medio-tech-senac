import axios from "axios";
import { IGetSubjectResponse, IGetSubjectsQueryParams, ISubjectEntity } from "./types";
import { ISubjectFormData, IUpdateSubjectFormData } from "./schemas";

const BACKEND_URL = `${process.env.BACKEND_URL}/subjects`

export const updateSubject = async (subjectId: number, subjectData: IUpdateSubjectFormData, token: string): Promise<ISubjectEntity | null> => {
    try {
        const res = await axios.patch(`${BACKEND_URL}/${subjectId}`, subjectData, {
            'headers': {
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

export const createSubject = async (subjectData: ISubjectFormData, token: string) => {
    try {
        const res = await axios.post(BACKEND_URL, subjectData, {
            'headers': {
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

export const deleteSubjectById = async (subjectId: number, token: string) => {
    try {
        const res = await axios.delete(`${BACKEND_URL}/${subjectId}`, {
            'headers': {
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

export const getSubjectById = async (subjectId: number, token: string): Promise<ISubjectEntity | null> => {
    try {
        console.log(`${BACKEND_URL}/${subjectId}`)
        const res = await axios.get(`${BACKEND_URL}/${subjectId}`, {
            'headers': {
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

export const getAllSubjects = async (token: string, queryParams: IGetSubjectsQueryParams): Promise<IGetSubjectResponse | null> => {
    try {
        // const url = BACKEND_URL + (excludeByClassId ? `?excludeByClassId=${excludeByClassId}` : '');
        const url = new URL(BACKEND_URL);
        
        if (queryParams) {
            Object.keys(queryParams).forEach(key => {
                if (queryParams[key as keyof IGetSubjectsQueryParams] !== undefined) {
                    url.searchParams.append(key, queryParams[key as keyof IGetSubjectsQueryParams]!.toString());
                }
            });
        }

        const res = await axios.get(url.toString(), {
            'headers': {
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