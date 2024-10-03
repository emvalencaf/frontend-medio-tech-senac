import { IStudentEntity } from "../actions/students/types";

export interface IHandleActionStudent {
    handleActionGetAll: (showRels?: boolean, excludeStudentsWithinClass?: boolean, onlyStudentWithClassId?: number) =>Promise<IStudentEntity[] | null>;
}