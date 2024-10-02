"use client";

import ClassesContainer from "../../components/ClassesContainer";
import ClassPanel from "../../components/ClassPanel";
import Header from "../../components/Header";
import { SiGoogleclassroom } from "react-icons/si";
import Pagination from "../../components/Pagination";
import { IClassEntity } from "../../actions/classes/types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IClassesTemplate {
    classes: IClassEntity[],
    currentPage: number;
    totalPages: number;
}

const ClassesTemplate: React.FC<IClassesTemplate> = ({ classes, currentPage = 1, totalPages, }) => {
    return (
        <div className="w-full min-h-screen">
            <Header title="Gerenciar Turmas" Icon={SiGoogleclassroom} />
            <ClassPanel />
            <ClassesContainer classes={classes} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>);
}

export default ClassesTemplate;