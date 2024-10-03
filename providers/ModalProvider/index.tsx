'use client';

// modals components

// hooks
import { useEffect, useState } from "react";
import AnnouncementModal from "../../components/modals/Announcement";
import { IHandleActionAnnouncement } from "../../types/announcement";

import ClassModal from "../../components/modals/Class";
import { IHandleActionClass } from "../../types/class";
import { IHandleActionCoordinator } from "../../types/coordinator";
import { IHandleActionTeacher } from "../../types/teachers";
import { IHandleActionSubject } from "../../types/subject";
import { IHandleActionStudent } from "../../types/students";

// interfaces
export interface IModalProvider {
    handleActionsAnnouncement: IHandleActionAnnouncement;
    handleActionsClass: IHandleActionClass;
    handleActionsCoordinator: IHandleActionCoordinator;
    handleActionsTeacher: IHandleActionTeacher;
    handleActionsSubject: IHandleActionSubject;
    handleActionsStudent: IHandleActionStudent;
}

const ModalProvider: React.FC<IModalProvider> = ({
    handleActionsAnnouncement,
    handleActionsClass,
    handleActionsCoordinator,
    handleActionsSubject,
    handleActionsTeacher,
    handleActionsStudent,
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <AnnouncementModal handleActions={handleActionsAnnouncement} />
            <ClassModal
                handleActions={handleActionsClass}
                handleActionDeleteTeachingAssignmentById={handleActionsCoordinator.handleActionDeleteTeachingAssignmentById}
                handleActionGetAllTeachers={handleActionsTeacher.handleActionGetAll}
                handleActionsGetAllSubjects={handleActionsSubject.handleActionGetAll}
                handleActionPartialUpdateTeachingAssignment={handleActionsCoordinator.handleActionPartialUpdateTeachingAssignment}
                handleActionCreateTeachingAssignment={handleActionsCoordinator.handleActionCreateTeachingAssignment}
                handleActionGetTeachingAssignmentById={handleActionsCoordinator.handleActionGetTeachingAssignmentById}
                handleActionGetAllStudents={handleActionsStudent.handleActionGetAll}
                handleActionAddStudentToClass={handleActionsCoordinator.handleActionAddStudentToClass}
            />
        </>
    );
};

export default ModalProvider;