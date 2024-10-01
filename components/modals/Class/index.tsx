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
    const { isOpen, onClose, typeClassModal, classId, actionPanelStatus } = useClassModal();
    const { handleActionCreate, handleActionGetClassesByTeacher } = handleActions;

    const title = typeClassModal === 'CREATE_CLASS' ? 'Adicione Turma' : (typeClassModal === "ACTION_CLASS" ? "ALTERE/DELETE TURMA" : 'VEJA OS PROFESSORES DA TURMA');

    const subtitle = typeClassModal === 'CREATE_CLASS' ? 'Adicione uma turma' : (typeClassModal === "ACTION_CLASS" ? "Altere ou delete uma turma" : 'Veja os professores responsáveis pelas disciplinas');

    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose} isOpen={isOpen}>
            {
                typeClassModal === 'CREATE_CLASS' && (
                    <ClassForm handleActionCreate={handleActionCreate} handleActionGetClassOptions={handleActionGetClassesByTeacher} />
                )
            }
            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'PANEL') && (
                    <ActionPanel />
                )
            }
            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'EDIT') && (
                    <ClassForm handleActionCreate={handleActionCreate} handleActionGetClassOptions={handleActionGetClassesByTeacher} />
                )
            }
            {
                typeClassModal === "VIEW_CLASS_SUBJECTS" && (
                    <div>
                        VIEW_CLASS_SUBJECTS
                    </div>
                )
            }
            {/*
                Quando implementar o sistema de autenticação e autorização vai ter que passar o handleActionGetClassesByTeacher e handleActionGetClasses a depender do tipo do usuário.
            */}
        </Modal>
    );
};

export default ClassModal;
