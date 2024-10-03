import { ITeacherEntity } from "../actions/teachers/types";

export interface IHandleActionTeacher {
    handleActionGetAll: (showRels?: boolean) =>Promise<ITeacherEntity[] | null>;
}