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
import { IAnnouncement } from "../../components/Announcement";
import { IAnnouncementEntity } from "../../actions/announcements/types";

export interface IAnnouncementTemplate {
    announcements: IAnnouncementEntity[];
    currentPage: number;
    totalPages: number;
}


const AnnouncementTemplate: React.FC<IAnnouncementTemplate> = ({ announcements, currentPage = 1, totalPages, }) => {

    const announcementsTreated: IAnnouncement[] = announcements.map((announcement) => {

        // only teacher and coordinator can do announcements
        const userType = announcement.author.userType === 'COORDINATOR' ? "Coordenador" : "Professor";
        
        const announcementC: IAnnouncement = {
            author: {
                name: announcement.author.firstName + ' ' + announcement.author.lastName,
                userType,
                avatarUrl: '/assets/avatar.png', // change that once implement avatar url at database level
            },
            title: announcement.title,
            content: announcement.content,
            createdAt: new Date(announcement.createdAt),
            id: announcement.id,
        }

        return announcementC;
    });

    return (
        <div className="w-full">
            <Header title="Comunicados" Icon={FaBullhorn} />
            <AnnouncementPanel />
            <AnnouncementsContainer announcements={announcementsTreated} />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}

export default AnnouncementTemplate;