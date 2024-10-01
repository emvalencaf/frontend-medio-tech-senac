import * as z from 'zod';

export const classSchema = z.object({
    name: z.string().min(1, 'Nome é um campo obrigatório!'),
    semester: z.number().min(1, 'Semestre é um campo obrigatório').max(2, 'Semestre só pode ser 1 ou 2'),
    year: z.number().min(1, 'Ano é um campo obrigatório').max(3, 'O ensino médio é até o 3º ano'),
  });
  
export  type ClassFormData = z.infer<typeof classSchema>;