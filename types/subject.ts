import { ISubjectFormData, IUpdateSubjectFormData } from "../actions/subjects/schemas";
import { IGetSubjectResponse, ISubjectEntity } from "../actions/subjects/types";

export interface IHandleActionSubject {
    handleActionGetAll: (classId?: number) =>Promise<IGetSubjectResponse | null>;
    handleActionCreate: (data: ISubjectFormData) => Promise<ISubjectEntity | null>;
    handleActionUpdate: (subjectId: number, data: IUpdateSubjectFormData) => Promise<ISubjectEntity | null>;
    handleActionDeleteById: (subjectId: number) => Promise<void>;
    handleActionGetById: (subjectId: number) => Promise<ISubjectEntity | null>;
}
