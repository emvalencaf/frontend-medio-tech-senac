"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButton from "../../../../../ActionButton";
import toast from "react-hot-toast";
import useClassModal from "../../../../../../hooks/useClassModal";

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
    const { onChangePanelStatus, onChangeTypeClassModal } = useClassModal();

    const handleClick = async () => {

        await handleActionDeleteTeachingAssignmentById(teachingAssignment.id);

        toast.success('A remoção da matéria associada da grade curricular da turma foi bem-sucedida');

        window.location.reload();
    };

    return (
        <li className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100">
            <div className="w-1/4">{teachingAssignment.id}</div>
            <div className="w-1/4">{teachingAssignment.teacher.name}</div>
            <div className="w-1/4">{teachingAssignment.subject.name}</div>
            <div className="flex gap-1.5">
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
            </div>
        </li>
    );
}

export default TeachingAssignment;