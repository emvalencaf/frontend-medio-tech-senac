'use client';

// hooks
import useClassModal from '../../../hooks/useClassModal';

// components
import Modal from '../Modal';
import ClassForm from './components/ClassForm';

// types
import { IHandleActionClass } from '../../../types/class';
import ActionPanel from './components/ActionPanel';

export interface IClassModal {
    handleActions: IHandleActionClass;
}

const ClassModal: React.FC<IClassModal> = ({
    handleActions,
}) => {
    const { isOpen, onClose, typeClassModal, actionPanelStatus } = useClassModal();
    const { handleActionCreate } = handleActions;

    const title = typeClassModal === 'CREATE_CLASS' ? 'Adicione Turma' : (typeClassModal === "ACTION_CLASS" ? "ALTERE/DELETE TURMA" : 'VEJA OS PROFESSORES DA TURMA');

    const subtitle = typeClassModal === 'CREATE_CLASS' ? 'Adicione uma turma' : (typeClassModal === "ACTION_CLASS" ? "Altere ou delete uma turma" : 'Veja os professores responsáveis pelas disciplinas');

    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose} isOpen={isOpen}>
            {/* FORM TO CREATE CLASS */}
            {
                typeClassModal === 'CREATE_CLASS' && (
                    <ClassForm handleActionCreate={handleActionCreate} />
                )
            }
            {/* ACTION PANEL OF CLASS */}

            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'PANEL') && (
                    <ActionPanel />
                )
            }
            {/* FORM TO EDIT CLASS */}
            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'EDIT') && (
                    <ClassForm handleActionCreate={handleActionCreate} />
                )
            }
            {/* TO VIEW CLASS SUBJECTS */}
            {
                typeClassModal === "VIEW_CLASS_SUBJECTS" && (
                    <div>
                        VIEW_CLASS_SUBJECTS
                    </div>
                )
            }
        </Modal>
    );
};

export default ClassModal;
