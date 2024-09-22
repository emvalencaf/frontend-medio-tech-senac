import { AnnouncementFormData } from "../actions/announcements/schemas";

export interface AnnouncementDtO {
    title: string;
    author: number;
    content: string;
}

export interface IHandleActionAnnouncement {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleActionCreate: (data: AnnouncementFormData) => Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleActionGetClassesByTeacher: (authorId: number) => Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleActionGetAllClasses: () => Promise<any>;
}