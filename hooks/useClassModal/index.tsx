import { create, } from "zustand";

interface IuseClassModalStore {
    isOpen: boolean;
    actionPanelStatus: 'EDIT' | 'PANEL' | 'ASSOCIATE_CLASS';
    classId?: number;
    onChangePanelStatus: (panelStatus: 'EDIT' | 'PANEL' | 'ASSOCIATE_CLASS') => void;
    onOpen: (typeClassModal: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS', classId?: number) => void;
    onClose: () => void;
    typeClassModal?: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS';
}

const useClassModal = create<IuseClassModalStore>((set) => ({
    isOpen: false,
    actionPanelStatus: 'PANEL',
    onChangePanelStatus: (panelStatus) => set({ actionPanelStatus: panelStatus }),
    onOpen: (typeClassModal, classId) => set({ isOpen: true, classId, typeClassModal }),
    onClose: () => set({ isOpen: false, actionPanelStatus: 'PANEL'},),
}));

export default useClassModal;