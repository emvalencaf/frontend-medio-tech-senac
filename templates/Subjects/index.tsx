"use client";

import SubjectsContainer from "../../components/SubjectContainer";
import SubjectPanel from "../../components/SubjectPanel";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { ISubjectEntity } from "../../actions/subjects/types";
import { FaBook } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ISubjectsTemplate {
    subjects: ISubjectEntity[],
    currentPage: number;
    totalPages: number;
}

const SubjectTemplate: React.FC<ISubjectsTemplate> = ({ subjects, currentPage = 1, totalPages, }) => {
    return (
        <div className="w-full min-h-screen">
            <Header title="Gerenciar Disciplinas" Icon={FaBook} />
            <SubjectPanel />
            <SubjectsContainer subjects={subjects} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>);
}

export default SubjectTemplate;