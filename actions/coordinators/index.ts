import axios from "axios";
import { TeachingAssignmentFormData, TeachingAssignmentFormDataPartialUpdate } from "./schemas";
import { ITeachingAssignmentEntity } from "./types";

const BACKEND_URL = `${process.env.BACKEND_URL}/coordinators`;

export const getTeachingAssignmentById = async (teachingAssignmentId: number, token: string) => {
    try {
        const res = await axios.get(`${BACKEND_URL}/assign-teacher-class/${teachingAssignmentId}`, {
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
}

export const createTeachingAssignment = async (classId: number, data: TeachingAssignmentFormData, token: string): Promise<ITeachingAssignmentEntity | null> => {
    const { subjectId, teacherId } = data;

    try {
        console.log(token);

        const res = await axios.post(`${BACKEND_URL}/assign-teacher-class/teachers/${teacherId}/classes/${classId}/subjects/${subjectId}`, {}, {
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

export const deleteTeachingAssignmentById = async (teachingAssignmentId: number, token: string) => {
    try {
        const res = await axios.delete(`${BACKEND_URL}/assign-teacher-class/${teachingAssignmentId}`, {
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

export const partialUpdateTeachingAssignment = async (
    teachingAssignmentId: number,
    data: TeachingAssignmentFormDataPartialUpdate,
    token: string
): Promise<ITeachingAssignmentEntity | null> => {
    try {
        const res = await axios.patch(
            `${BACKEND_URL}/assign-teacher-class/${teachingAssignmentId}`,
            data, // Passando diretamente 'data' como segundo argumento
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.error(err.response.data); // Usar console.error para erros
            const message = Array.isArray(err.response.data.message)
                ? err.response.data.message.join(', ')
                : err.response.data.message;

            throw new Error(message);
        } else {
            throw new Error("Um erro desconhecido aconteceu.");
        }
    }
};
