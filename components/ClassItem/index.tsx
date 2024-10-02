"use client";

import { BsThreeDots } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import useClassModal from "../../hooks/useClassModal";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export interface IClassItem {
    id: number;
    name: string;
    semester: number;
    year: number;
    createdAt: Date;
    updatedAt?: Date;
}

const ClassItem: React.FC<IClassItem> = ({ id, name, semester, year, createdAt, updatedAt }) => {
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
            <div className="w-1/4">{semester}</div>
            <div className="w-1/4">{year}</div>
            <div className="w-1/4">{format(createdAt, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}</div>
            <div className="w-1/4">{updatedAt instanceof Date ? format(updatedAt, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR }): 'Não foi atualizada'}</div>
            <button className="w-1/4" onClick={() => handleClickButton('VIEW_CLASS_SUBJECTS')}>
                <GiTeacher />
            </button>
            {
                
            }
            <button className="w-1/4" onClick={() => {
                handleClickButton('ACTION_CLASS')

            }}>
                <BsThreeDots />
            </button>
        </li>
    );
};



export default ClassItem;