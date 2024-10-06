"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButton from "../../../../ActionButton";
import useSubjectModal from "../../../../../hooks/useSubjectModal";

export interface IActionPanel {
    handleActionDeleteById: (classId: number) => Promise<void>;
}

const ActionPanel: React.FC<IActionPanel> = ({ handleActionDeleteById }) => {
    const { onChangePanelStatus, subjectId } = useSubjectModal();

    const handleClick = async () => {
        await handleActionDeleteById(Number(subjectId));
        window.location.reload();
    }

    return (
        <div className="flex gap-4 items-center justify-center">
            <ActionButton
                label="Editar Disciplina"
                Icon={FaEdit}
                handleClick={() =>{onChangePanelStatus('EDIT', subjectId)}}
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