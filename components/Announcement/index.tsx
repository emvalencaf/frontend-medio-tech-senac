import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// next components
import AvatarProfile from '../Header/components/AvatarProfile';

export interface IAnnouncement {
    id: number;
    title: string;
    createdAt: Date;
    author: {
        name: string;
        userType: string;
        avatarUrl: string;
    };
    content: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Announcement: React.FC<IAnnouncement> = ({ id, title, createdAt, author, content }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
            <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <AvatarProfile img_path={author.avatarUrl} name={author.name} userType={author.userType} />
            </div>
            <div className="p-4">
                <p className="text-gray-700">{content}</p>
            </div>
            <div className="p-4 bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
                <span>{author.name}</span>
                <span>{format(createdAt, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}</span>
            </div>
        </div>
    );
};

export default Announcement;