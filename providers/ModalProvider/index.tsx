'use client';

// modals components

// hooks
import { useEffect, useState } from "react";
import AnnouncementModal from "../../components/modals/Announcement";


const ModalProvider: React.FC = ({ }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <AnnouncementModal />
        </>
    );
};

export default ModalProvider;