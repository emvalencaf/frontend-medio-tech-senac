import { TeachingAssignmentFormData, TeachingAssignmentFormDataPartialUpdate } from "../actions/coordinators/schemas";
import { IResponseAddStudentForm, ITeachingAssignmentEntity } from "../actions/coordinators/types";

export interface IHandleActionCoordinator {
    handleActionDeleteTeachingAssignmentById: (teachingAssignmentId: number) => Promise<void>;
    handleActionCreateTeachingAssignment: (classId: number, data: TeachingAssignmentFormData) => Promise<ITeachingAssignmentEntity | null>;
    handleActionPartialUpdateTeachingAssignment: (teachingAssignmentId: number, data: TeachingAssignmentFormDataPartialUpdate) => Promise<ITeachingAssignmentEntity | null>;
    handleActionGetTeachingAssignmentById: (teachingAssignmentId: number) => Promise<ITeachingAssignmentEntity>;
    handleActionAddStudentToClass: (studentId: number, classId: number) => Promise<IResponseAddStudentForm | null>;
    handleActionRemoveStudentFromClass: (studentId: number, classId: number) => Promise<IResponseAddStudentForm | null>;
}