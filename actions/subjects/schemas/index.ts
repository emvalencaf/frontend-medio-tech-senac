import * as z from 'zod';

export const createSubjectSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name cannot exceed 50 characters'),
    description: z
        .string()
        .min(2, 'Description must be at least 2 characters long')
        .max(50, 'Description cannot exceed 50 characters')
});

export const updateSubjectSchema = createSubjectSchema.partial();

// Infer the form data type
export type ISubjectFormData = z.infer<typeof createSubjectSchema>;

// Use Partial on the inferred type
export type IUpdateSubjectFormData = Partial<ISubjectFormData>;

