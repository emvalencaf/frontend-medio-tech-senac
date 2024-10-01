"use client";

import { FaChalkboardTeacher, FaEdit, FaTrash } from "react-icons/fa";
import useClassModal from "../../../../../hooks/useClassModal";

const ActionPanel: React.FC = () => {
    const { onChangePanelStatus } = useClassModal();
    return (
        <div className="flex gap-4 items-center justify-center">
            <button
                type="button"
                className="flex border rounded-md p-2 items-center justify-center gap-1.5 hover:border-purple-600"
                onClick={() => onChangePanelStatus('EDIT')}
            >
                <FaEdit className="text-xl"/>
                <span>
                    Editar
                </span>
            </button>
            <button
                type="button"
                className="flex border rounded-md p-2 items-center justify-center gap-1.5 hover:border-green-400"
                onClick={() => onChangePanelStatus('ASSOCIATE_CLASS')}
            >
                <FaChalkboardTeacher className="text-xl"/>
                <span>
                    Associar Disciplina
                </span>
            </button>
            <button
                type="button"
                className="flex border-2 rounded-md p-2 items-center justify-center gap-1.5 hover:border-red-500"
            >
                <FaTrash className="text-xl" />
                <span>
                    Deletar
                </span>
            </button>
        </div>
    );
}

export default ActionPanel;