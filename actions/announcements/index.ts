// axios
import axios from "axios";

// schemas
import { AnnouncementFormData } from "./schemas";

// types
import { IResponseCreateAnnouncement } from "./responsesTypes";
import { IResponseError } from "../responsesTypes";

const BACKEND_URL = `${process.env.BACKEND_URL}/announcements`;

export const createAnnouncement = async (announcement: AnnouncementFormData): Promise<IResponseCreateAnnouncement | IResponseError> => {
    const { title, content, classes } = announcement;

    // Verifica se classes não está vazio
    if (!classes || classes.length === 0) {
        throw new Error("Classes are required");
    }

    // Formata os IDs das classes para parâmetros
    const classIds = classes.join(',');

    const url = `${BACKEND_URL}/send/${classIds}`;
    try {
        const res = await axios.post(url, { title, content }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.data;
    } catch (err: any) {
        // Verifica se a resposta tem dados
        if (err?.response && err?.response?.data) {
            console.log(err?.response?.data);
            throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};
