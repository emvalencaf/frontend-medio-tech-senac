import { TeachingAssignmentFormData, TeachingAssignmentFormDataPartialUpdate } from "../actions/coordinators/schemas";
import { ITeachingAssignmentEntity } from "../actions/coordinators/types";

export interface IHandleActionCoordinator {
    handleActionDeleteTeachingAssignmentById: (teachingAssignmentId: number) => Promise<void>;
    handleActionCreateTeachingAssignment: (classId: number, data: TeachingAssignmentFormData) => Promise<ITeachingAssignmentEntity | null>;
    handleActionPartialUpdateTeachingAssignment: (teachingAssignmentId: number, data: TeachingAssignmentFormDataPartialUpdate) => Promise<ITeachingAssignmentEntity | null>;
    handleActionGetTeachingAssignmentById: (teachingAssignmentId: number) => Promise<ITeachingAssignmentEntity>;
}