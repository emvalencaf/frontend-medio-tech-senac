import * as z from 'zod';

export const classSchema = z.object({
    name: z.string().min(1, 'Nome é um campo obrigatório!'),
    semester: z.string().min(1, 'Semestre é um campo obrigatório')
      .transform(value => parseInt(value, 10))  // Converter string para número
      .refine(value => value >= 1 && value <= 2, {
        message: 'Semestre só pode ser 1 ou 2',
      }),
    year: z.string().min(1, 'Ano é um campo obrigatório')
      .transform(value => parseInt(value, 10))  // Converter string para número
      .refine(value => value >= 1 && value <= 3, {
        message: 'O ensino médio é até o 3º ano',
      }),
});

export type ClassFormData = z.infer<typeof classSchema>;

export const partialUpdateClassSchema = z.object({
    name: z.string().min(1, 'Nome é um campo obrigatório!'),
    semester: z.string().min(1, 'Semestre é um campo obrigatório')
      .transform(value => parseInt(value, 10))  // Converter string para número
      .refine(value => value >= 1 && value <= 2, {
        message: 'Semestre só pode ser 1 ou 2',
      }),
    year: z.string().min(1, 'Ano é um campo obrigatório')
      .transform(value => parseInt(value, 10))  // Converter string para número
      .refine(value => value >= 1 && value <= 3, {
        message: 'O ensino médio é até o 3º ano',
      }),
}).optional();

export type ClassFormDataPartialUpdate = z.infer<typeof partialUpdateClassSchema>;