import * as z from 'zod';

export const  teachingAssignmentSchema = z.object({
    subjectId: z.string().min(1, 'Matéria é um campo obrigatório')
      .transform(value => parseInt(value)),
    teacherId: z.string().min(1, 'Professor é um campo obrigatório')
      .transform(value => parseInt(value)),
});

export type TeachingAssignmentFormData = z.infer<typeof teachingAssignmentSchema>;

export const partialUpdateTeachingAssignmentSchema = z.object({
    subjectId: z.string().min(1, 'Matéria é um campo obrigatório')
      .transform(value => parseInt(value)),
    teacherId: z.string().min(1, 'Professor é um campo obrigatório')
      .transform(value => parseInt(value)),
}).optional();

export type TeachingAssignmentFormDataPartialUpdate = z.infer<typeof partialUpdateTeachingAssignmentSchema>;