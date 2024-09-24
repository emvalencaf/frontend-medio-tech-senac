import * as z from 'zod';

export const announcementSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    classes: z.array(z.number()).min(1, 'Select at least one class'),
  });
  
export  type AnnouncementFormData = z.infer<typeof announcementSchema>;

export interface IGetAnnouncementsQueryParams {
    title?: string;
    author?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }