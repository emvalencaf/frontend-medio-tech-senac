"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButton from "../../../../../ActionButton";
import toast from "react-hot-toast";
import useClassModal from "../../../../../../hooks/useClassModal";
import { useSession } from "next-auth/react";
import { extractUserTypeFromBackEndToken } from "../../../../../../utils";
import { MdGrade } from "react-icons/md";
import { IGradeEntity } from "../../../../../../actions/grades/types";

export interface IGradeItem {
    id: number;
    subject: {
        id: number;
        name: string;
    };
    teacher: {
        id: number;
        name: string;
    }
}

export interface IGradeItemComponent {
    grade: IGradeEntity;
    handleActionDeleteGrade: (gradeId: number) => Promise<void>;
}

const GradeItem: React.FC<IGradeItemComponent> = ({ grade, handleActionDeleteGrade }) => {
    const session = useSession();

    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    const { onChangePanelStatus, actionPanelStatus } = useClassModal();

    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            {
                userType === 'TEACHER' && (
                    <div className="w-1/4">{grade.id}</div>
                )
            }
            <div className="w-1/4">{grade.avaliation}</div>
            <div className="w-1/4">{grade.grade}</div>
            <div className="flex gap-1.5">
                {
                    (userType === 'STUDENT' && actionPanelStatus !== 'SEE_GRADE') && (
                        <ActionButton
                            label="Ver Nota"
                            Icon={MdGrade}
                            handleClick={() => {
                                onChangePanelStatus('SEE_GRADE', grade.id)
                            }}
                        />
                    )
                }
            </div>
        </li>
    );
}

export default GradeItem;