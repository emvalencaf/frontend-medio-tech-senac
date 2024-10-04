"use client";

import React from 'react';

// components
import UserSearch from './components/SearchForm';
import UserFilters from '../UserFilters';
import AddUserButton from './components/AddUserButton';
import useUserModal from '../../hooks/useUserModal';

const UserPanel = () => {
    const { onOpen } = useUserModal();

    const handleClickButton = (typeUserModal: "ACTION_USER" | "CREATE_USER") => {
        if (typeUserModal !== "CREATE_USER")
            return onOpen(typeUserModal);

        onOpen(typeUserModal);
    }

    return (
        <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg items-center justify-center w-full">
            <div className='flex gap-3 items-center justify-center w-full'>
                <UserSearch />
                <UserFilters />
                <AddUserButton onClick={() => handleClickButton('CREATE_USER')} />
            </div>
        </div>
    );
};

export default UserPanel;
