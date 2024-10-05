"use client";

import React, {  } from 'react';

// components
import useClassModal from '../../hooks/useClassModal';
import AddClassButton from './components/AddClassButton';
import ClassSearch from './components/SearchForm';
import ClassFilters from '../ClassFilters';
import { useSession } from 'next-auth/react';
import { extractUserTypeFromBackEndToken } from '../../utils';

const ClassPanel = () => {
    const session = useSession();
    const { onOpen } = useClassModal();

    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    const handleClickButton = (typeClassModal: "VIEW_CLASS_SUBJECTS" | "ACTION_CLASS" | "CREATE_CLASS") => {
        if (typeClassModal !== "CREATE_CLASS")
            return onOpen(typeClassModal);

        onOpen(typeClassModal);
    }

    return (
        <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg items-center justify-center w-full">
            <div className='flex gap-3 items-center justify-center w-full'>
                <ClassSearch />
                <ClassFilters />
                {
                   userType === "COORDINATOR" && (
                        <AddClassButton onClick={() => handleClickButton('CREATE_CLASS')} />
                    )
                }
            </div>
        </div>
    );
};

export default ClassPanel;
