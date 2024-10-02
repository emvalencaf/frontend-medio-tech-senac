interface IDataSignInDemo {
    email: string;
    password: string;
    userType: 'TEACHER' | 'COORDINATOR' | 'STUDENT';
}

export const dataSignInDemo: IDataSignInDemo[] = [
    {
        email: 'aocharle_vi@gmail.com',
        password: 'medêuMaSintese1954$',
        userType: 'TEACHER',
    },
    {
        email: 'aocharle_iii@gmail.com',
        password: 'medêuMaSintese1954$',
        userType: 'STUDENT',
    },
    {
        email: 'aocharle_ii@gmail.com',
        password: 'medêuMaSintese1954$',
        userType: 'COORDINATOR',
    },
]