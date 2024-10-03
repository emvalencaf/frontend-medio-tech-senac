import * as z from 'zod';

export const  teachingAssignmentSchema = z.object({
    subjectId: z.number().int().positive('Matéria é um campo obrigatório')
      .transform(value => value),
    teacherId: z.number().int().positive('Professor é um campo obrigatório')
      .transform(value => value),
});

export type TeachingAssignmentFormData = z.infer<typeof teachingAssignmentSchema>;

export const partialUpdateTeachingAssignmentSchema = z.object({
    subjectId: z.number().int().positive('Matéria é um campo obrigatório')
      .transform(value => value),
    teacherId: z.number().int().positive('Professor é um campo obrigatório')
    .transform(value => value),
}).optional();

export type TeachingAssignmentFormDataPartialUpdate = z.infer<typeof partialUpdateTeachingAssignmentSchema>;

export const  addStudentSchema = z.object({
    studentId: z.number().int().positive('Estudante é um campo obrigatório')
      .transform(value => value),
});

export type AddStudentFormData = z.infer<typeof addStudentSchema>;