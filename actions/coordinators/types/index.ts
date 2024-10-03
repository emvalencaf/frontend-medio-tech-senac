
export interface ITeachingAssignmentEntity {
    id: number;
    classId: number;
    teacherId: number;
    subjectId: number;
    subject?: {
        name: string;
    };
    teacher?: {
        firstName: string;
        lastName: string;
    };
}
