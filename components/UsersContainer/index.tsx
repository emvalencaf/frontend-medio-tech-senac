"use client";

import React from 'react';
import UserItem, { IUserItem } from '../UserItem';

// custom components


export interface IUsersContainer {
    users: IUserItem[];
}


const UsersContainer: React.FC<IUsersContainer> = ({ users }) => {
    return (
        <div className="w-full h-full p-4">
            {/* Cabeçalho simulando as colunas da tabela */}
            <div className="flex bg-purple-600 text-white font-semibold py-2 px-4 rounded-t-md">
                <div className="w-1/4">ID</div>
                <div className="w-1/4">Nome</div>
                <div className="w-1/4">Tipo de Usuário</div>
                <div className="w-1/4">Ações</div>
            </div>

            {/* Lista de itens com aparência de tabela */}
            <ul className="w-full">
                {users.map((user) => (
                    <UserItem key={`classes-${user.id}`} {...user} />
                ))}
            </ul>
        </div>
    );
};


export default UsersContainer;
