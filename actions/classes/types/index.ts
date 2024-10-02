export interface IClassEntity {
    id: number;
    name: string;
    semester: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGetClassesQueryParams {
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export interface IGetClassesResponse {
    data: IClassEntity[];
    currentPage: number;
    totalPages: number;
}