import { create, } from "zustand";

interface IUseUserModalStore {
    isOpen: boolean;
    userId?: number;
    onOpen: (typeUserModal: 'ACTION_USER' | 'CREATE_USER', userId?: number) => void;
    onClose: () => void;
    typeUserModal?: 'ACTION_USER' | 'CREATE_USER';
    actionPanelStatus: 'EDIT' | 'PANEL';
    onChangePanelStatus: (panelStatus: 'EDIT' | 'PANEL', userId?: number) => void;
    onChangeTypeUserModal: (typeUserModal: 'ACTION_USER' | 'CREATE_USER') => void;
}

const useUserModal = create<IUseUserModalStore>((set) => ({
    isOpen: false,
    actionPanelStatus: 'PANEL',
    onChangePanelStatus: (panelStatus, userId) => set({ actionPanelStatus: panelStatus, userId}),
    onOpen: (typeUserModal, userId) => set({ isOpen: true, userId, typeUserModal }),
    onClose: () => set({ isOpen: false, userId: undefined, actionPanelStatus: 'PANEL' },),
    onChangeTypeUserModal: (typeUserModal) => set({ typeUserModal }),
}));
export default useUserModal;