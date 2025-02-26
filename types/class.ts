import { ClassFormData, ClassFormDataPartialUpdate } from "../actions/classes/schemas";
import { IClassEntity } from "../actions/classes/types";

export interface IHandleActionClass {
    handleActionCreate: (data: ClassFormData) => Promise<IClassEntity | null>;
    handleActionPartialUpdate: (classId: number, data: ClassFormDataPartialUpdate) => Promise<IClassEntity | null>;
    handleActionGetById: (classId: number, showRels?: boolean) => Promise<IClassEntity | null>;
    handleActionDeleteById: (classId: number) => Promise<void>;
}