"use client";

import { BsThreeDots } from "react-icons/bs";
import { userTypes } from "../../constants/userType";
import useUserModal from "../../hooks/useUserModal";

export interface IUserItem {
    id: number;
    name: string;
    userType: 'COORDINATOR' | 'TEACHER' | 'STUDENT';
}

const UserItem: React.FC<IUserItem> = ({ id, name, userType }) => {
    const { onOpen } = useUserModal();

    const handleClickButton = (typeUserModal: "ACTION_USER" | "CREATE_USER") => {
        if (typeUserModal !== "CREATE_USER")
            return onOpen(typeUserModal, id);
            
        onOpen(typeUserModal);
    }

    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            <div className="w-1/4">{id}</div>
            <div className="w-1/4">{name}</div>
            <div className="w-1/4">{userTypes[userType]}</div>
            <button className="w-1/4" onClick={() => {
                handleClickButton('ACTION_USER')
            }}>
                <BsThreeDots />
            </button>
        </li>
    );
};



export default UserItem;