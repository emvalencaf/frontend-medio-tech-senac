import { ISubjectEntity } from "../actions/subjects/types";
import { ITeacherEntity } from "../actions/teachers/types";

export interface IHandleActionSubject {
    handleActionGetAll: (classId?: number) =>Promise<ISubjectEntity[] | null>;
}