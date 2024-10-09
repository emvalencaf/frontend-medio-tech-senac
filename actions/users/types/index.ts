export interface IUserEntity {
    id: number;
    firstName: string;
    lastName: string;
    userType: 'TEACHER' | 'COORDINATOR' | 'STUDENT';
}


export interface IGetUsersQueryParams {
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    userType?: string;
    name?: string;
    subjectName?: string;
    className?: string;
}

export interface IGetUsersResponse {
    data: IUserEntity[];
    currentPage: number;
    totalPages: number;
}