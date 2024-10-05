"use client";

import { BsThreeDots } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import useClassModal from "../../hooks/useClassModal";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useSession } from "next-auth/react";
import { extractUserTypeFromBackEndToken } from "../../utils";

export interface IClassItem {
    id: number;
    name: string;
    semester: number;
    year: number;
    createdAt: Date;
    updatedAt?: Date;
}

const ClassItem: React.FC<IClassItem> = ({ id, name, semester, year, createdAt, updatedAt }) => {
    const session = useSession();

    const backendToken = session.data?.backendToken;

    const userType = extractUserTypeFromBackEndToken(String(backendToken));

    const { onOpen } = useClassModal();

    const handleClickButton = (typeClassModal: "VIEW_CLASS_SUBJECTS" | "ACTION_CLASS" | "CREATE_CLASS") => {
        if (typeClassModal !== "CREATE_CLASS")
            return onOpen(typeClassModal, id);

        onOpen(typeClassModal);
    }

    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            <div className="w-1/4">{id}</div>
            <div className="w-1/4">{name}</div>
            <div className="w-1/4">{year}</div>
            <div className="w-1/4">{semester}</div>
            <button className="w-1/4" onClick={() => handleClickButton('VIEW_CLASS_SUBJECTS')}>
                <GiTeacher />
            </button>
            {
                userType === "COORDINATOR" &&
                <button className="w-1/4" onClick={() => {
                    handleClickButton('ACTION_CLASS')

                }}>
                    <BsThreeDots />
                </button>
            }
        </li>
    );
};



export default ClassItem;