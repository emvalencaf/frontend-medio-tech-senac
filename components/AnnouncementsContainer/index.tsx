"use client";

import React from 'react';

// custom components
import Announcement, { IAnnouncement } from '../Announcement';

export interface IAnnouncementsContainer {
    announcements: IAnnouncement[];
}

const AnnouncementsContainer: React.FC<IAnnouncementsContainer> = ({ announcements }) => {
    return (
        <div className="w-full mx-auto my-8 p-4 md:p-9 flex flex-col gap-5">
            {announcements.map((announcement) => (
                <Announcement
                    key={`announcement-${announcement.id}`}
                    author={announcement.author}
                    title={announcement.title}
                    content={announcement.content}
                    createdAt={announcement.createdAt} id={announcement.id}
                />
            ))}
        </div>
    );
};

export default AnnouncementsContainer;

