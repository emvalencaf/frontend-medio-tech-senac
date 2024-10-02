'use client';

// hooks
import useClassModal from '../../../hooks/useClassModal';

// components
import Modal from '../Modal';
import ClassForm from './components/ClassForm';

// types
import { IHandleActionClass } from '../../../types/class';
import ActionPanel from './components/ActionPanel';
import { useEffect, useState } from 'react';
import { ClassFormData } from '../../../actions/classes/schemas';

export interface IClassModal {
    handleActions: IHandleActionClass;
}

const ClassModal: React.FC<IClassModal> = ({
    handleActions,
}) => {
    const { isOpen, onClose, typeClassModal, actionPanelStatus, classId } = useClassModal();
    const { handleActionCreate, handleActionPartialUpdate, handleActionGetById, handleActionDeleteById } = handleActions;
    const [classValues, setClassValues] = useState<ClassFormData>();

    const title = typeClassModal === 'CREATE_CLASS' ? 'Adicione Turma' : (typeClassModal === "ACTION_CLASS" ? "ALTERE/DELETE TURMA" : 'VEJA OS PROFESSORES DA TURMA');

    const subtitle = typeClassModal === 'CREATE_CLASS' ? 'Adicione uma turma' : (typeClassModal === "ACTION_CLASS" ? "Altere ou delete uma turma" : 'Veja os professores responsáveis pelas disciplinas');

    useEffect(() => {
        if (actionPanelStatus === 'EDIT') {
            const fn = async () => {
                const res = await handleActionGetById(Number(classId));
                if (!res)
                    return;

                console.log(classId);

                setClassValues({
                    name: res.name,
                    year: res.year,
                    semester: res.semester,
                });
            }

            fn();
        }
    }, [actionPanelStatus, isOpen, classId, handleActionGetById]);

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
                    <ActionPanel handleActionDeleteById={handleActionDeleteById} />
                )
            }
            {/* FORM TO EDIT CLASS */}
            {
                (typeClassModal === 'ACTION_CLASS' && actionPanelStatus === 'EDIT') && (
                    <ClassForm handleActionPartialUpdate={handleActionPartialUpdate} isCreate={false} classId={classId} initialValues={classValues} />
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
