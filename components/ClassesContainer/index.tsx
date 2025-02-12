"use client";

import React from 'react';

// custom components
import ClassItem from '../ClassItem';
import { useSession } from 'next-auth/react';
import { extractUserTypeFromBackEndToken } from '../../utils';
import { IClassEntity } from '../../actions/classes/types';

export interface IClassContainer {
    classes: IClassEntity[];
}


const ClassesContainer: React.FC<IClassContainer> = ({ classes }) => {
    const session = useSession();

    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    return (
        <div className="w-full h-full p-4">
            {/* Cabeçalho simulando as colunas da tabela */}
            <div className="flex bg-purple-600 text-white font-semibold py-2 px-4 rounded-t-md">
                <div className="w-1/4">ID</div>
                <div className="w-1/4">Nome</div>
                <div className="w-1/4">Ano</div>
                <div className="w-1/4">Semestre</div>
                {(userType === "TEACHER" || userType === "STUDENT") && (
                    <div className="w-1/4">Horário</div>
                )}
                {userType === "COORDINATOR" && <div className="w-1/4">Ações</div>}
            </div>

            {/* Lista de itens com aparência de tabela */}
            <ul className="w-full">
                {classes.map((classItem) => (
                    <ClassItem key={`classes-${classItem.id}`} {...classItem} />
                ))}
            </ul>
        </div>
    );
};


export default ClassesContainer;
