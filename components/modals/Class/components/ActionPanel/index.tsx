"use client";

import { FaChalkboardTeacher, FaEdit, FaTrash } from "react-icons/fa";
import { PiStudent } from 'react-icons/pi'
import useClassModal from "../../../../../hooks/useClassModal";
import ActionButton from "../../../../ActionButton";

export interface IActionPanel {
    handleActionDeleteById: (classId: number) => Promise<void>;
}

const ActionPanel: React.FC<IActionPanel> = ({ handleActionDeleteById }) => {
    const { onChangePanelStatus, classId } = useClassModal();

    const handleClick = async () => {
        await handleActionDeleteById(Number(classId));
        window.location.reload();
    }

    return (
        <div className="flex gap-4 items-center justify-center">
            <ActionButton
                label="Editar Turma"
                Icon={FaEdit}
                handleClick={() =>{onChangePanelStatus('EDIT')}}
            />

            <ActionButton
                label="Adicionar Aluno"
                Icon={PiStudent}
                handleClick={() => onChangePanelStatus('ADD_STUDENT')}
            />

            <ActionButton
                label="Associar Disciplina"
                Icon={FaChalkboardTeacher}
                handleClick={() => onChangePanelStatus('ASSOCIATE_CLASS')}
            />
            
            <ActionButton
                label="Deletar"
                Icon={FaTrash}
                handleClick={handleClick}
            />
        </div>
    );
}

export default ActionPanel;