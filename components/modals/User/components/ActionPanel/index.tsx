"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButton from "../../../../ActionButton";
import useUserModal from "../../../../../hooks/useUserModal";

export interface IActionPanel {
    handleActionDeleteById: (classId: number) => Promise<void>;
}

const ActionPanel: React.FC<IActionPanel> = ({ handleActionDeleteById }) => {
    const { onChangePanelStatus, userId } = useUserModal();

    const handleClick = async () => {
        await handleActionDeleteById(Number(userId));
        window.location.reload();
    }

    return (
        <div className="flex gap-4 items-center justify-center">
            <ActionButton
                label="Editar Usuário"
                Icon={FaEdit}
                handleClick={() =>{onChangePanelStatus('EDIT', userId)}}
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