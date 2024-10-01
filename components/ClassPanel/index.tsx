"use client";

import React, {  } from 'react';

// components
import useClassModal from '../../hooks/useClassModal';
import AddClassButton from './components/AddClassButton';
import ClassSearch from './components/SearchForm';
import ClassFilters from '../ClassFilters';

const ClassPanel = () => {
    const { onOpen } = useClassModal();

    return (
        <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg items-center justify-center w-full">
            <div className='flex gap-3 items-center justify-center w-full'>
                <ClassSearch />
                <ClassFilters />
                <AddClassButton onClick={onOpen} />
            </div>
        </div>
    );
};

export default ClassPanel;
