import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// components
import Sidebar from "../components/Sidenav";

// providers
import ToasterProvider from "../providers/ToasterProvider";
import ModalProvider from "../providers/ModalProvider";
import { IHandleActionAnnouncement } from "../types/announcement";
import { createAnnouncement, getAnnouncements } from "../actions/announcements";
import { createClass, deleteClass, getAllByTeacher, getAllClasses, getClassById, partialUpdateClass } from "../actions/classes";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import NotificationProvider from "../providers/NotificationProvider";
import { IHandleActionClass } from "../types/class";
import { ClassFormData, ClassFormDataPartialUpdate } from "../actions/classes/schemas";
import { extractUserIdFromBackEndToken } from "../utils";
import { IHandleActionCoordinator } from "../types/coordinator";
import { addStudentToClass, createTeachingAssignment, deleteTeachingAssignmentById, getTeachingAssignmentById, partialUpdateTeachingAssignment, removeStudentFromClass } from "../actions/coordinators";
import { TeachingAssignmentFormData, TeachingAssignmentFormDataPartialUpdate } from "../actions/coordinators/schemas";
import { IHandleActionTeacher } from "../types/teachers";
import { getAllTeachers } from "../actions/teachers";
import { IHandleActionSubject } from "../types/subject";
import { createSubject, deleteSubjectById, getAllSubjects, getSubjectById, updateSubject } from "../actions/subjects";
import { IHandleActionStudent } from "../types/students";
import { getAllStudents } from "../actions/students";
import { IHandleActionUsers } from "../types/user";
import { deleteUserById, getUserById, updateUserById } from "../actions/users";
import { UserFormData } from "../actions/auth/schemas";
import { handleSignUp } from "../actions/auth";
import { UpdateUserFormData } from "../actions/users/schemas";
import { IHandleActionGrades } from "../types/grade";
import { IGradeDataForm, IUpdateGradeDataForm } from "../actions/grades/schemas";
import { createGrade, deleteGradeById, getAllGradeByTeachingIdAndStudentId, getGradeById, partialUpdateGrade } from "../actions/grades";
import { ISubjectFormData, IUpdateSubjectFormData } from "../actions/subjects/schemas";
import { IGetAnnouncementsQueryParams } from "../actions/announcements/schemas";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});



const APP_NAME = "Médio Tech App";
const APP_DEFAULT_TITLE = "Médio Tech App";
const APP_TITLE_TEMPLATE = "%s - Médio Tech App";
const APP_DESCRIPTION = "Aplicativo criado para o projeto integrador do 3º período de ADS do Senac!"

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    const token = String(session?.backendToken);

    const handleActionsAnnouncement: IHandleActionAnnouncement = {
        handleActionCreate: async (data) => {
            "use server";
            return createAnnouncement(data, token);
        },
        handleActionGetClassesByTeacher: async () => {
            "use server";
            const teacherId = extractUserIdFromBackEndToken(token);
            return getAllByTeacher(Number(teacherId), token);
        },
        handleActionGetAllClasses: async () => {
            "use server";
            return getAllClasses(token);
        },
        handleActionGetAnnouncements: async (queryparams?: IGetAnnouncementsQueryParams) => {
            "use server";
            return getAnnouncements(token, queryparams);
        }
    }

    const handleActionsClass: IHandleActionClass = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handleActionCreate: async (data: ClassFormData) => {
            "use server";
            return createClass(data, token);
        },
        handleActionPartialUpdate: async (classId: number, data: ClassFormDataPartialUpdate) => {
            "use server";
            return partialUpdateClass(classId, data, token);
        },
        handleActionGetById: async (classId: number, showRels: boolean = false) => {
            "use server";
            return getClassById(classId, token, showRels);
        },
        handleActionDeleteById: async (classId: number) => {
            "use server";
            return deleteClass(classId, token);
        }
    }

    const handleActionsCoordinator: IHandleActionCoordinator = {
        handleActionDeleteTeachingAssignmentById: async (teachingAssignmentId: number) => {
            "use server";
            return deleteTeachingAssignmentById(teachingAssignmentId, token);
        },
        handleActionCreateTeachingAssignment: async (classId: number, data: TeachingAssignmentFormData) => {
            "use server";
            return createTeachingAssignment(classId, data, token);
        },
        handleActionPartialUpdateTeachingAssignment: async (teachingAssignmentId: number, data: TeachingAssignmentFormDataPartialUpdate) => {
            "use server";
            return partialUpdateTeachingAssignment(teachingAssignmentId, data, token);
        },
        handleActionGetTeachingAssignmentById: async (teachingAssignmentId: number) => {
            "use server";
            return getTeachingAssignmentById(teachingAssignmentId, token);
        },
        handleActionAddStudentToClass: async (studentId: number, classId: number) => {
            "use server";
            return addStudentToClass(studentId, classId, token);
        },
        handleActionRemoveStudentFromClass: async (studentId: number, classId: number) => {
            "use server";
            return removeStudentFromClass(studentId, classId, token);
        },
    }

    const handleActionsTeacher: IHandleActionTeacher = {
        handleActionGetAll: async () => {
            "use server";
            return getAllTeachers(token);
        }
    }

    const handleActionsStudent: IHandleActionStudent = {
        handleActionGetAll: async (showRels?: boolean, excludeStudentsWithinClass?: boolean, onlyStudentWithClassId?: number, onlyStudentWithTeachingAssignmentId?: number) => {
            "use server";
            return getAllStudents(token, showRels, excludeStudentsWithinClass, onlyStudentWithClassId, onlyStudentWithTeachingAssignmentId);
        }
    }

    const handleActionsSubject: IHandleActionSubject = {
        handleActionGetAll: async (classId?: number) => {
            "use server";
            return getAllSubjects(token, {
                excludeByClassId: classId,
                noPagination: true,
            },);
        },
        handleActionCreate: async (data: ISubjectFormData) => {
            "use server";
            return createSubject(data, token);
        },
        handleActionDeleteById: async (subjectId) => {
            "use server";
            return deleteSubjectById(subjectId, token);
        },
        handleActionUpdate: async (subjectId: number, data: IUpdateSubjectFormData) => {
            "use server";
            return updateSubject(subjectId, data, token);
        },
        handleActionGetById: async (subjectId: number) => {
            "use server";
            return getSubjectById(subjectId, token);
        }
    }

    const handleActionGrade: IHandleActionGrades = {
        handleActionCreateGrade: async (teachingAssignmentId: number, gradeDTO: IGradeDataForm) => {
            "use server";
            return createGrade(teachingAssignmentId, token, gradeDTO);
        },
        handleActionGetAllGradeByTeachingIdAndStudentId: async (teachingAssignmentId: number, studentId: number) => {
            "use server";
            return getAllGradeByTeachingIdAndStudentId(teachingAssignmentId, studentId, token);
        },
        handleActionUpdateGrade: async (teachingAssignmentId: number, gradeDTO: IUpdateGradeDataForm) => {
            "use server";
            return partialUpdateGrade(teachingAssignmentId, token, gradeDTO);
        },
        handleActionDeleteGrade: async (gradeId: number) => {
            "use server";
            return deleteGradeById(gradeId, token);
        },
        handleActionGetGradeById: async (gradeId: number) => {
            "use server";
            return getGradeById(gradeId, token);
        }
    }

    const handleActionUser: IHandleActionUsers = {
        handleActionDeleteById: async (userId: number) => {
            "use server";
            return deleteUserById(userId, token);
        },
        handleActionCreateUser: async (userData: UserFormData) => {
            "use server";
            return handleSignUp(userData, token);
        },
        handleActionUpdateUserById: async (userId: number, userData: UpdateUserFormData) => {
            "use server";
            return updateUserById(userId, userData, token);
        },
        handleActionGetUserById: async (userId: number) => {
            "use server";
            return getUserById(userId, token);
        },
    }

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex w-full`}
            >
                <SessionProvider session={session}>
                    <NotificationProvider />
                    <ModalProvider
                        handleActionsAnnouncement={handleActionsAnnouncement}
                        handleActionsClass={handleActionsClass}
                        handleActionsCoordinator={handleActionsCoordinator}
                        handleActionsSubject={handleActionsSubject}
                        handleActionsTeacher={handleActionsTeacher}
                        handleActionsStudent={handleActionsStudent}
                        handleActionUser={handleActionUser}
                        handleActionGrade={handleActionGrade}
                    />
                    <ToasterProvider />
                    <div className={session?.user? '' : `bg-gradient-to-r from-purple-500 to-purple-800`}>
                        {session?.user && <Sidebar />}
                    </div>
                    <main className="flex flex-1 flex-col justify-center items-center w-full md:ml-64">
                        {/* A margem lateral esquerda no desktop (md:ml-64) empurra o conteúdo para dar espaço à sidebar */}
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
