import { ITeachingAssignmentEntity } from "../../coordinators/types";

export interface IClassEntity {
    id: number;
    name: string;
    semester: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
    TeachingAssignment?: ITeachingAssignmentEntity[]
}


export interface IGetClassesQueryParams {
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    noPagination: boolean;
}

export interface IGetClassesResponse {
    data: IClassEntity[];
    currentPage: number;
    totalPages: number;
}