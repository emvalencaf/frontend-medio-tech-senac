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

// interfaces
export interface IModalProvider {
    handleActionsAnnouncement: IHandleActionAnnouncement;
    handleActionsClass: IHandleActionClass;
    handleActionsCoordinator: IHandleActionCoordinator;
    handleActionsTeacher: IHandleActionTeacher;
    handleActionsSubject: IHandleActionSubject;
}

const ModalProvider: React.FC<IModalProvider> = ({
    handleActionsAnnouncement,
    handleActionsClass,
    handleActionsCoordinator,
    handleActionsSubject,
    handleActionsTeacher
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
            />
        </>
    );
};

export default ModalProvider;