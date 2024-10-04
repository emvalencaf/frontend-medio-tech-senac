import * as z from 'zod';

export const updateUserSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters long')
        .max(50, 'First name cannot exceed 50 characters')
        .optional(),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters long')
        .max(50, 'Last name cannot exceed 50 characters')
        .optional(),
    userType: z.enum(['TEACHER', 'COORDINATOR', 'STUDENT'], {
        errorMap: () => ({ message: 'User type must be TEACHER, COORDINATOR or STUDENT' })
    }).optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
