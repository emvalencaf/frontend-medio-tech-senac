import { AnnouncementFormData, IGetAnnouncementsQueryParams } from "../actions/announcements/schemas";
import { IAnnouncementEntity, } from "../actions/announcements/types";
import { IClassEntity } from "../actions/classes/types";

export interface AnnouncementDtO {
    title: string;
    author: number;
    content: string;
}

export interface IHandleActionAnnouncement {
    handleActionCreate: (data: AnnouncementFormData) => Promise<IAnnouncementEntity | null>;
    handleActionGetClassesByTeacher: (authorId: number) => Promise<IClassEntity[] | null>;
    handleActionGetAllClasses: () => Promise<IClassEntity[] | null>;
    handleActionGetAnnouncements: (queryparams?: IGetAnnouncementsQueryParams) => Promise<IAnnouncementEntity[] | null>;
}