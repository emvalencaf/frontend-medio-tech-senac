// axios
import axios from "axios";

// schemas
import { AnnouncementFormData, IGetAnnouncementsQueryParams } from "./schemas";

// types
import { IAnnouncementEntity, IGetAnnouncementsResponse, } from "./types";

const BACKEND_URL = `${process.env.BACKEND_URL}/announcements`;

export const createAnnouncement = async (announcement: AnnouncementFormData): Promise<IAnnouncementEntity | null> => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const getAnnouncements = async (token: string, queryparams?: IGetAnnouncementsQueryParams): Promise<IGetAnnouncementsResponse | null> => {
    try {
      const url = new URL(`${BACKEND_URL}/read`);
      
      if (queryparams) {
        Object.keys(queryparams).forEach(key => {
          if (queryparams[key as keyof IGetAnnouncementsQueryParams] !== undefined) {
            url.searchParams.append(key, queryparams[key as keyof IGetAnnouncementsQueryParams]!.toString());
          }
        });
      }
      
      const res = await axios.get(url.toString(), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.response && err?.response?.data) {
        console.log(err?.response?.data);
        throw new Error(Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(', ') : err?.response?.data.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };