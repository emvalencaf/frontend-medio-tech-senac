import { z } from 'zod';

const GradeScoreEnum = z.enum(['SS', 'S', 'MB']); // Defina seu enum com as notas aqui

export const createGradeSchema = z.object({
    grade: GradeScoreEnum,
    score: z
        .string()
        .transform(value => parseInt(value, 10))  // Converter string para número
        .refine(value => value >= 0 && value <= 10, {
            message: 'As notas só podem ir de 0 a 10',
        })
        .optional(),
    studentId: z
        .number()
        .int()
        .positive({ message: 'Deve ser um estudante válido' }),
    avaliation: z
        .string()
        .transform(value => parseInt(value, 6))  // Converter string para número
        .refine(value => value >= 1 && value <= 6, {
            message: 'O ensino médio só pode ter até 6 avaliações',
        }),
});

export type IGradeDataForm = z.infer<typeof createGradeSchema>;

export const updateGradeSchema = z.object({
    grade: GradeScoreEnum.optional(),
    score: z
        .string()
        .transform(value => parseFloat(value))  // Converter string para número
        .refine(value => value >= 0 && value <= 10, {
            message: 'As notas só podem ir de 0 a 10',
        })
        .optional(),
    gradeId: z
        .number()
        .int()
        .positive({ message: 'Deve ser uma nota válida' }),
    studentId: z
        .number()
        .int()
        .positive({ message: 'Deve ser um estudante válido' }),
    avaliation: z
        .string()
        .transform(value => parseInt(value, 6))  // Converter string para número
        .refine(value => value >= 1 && value <= 6, {
            message: 'O ensino médio só pode ter até 6 avaliações',
        }),
});

export type IUpdateGradeDataForm = z.infer<typeof updateGradeSchema>;