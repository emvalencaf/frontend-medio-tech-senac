export interface IAnnouncementEntity {
    author: IAuthor;
    content: string;
    createdAt: string;
    id: number;
    title: string;
}

export interface IAuthor {
    firstName: string;
    lastName: string;
    userType: string;
}

export interface IGetAnnouncementsQueryParams {
    title?: string;
    author?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export interface IGetAnnouncementsResponse {
    data: IAnnouncementEntity[];
    currentPage: number;
    totalPages: number;
}