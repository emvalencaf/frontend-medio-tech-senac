import axios from "axios";
import { ISubjectEntity } from "./types";

const BACKEND_URL = `${process.env.BACKEND_URL}/subjects`

export const getAllSubjects = async ( token: string, excludeByClassId?: number): Promise<ISubjectEntity[] | null> => {
    try {
        const url = BACKEND_URL + (excludeByClassId ? `?excludeByClassId=${excludeByClassId}` : '');

        const res = await axios.get(url, {
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