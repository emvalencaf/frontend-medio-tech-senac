"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButton from "../../../../../ActionButton";
import toast from "react-hot-toast";
import useClassModal from "../../../../../../hooks/useClassModal";
import { useSession } from "next-auth/react";
import { extractUserTypeFromBackEndToken } from "../../../../../../utils";
import { MdGrade } from "react-icons/md";

export interface ITeachingAssignment {
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

export interface ITeachingAssignmentComponent {
    teachingAssignment: ITeachingAssignment;
    handleActionDeleteTeachingAssignmentById: (teachingAssignmentId: number) => Promise<void>;
}

const TeachingAssignment: React.FC<ITeachingAssignmentComponent> = ({ teachingAssignment, handleActionDeleteTeachingAssignmentById }) => {
    const session = useSession();

    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    const { onChangePanelStatus, onChangeTypeClassModal } = useClassModal();

    const handleClick = async () => {

        await handleActionDeleteTeachingAssignmentById(teachingAssignment.id);

        toast.success('A remoção da matéria associada da grade curricular da turma foi bem-sucedida');

        window.location.reload();
    };

    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            {
                userType === 'COORDINATOR' && (
                    <div className="w-1/4">{teachingAssignment.id}</div>
                )
            }
            <div className="w-1/4">{teachingAssignment.subject.name}</div>
            {
                userType !== 'TEACHER' && (
                    <div className="w-1/4">{teachingAssignment.teacher.name}</div>
                )
            }
            <div className="flex gap-1.5">
                {
                    userType === "TEACHER" && (
                        <>
                            <ActionButton
                                label="Lançar Nota"
                                Icon={MdGrade}
                                handleClick={() => {
                                    onChangePanelStatus('CREATE_GRADE', teachingAssignment.id);
                                }}
                            />
                            <ActionButton
                                label="Editar Nota"
                                Icon={FaEdit}
                                handleClick={() => {
                                    onChangePanelStatus("EDIT_GRADE", teachingAssignment.id);
                                }}
                            />
                            <ActionButton
                                label="Deletar Nota"
                                Icon={FaTrash}
                                handleClick={() => {
                        
                                }}
                            />
                        </>
                    )
                }
                {
                    userType === 'COORDINATOR' && (
                        <>
                            <ActionButton
                                label="Editar"
                                Icon={FaEdit}
                                handleClick={() => {
                                    onChangePanelStatus('ASSOCIATE_CLASS', teachingAssignment.id);
                                    onChangeTypeClassModal('ACTION_CLASS');
                                }}
                            />
                            <ActionButton
                                label="Deletar"
                                Icon={FaTrash}
                                handleClick={handleClick}
                            />
                        </>
                    )
                }
                {
                    userType === 'STUDENT' && (
                        <ActionButton
                            label="Ver Nota"
                            Icon={MdGrade}
                            handleClick={() => {
                                onChangePanelStatus('SEE_GRADE', teachingAssignment.id)
                            }}
                        />
                    )
                }
            </div>
        </li>
    );
}

export default TeachingAssignment;