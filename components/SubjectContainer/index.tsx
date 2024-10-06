"use client";

import React from 'react';

// custom components
import SubjectItem from '../SubjectItem';
import { useSession } from 'next-auth/react';
import { extractUserTypeFromBackEndToken } from '../../utils';
import { ISubjectEntity } from '../../actions/subjects/types';

export interface ISubjectContainer {
    subjects: ISubjectEntity[];
}


const SubjectsContainer: React.FC<ISubjectContainer> = ({ subjects }) => {
    const session = useSession();
    
    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    return (
        <div className="w-full h-full p-4">
            {/* Cabeçalho simulando as colunas da tabela */}
            <div className="flex bg-purple-600 text-white font-semibold py-2 px-4 rounded-t-md">
                <div className="w-1/4">ID</div>
                <div className="w-1/4">Nome</div>
                <div className="w-1/4">Descrição</div>
                {userType === "COORDINATOR" && <div className="w-1/4">Ações</div>}
            </div>

            {/* Lista de itens com aparência de tabela */}
            <ul className="w-full">
                {subjects.map((classItem) => (
                    <SubjectItem key={`subjects-${classItem.id}`} {...classItem} />
                ))}
            </ul>
        </div>
    );
};


export default SubjectsContainer;
