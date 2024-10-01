"use client";

import { BsThreeDots } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";

export interface IClassItem {
    id: number;
    name: string;
    semester: number;
    year: number;
}

const ClassItem: React.FC<IClassItem> = ({ id, name, semester, year }) => {
    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            <div className="w-1/4">{id}</div>
            <div className="w-1/4">{name}</div>
            <div className="w-1/4">{semester}</div>
            <div className="w-1/4">{year}</div>
            <button className="w-1/4">
                <GiTeacher />
            </button>
            <button className="w-1/4">
                <BsThreeDots />
            </button>
        </li>
    );
};



export default ClassItem;