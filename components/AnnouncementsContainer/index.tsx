"use client";
import React, { useState } from 'react';
import Announcement from '../Announcement';
import Pagination from '../Pagination';

interface AnnouncementData {
    id: number;
    title: string;
    postDate: Date;
    author: {
        name: string;
        avatarUrl: string;
    };
    content: string;
}

interface AnnouncementsContainerProps {
    announcements: AnnouncementData[];
    itemsPerPage: number;
}

const AnnouncementsContainer: React.FC<AnnouncementsContainerProps> = ({ announcements, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calcular índices
    const totalAnnouncements = announcements.length;
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Garantir que o array não fique vazio
    // const currentAnnouncements = totalAnnouncements > 0
    //    ? announcements.slice(indexOfFirstItem, indexOfLastItem)
    //    : [];

    // const paginate = (pageNumber: number) => {
    //    if (pageNumber < 1 || pageNumber > Math.ceil(totalAnnouncements / itemsPerPage)) {
    //        return; // Evitar página inválida
    //    }
    //    setCurrentPage(pageNumber);
    // };

    return (
        <div className="space-y-4">
            {announcements.length > 0 ? (
                announcements.map((announcement) => (
                    <Announcement key={announcement.id} {...announcement} />
                ))
            ) : (
                <div className="text-center text-gray-500">Nenhum comunicado encontrado.</div>
            )}
            {/*
            
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalAnnouncements}
                paginate={paginate}
                currentPage={currentPage}
            />
            
            */}
        </div>
    );
};

export default AnnouncementsContainer;
