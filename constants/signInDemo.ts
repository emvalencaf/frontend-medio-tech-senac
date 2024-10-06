interface IDataSignInDemo {
    email: string;
    password: string;
    userType: 'TEACHER' | 'COORDINATOR' | 'STUDENT';
}

export const dataSignInDemo: IDataSignInDemo[] = [
    {
        email: String(process.env.NEXT_PUBLIC_DEMO_AUTH_TEACHER_EMAIL),
        password: String(process.env.NEXT_PUBLIC_DEMO_AUTH_TEACHER_PASSWORD),
        userType: 'TEACHER',
    },
    {
        email: String(process.env.NEXT_PUBLIC_DEMO_AUTH_STUDENT_EMAIL),
        password: String(process.env.NEXT_PUBLIC_DEMO_AUTH_STUDENT_PASSWORD),
        userType: 'STUDENT',
    },
    {
        email: String(process.env.NEXT_PUBLIC_DEMO_AUTH_COORDINATOR_EMAIL),
        password: String(process.env.NEXT_PUBLIC_DEMO_AUTH_COORDINATOR_PASSWORD),
        userType: 'COORDINATOR',
    },
]