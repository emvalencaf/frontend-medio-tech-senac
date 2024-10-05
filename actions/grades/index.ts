import axios from "axios";
import { IGradeDataForm, IUpdateGradeDataForm } from "./schemas";

const BACKEND_URL = `${process.env.BACKEND_URL}/grades`


export const getGradeById = async (gradeId: number, token: string) => {

    try {
        const res = await axios.get(`${BACKEND_URL}/${gradeId}`, {
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

export const deleteGradeById = async (gradeId: number, token: string) => {

    try {
        const res = await axios.delete(`${BACKEND_URL}/${gradeId}`, {
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

export const createGrade = async (teachingAssignmentId: number, token: string, gradeData: IGradeDataForm) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/students/${gradeData.studentId}/assign-teacher-class/${teachingAssignmentId}`, gradeData, {
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

export const getAllGradeByTeachingIdAndStudentId = async (teachingAssignmentId: number, studentId: number, token: string) => {
    try {
        const url = `${BACKEND_URL}/students/${studentId}/assign-teacher-class/${teachingAssignmentId}`
        
        const res = await axios.get(url, {
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

export const partialUpdateGrade = async (teachingAssignmentId: number, token: string, gradeData: IUpdateGradeDataForm) => {
    // :gradeId/students/:studentId/assign-teacher-class/:teachingAssignmentId
    try {
        const url = `${BACKEND_URL}/${gradeData.gradeId}/students/${gradeData.studentId}/assign-teacher-class/${teachingAssignmentId}`
        const res = await axios.patch(url, gradeData, {
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
