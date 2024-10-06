export interface ISubjectEntity {
    id: number;
    name: string;
    description: string;
}

export interface IGetSubjectsQueryParams {
    excludeByClassId?: number
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    noPagination?: boolean;
}

export interface IGetSubjectResponse {
    data: ISubjectEntity[];
    currentPage: number;
    totalPages: number;
}