'use client';

// modals components

// hooks
import { useEffect, useState } from "react";
import AnnouncementModal from "../../components/modals/Announcement";
import { IHandleActionAnnouncement } from "../../types/announcement";

// interfaces
export interface IModalProvider {
    handleActionsAnnouncement: IHandleActionAnnouncement;
}

const ModalProvider: React.FC<IModalProvider> = ({ handleActionsAnnouncement, }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <AnnouncementModal handleActions={handleActionsAnnouncement} />
        </>
    );
};

export default ModalProvider;