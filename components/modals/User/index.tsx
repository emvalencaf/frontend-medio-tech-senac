'use client';

import { IUserEntity } from '../../../actions/users/types';
// hooks
import useUserModal from '../../../hooks/useUserModal';

// components
import Modal from '../Modal';
import UserForm from './components/UserForm';
import ActionPanel from './components/ActionPanel';
import { UpdateUserFormData } from '../../../actions/users/schemas';
import { UserFormData } from '../../../actions/auth/schemas';
import UpdateUserForm from './components/UpdateUserForm';

// types


export interface IUserModal {
    handleActionDeleteUserById: (userId: number) => Promise<void>;
    handleActionCreateUser: (userData: UserFormData) => Promise<IUserEntity | null>;
    handleActionUpdateUserById: (userId: number, userData: UpdateUserFormData) => Promise<IUserEntity | null>;
    handleActionGetUserById: (userId: number) => Promise<IUserEntity | null>;
}

const UserModal: React.FC<IUserModal> = ({
    handleActionDeleteUserById,
    handleActionCreateUser,
    handleActionUpdateUserById,
    handleActionGetUserById,
}) => {
    const { isOpen, onClose, typeUserModal, actionPanelStatus } = useUserModal();

    const title = typeUserModal === 'CREATE_USER' ? 'Adicione Usuário' : 'Alterar/Deletar Usuário';

    const subtitle = typeUserModal === 'CREATE_USER' ? 'Adicione uma turma' : 'Altere os dados ou delete o usuário';

    return (
        <Modal title={title} subtitle={subtitle} onClose={onClose} isOpen={isOpen}>
            {/* FORM TO CREATE CLASS */}
            {
                typeUserModal === 'CREATE_USER' && (
                    <UserForm handleActionCreateUser={handleActionCreateUser} />
                )
            }
            {
                (typeUserModal === 'ACTION_USER' && actionPanelStatus === 'EDIT') && (
                    <UpdateUserForm handleActionUpdateUser={handleActionUpdateUserById} handleActionGetUserById={handleActionGetUserById} />
                )
            }
            {
                (typeUserModal === 'ACTION_USER' && actionPanelStatus === 'PANEL') && (
                    <ActionPanel
                        handleActionDeleteById={handleActionDeleteUserById}
                    />
                )
            }
        </Modal>
    );
};

export default UserModal;
