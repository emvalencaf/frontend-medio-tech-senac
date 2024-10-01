"use client";

import ClassesContainer from "../../components/ClassesContainer";
import ClassPanel from "../../components/ClassPanel";
import Header from "../../components/Header";
import { SiGoogleclassroom } from "react-icons/si";
import { classesMock } from "../../constants/classesMock";
import Pagination from "../../components/Pagination";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IClassesTemplate {
}

const ClassesTemplate: React.FC<IClassesTemplate> = ({ }) => {
    return (
        <div className="w-full min-h-screen">
            <Header title="Gerenciar Turmas" Icon={SiGoogleclassroom} />
            <ClassPanel />
            <ClassesContainer classes={classesMock} />
            <Pagination currentPage={1} totalPages={5} />
        </div>);
}

export default ClassesTemplate;