import axios from "axios";
import { IStudentEntity } from "./types";

const BACKEND_URL = `${process.env.BACKEND_URL}/students`

export const getAllStudents = async (token: string, showRels?: boolean, excludeStudentsWithinClass?: boolean, onlyStudentWithClassId?: number): Promise<IStudentEntity[] | null> => {
    try {
        const url = new URL(BACKEND_URL);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        showRels && url.searchParams.set('showRels', String(showRels));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        excludeStudentsWithinClass && url.searchParams.set('excludeStudentsWithinClass', String(excludeStudentsWithinClass));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onlyStudentWithClassId && url.searchParams.set('onlyStudentWithClassId', String(onlyStudentWithClassId));

        const res = await axios.get(url.toString(), {
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