import axios from "axios";

// types
import { IClassEntity } from "./responsesTypes";
import { IResponseError } from "../responsesTypes";

const BACKEND_URL = `${process.env.BACKEND_URL}/classes`;

export const getAllByTeacher = async (teacherId: number): Promise<IClassEntity[] | IResponseError> => {
    try {
        const res = await axios.get(`${BACKEND_URL}/teachers/${teacherId}`);

        const data = res.data;

        return data;
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const getAllClasses = async ():  Promise<IClassEntity[] | IResponseError> => {
    try {
        const res = await axios.get(BACKEND_URL);

        const data = res.data;

        return data;

    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}