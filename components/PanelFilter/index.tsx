"use client";

import React, { useState } from 'react';
import { FaSearch, FaTag, FaSortAmountDown, FaSortAmountUp, FaPlus } from 'react-icons/fa';
import SearchForm from './components/SearchForm';
import AnnouncementSearch from './components/SearchForm';
import Filters from '../Filters';
import AddAnnouncementButton from './components/AddAnnouncementButton';

const FilterPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [sortOrder, setSortOrder] = useState('descending');
    const [_filters, setFilters] = useState({
        keywords: [],
        dateSort: null
    });

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
                <Filters onFiltersChange={handleFiltersChange} />
                <AddAnnouncementButton onClick={function (): void {
                    throw new Error('Function not implemented.');
                }} />

            </div>
        </div>
    );
};

export default FilterPanel;
