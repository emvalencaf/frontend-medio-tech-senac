"use client";

// components
import Header from "../../components/Header";
import AnnouncementPanel from "../../components/AnnouncementPanel";
import AnnouncementsContainer from "../../components/AnnouncementsContainer";
import Pagination from "../../components/Pagination";

// hooks
import { useState } from "react";

// icons
import { FaBullhorn } from "react-icons/fa";

// dummy data
import { dummyAnnouncements } from "../../constants/announcementsMock";

const AnnouncementTemplate: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 2;

    const totalPages = Math.ceil(dummyAnnouncements.length / announcementsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const currentAnnouncements = dummyAnnouncements.slice(
        (currentPage - 1) * announcementsPerPage,
        currentPage * announcementsPerPage
    );
    return (
        <div className="w-full">
            <Header title="Comunicados" Icon={FaBullhorn} />
            <AnnouncementPanel />
            <AnnouncementsContainer announcements={currentAnnouncements} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default AnnouncementTemplate;