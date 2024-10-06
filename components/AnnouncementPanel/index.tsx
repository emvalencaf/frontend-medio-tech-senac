"use client";

import React, { useState } from 'react';

// components
import AnnouncementSearch from './components/SearchForm';
import AnnouncementFilters from '../AnnouncementFilters';
import AddAnnouncementButton from './components/AddAnnouncementButton';
import useAnnouncementModal from '../../hooks/useAnnouncementModal';
import { useSession } from 'next-auth/react';
import { extractUserTypeFromBackEndToken } from '../../utils';

const AnnouncementPanel = () => {
    const { data } = useSession();

    const userType = extractUserTypeFromBackEndToken(String(data?.backendToken));
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchTerm, setSearchTerm] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedTag, setSelectedTag] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sortOrder, setSortOrder] = useState('descending');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_filters, setFilters] = useState({
        keywords: [],
        dateSort: null
    });

    const { onOpen } = useAnnouncementModal();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTagFilter = () => {
        // Lógica para filtrar por etiqueta
        console.log(`Filtrando por etiqueta: ${selectedTag}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleAddAnnouncement = () => {
        // Lógica para adicionar um comunicado
        console.log('Adicionando um comunicado...');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFiltersChange = (keywords: any, dateSort: any) => {
        setFilters({ keywords, dateSort });
    };

    return (
        <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg items-center justify-center w-full">
            <div className='flex gap-3 items-center justify-center w-full'>
                <AnnouncementSearch />
                <AnnouncementFilters onFiltersChange={handleFiltersChange} />
                {userType !== "STUDENT" &&
                    <AddAnnouncementButton onClick={onOpen} />
                }
            </div>
        </div>
    );
};

export default AnnouncementPanel;
