import { IStudentEntity } from "../actions/students/types";

export interface IHandleActionStudent {
    handleActionGetAll: (showRels?: boolean) =>Promise<IStudentEntity[] | null>;
}