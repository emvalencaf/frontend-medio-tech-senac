'use client';

import { ISubjectEntity } from '../../../actions/subjects/types';
// hooks
import useSubjectModal from '../../../hooks/useSubjectModal';

// components
import Modal from '../Modal';

import ActionPanel from './components/ActionPanel';
import { IUpdateSubjectFormData } from '../../../actions/subjects/schemas';
import { ISubjectFormData } from '../../../actions/subjects/schemas';
import SubjectForm from './components/SubjectForm';
import UpdateSubjectForm from './components/UpdateSubjectForm';

// types


export interface ISubjectModal {
    handleActionDeleteSubjectById: (subjectId: number) => Promise<void>;
    handleActionCreateSubject: (subjectData: ISubjectFormData) => Promise<ISubjectEntity | null>;
    handleActionUpdateSubjectById: (subjectId: number, subjectData: IUpdateSubjectFormData) => Promise<ISubjectEntity | null>;
    handleActionGetSubjectById: (subjectId: number) => Promise<ISubjectEntity | null>;
}

const SubjectModal: React.FC<ISubjectModal> = ({
    handleActionDeleteSubjectById,
    handleActionCreateSubject,
    handleActionUpdateSubjectById,
    handleActionGetSubjectById,
}) => {
    const { isOpen, onClose, typeSubjectModal, actionPanelStatus } = useSubjectModal();

    const title = typeSubjectModal === 'CREATE_SUBJECT' ? 'Adicione Disciplina' : 'Alterar/Deletar Disciplina';

    const subtitle = typeSubjectModal === 'CREATE_SUBJECT' ? 'Adicione uma disciplina' : 'Altere os dados ou delete de uma disciplina';

    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose} isOpen={isOpen}>
            {/* FORM TO CREATE CLASS */}
            {
                typeSubjectModal === 'CREATE_SUBJECT' && (
                    <SubjectForm handleActionCreateSubject={handleActionCreateSubject} />
                )
            }
            {
                (typeSubjectModal === 'ACTION_SUBJECT' && actionPanelStatus === 'EDIT') && (
                    <UpdateSubjectForm
                        handleActionUpdateSubject={handleActionUpdateSubjectById}
                        handleActionGetSubjectById={handleActionGetSubjectById}
                    />
                )
            }
            {
                (typeSubjectModal === 'ACTION_SUBJECT' && actionPanelStatus === 'PANEL') && (
                    <ActionPanel
                        handleActionDeleteById={handleActionDeleteSubjectById}
                    />
                )
            }
        </Modal>
    );
};

export default SubjectModal;
