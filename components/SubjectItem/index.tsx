"use client";

import { BsThreeDots } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { extractUserTypeFromBackEndToken } from "../../utils";
import useSubjectModal from "../../hooks/useSubjectModal";

export interface ISubjectItem {
    id: number;
    name: string;
    description: string;
}

const SubjectItem: React.FC<ISubjectItem> = ({ id, name, description }) => {
    const session = useSession();

    const backendToken = session.data?.backendToken;

    const userType = extractUserTypeFromBackEndToken(String(backendToken));

    const { onOpen } = useSubjectModal();

    const handleClickButton = (typeSubjectModal: "ACTION_SUBJECT" | "CREATE_SUBJECT") => {
        if (typeSubjectModal !== "CREATE_SUBJECT")
            return onOpen(typeSubjectModal, id);
            
        onOpen(typeSubjectModal);
    }

    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            <div className="w-1/4">{id}</div>
            <div className="w-1/4">{name}</div>
            <div className="w-1/4">{description}</div>
            {
                userType === "COORDINATOR" &&
                <button className="w-1/4" onClick={() => {
                    handleClickButton('ACTION_SUBJECT')

                }}>
                    <BsThreeDots />
                </button>
            }
        </li>
    );
};



export default SubjectItem;