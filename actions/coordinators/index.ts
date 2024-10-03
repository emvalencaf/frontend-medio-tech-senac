import axios from "axios";
import { TeachingAssignmentFormData } from "./schemas";
import { ITeachingAssignmentEntity } from "./types";

const BACKEND_URL = `${process.env.BACKEND_URL}/coordinators`;

export const createTeachingAssignment = async (classId: number, data: TeachingAssignmentFormData, token: string): Promise<ITeachingAssignmentEntity | null> => {
    const { subjectId, teacherId } = data;

    try {
        const res = await axios.post(`${BACKEND_URL}/assign-teacher-class?teacherId=${teacherId}&classId=${classId}&subjectId=${subjectId}`, null, {
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