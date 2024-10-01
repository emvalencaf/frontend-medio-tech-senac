'use client';

// modals components

// hooks
import { useEffect, useState } from "react";
import AnnouncementModal from "../../components/modals/Announcement";
import { IHandleActionAnnouncement } from "../../types/announcement";

import ClassModal from "../../components/modals/Class";
import { IHandleActionClass } from "../../types/class";

// interfaces
export interface IModalProvider {
    handleActionsAnnouncement: IHandleActionAnnouncement;
    handleActionsClass: IHandleActionClass;
}

const ModalProvider: React.FC<IModalProvider> = ({ handleActionsAnnouncement, handleActionsClass }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <AnnouncementModal handleActions={handleActionsAnnouncement} />
            <ClassModal handleActions={handleActionsClass} />
        </>
    );
};

export default ModalProvider;