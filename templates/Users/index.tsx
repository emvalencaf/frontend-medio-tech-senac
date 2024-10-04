"use client";

import UsersContainer from "../../components/UsersContainer";
import Header from "../../components/Header";
import { SiGoogleclassroom } from "react-icons/si";
import Pagination from "../../components/Pagination";
import { IUserEntity } from "../../actions/users/types";
import UserPanel from "../../components/UserPanel";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUseresTemplate {
    users: IUserEntity[],
    currentPage: number;
    totalPages: number;
}

const UsersTemplate: React.FC<IUseresTemplate> = ({ users, currentPage = 1, totalPages, }) => {
    return (
        <div className="w-full min-h-screen">
            <Header title="Gerenciar Turmas" Icon={SiGoogleclassroom} />
            <UserPanel />
            <UsersContainer users={users.map((user) => ({id: user.id, name: user.firstName + ' ' + user.lastName, userType: user.userType}))} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>);
}

export default UsersTemplate;