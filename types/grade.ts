import { IGradeDataForm, IUpdateGradeDataForm } from "../actions/grades/schemas";
import { IGradeEntity } from "../actions/grades/types";

export interface IHandleActionGrades {
    handleActionGetAllGradeByTeachingIdAndStudentId:  (teachingAssignmentId: number, studentId: number) => Promise<IGradeEntity[]>;
    handleActionCreateGrade: (teachingAssignmentId: number, gradeDTO: IGradeDataForm) => Promise<IGradeEntity>;
    handleActionUpdateGrade: (teachingAssignmentId: number, gradeDTO: IUpdateGradeDataForm) => Promise<IGradeEntity>;
    handleActionDeleteGrade: (gradeId: number) => Promise<void>;
    handleActionGetGradeById: (gradeId: number) => Promise<IGradeEntity>;
}