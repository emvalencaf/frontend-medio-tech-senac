"use client";

import React from 'react';

// components
import SubjectSearch from './components/SearchForm';
import SubjectFilters from '../SubjectFilters';
import useSubjectModal from '../../hooks/useSubjectModal';
import AddSubjectButton from './components/AddSubjectButton';

const SubjectPanel = () => {
    const { onOpen } = useSubjectModal();

    const handleClickButton = (typeSubjectModal: "ACTION_SUBJECT" | "CREATE_SUBJECT") => {
        if (typeSubjectModal !== "CREATE_SUBJECT")
            return onOpen(typeSubjectModal);

        onOpen(typeSubjectModal);
    }

    return (
        <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg items-center justify-center w-full">
            <div className='flex gap-3 items-center justify-center w-full'>
                <SubjectSearch />
                <SubjectFilters />
                <AddSubjectButton onClick={() => handleClickButton('CREATE_SUBJECT')} />
            </div>
        </div>
    );
};

export default SubjectPanel;
