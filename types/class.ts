import { ClassFormData } from "../actions/classes/schemas";
import { IClassEntity } from "../actions/classes/types";

export interface IHandleActionClass {
    handleActionCreate: (data: ClassFormData) => Promise<IClassEntity | null>;
}