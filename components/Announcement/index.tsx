import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface IAnnouncement {
    id: number;
    title: string;
    postDate: Date;
    author: {
        name: string;
        avatarUrl: string;
    };
    content: string;
}

const Announcement: React.FC<IAnnouncement> = ({ id, title, postDate, author, content }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <img
                        src={author.avatarUrl}
                        alt={`Avatar de ${author.name}`}
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-700">{content}</p>
            </div>
            <div className="p-4 bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
                <span>{author.name}</span>
                <span>{format(postDate, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}</span>
            </div>
        </div>
    );
};

export default Announcement;