export interface IGradeEntity {
    id: number;
    studentId: number;
    teachingAsignmentId: number;
    grade: 'SS' | 'S' | 'MB';
    score: number;
    avaliation: number;
}