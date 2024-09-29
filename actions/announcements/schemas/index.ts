import * as z from 'zod';

export const announcementSchema = z.object({
    title: z.string().min(1, 'Título é um campo obrigatório!'),
    content: z.string().min(1, 'Conteúdo é um campo obrigatório'),
    classes: z.array(z.number()).min(1, 'Selecione ao menos uma classe para receber o comunicado'),
  });
  
export  type AnnouncementFormData = z.infer<typeof announcementSchema>;

export interface IGetAnnouncementsQueryParams {
    title?: string;
    author?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }