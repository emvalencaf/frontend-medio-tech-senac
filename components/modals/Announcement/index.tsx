'use client';

// hooks
import useAnnouncementModal from '../../../hooks/useAnnouncementModal';

// components
import Modal from '../Modal';
import AnnouncementForm from './components/AnnouncementForm';

// types
import { IHandleActionAnnouncement } from '../../../types/announcement';
import { useSession } from 'next-auth/react';
import { extractUserTypeFromBackEndToken } from '../../../utils';
export interface IAnnouncementModal {
    handleActions: IHandleActionAnnouncement;
}

const AnnouncementModal: React.FC<IAnnouncementModal> = ({
    handleActions,
}) => {
    const session = useSession();

    const userType = extractUserTypeFromBackEndToken(String(session.data?.backendToken));

    const { isOpen, onClose } = useAnnouncementModal();
    const { handleActionCreate, handleActionGetClassesByTeacher, handleActionGetAllClasses } = handleActions;

    return (
        <Modal title='Criar Comunicado' subtitle='Escreva o comunicado que você quer passar aos seus alunos' onClose={onClose} isOpen={isOpen}>
            <AnnouncementForm handleActionCreate={handleActionCreate} handleActionGetClassOptions={userType === 'TEACHER' ?handleActionGetClassesByTeacher : handleActionGetAllClasses}/>
            {/*
                Quando implementar o sistema de autenticação e autorização vai ter que passar o handleActionGetClassesByTeacher e handleActionGetClasses a depender do tipo do usuário.
            */}
        </Modal>
    );
};

export default AnnouncementModal;
