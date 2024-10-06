import { AnnouncementFormData, IGetAnnouncementsQueryParams } from "../actions/announcements/schemas";
import { IAnnouncementEntity, IGetAnnouncementsResponse, } from "../actions/announcements/types";
import { IClassEntity, IGetClassesResponse } from "../actions/classes/types";

export interface AnnouncementDtO {
    title: string;
    author: number;
    content: string;
}

export interface IHandleActionAnnouncement {
    handleActionCreate: (data: AnnouncementFormData) => Promise<IAnnouncementEntity | null>;
    handleActionGetClassesByTeacher: (authorId: number) => Promise<IClassEntity[] | null>;
    handleActionGetAllClasses: () => Promise<IGetClassesResponse| null>;
    handleActionGetAnnouncements: (queryparams?: IGetAnnouncementsQueryParams) => Promise<IGetAnnouncementsResponse | null>
}