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

    const userType = extractUserTypeFromBackEndToken(data?.backendToken);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [sortOrder, setSortOrder] = useState('descending');
    const [_filters, setFilters] = useState({
        keywords: [],
        dateSort: null
    });

    const { onOpen } = useAnnouncementModal();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTagFilter = () => {
        // Lógica para filtrar por etiqueta
        console.log(`Filtrando por etiqueta: ${selectedTag}`);
    };

    const handleAddAnnouncement = () => {
        // Lógica para adicionar um comunicado
        console.log('Adicionando um comunicado...');
    };

    const handleFiltersChange = (keywords, dateSort) => {
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
