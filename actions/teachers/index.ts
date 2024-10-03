import axios from "axios";
import { ITeacherEntity } from "./types";

const BACKEND_URL = `${process.env.BACKEND_URL}/teachers`

export const getAllTeachers = async (token: string): Promise<ITeacherEntity[] | null> => {
    try {
        const res = await axios.get(`${BACKEND_URL}`, {
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