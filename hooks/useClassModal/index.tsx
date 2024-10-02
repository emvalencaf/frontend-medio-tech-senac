import { create, } from "zustand";

interface IUseClassModalStore {
    isOpen: boolean;
    actionPanelStatus: 'EDIT' | 'PANEL' | 'ASSOCIATE_CLASS' | 'ADD_STUDENT';
    classId?: number;
    onChangePanelStatus: (panelStatus: 'EDIT' | 'PANEL' | 'ASSOCIATE_CLASS' | 'ADD_STUDENT') => void;
    onOpen: (typeClassModal: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS', classId?: number) => void;
    onClose: () => void;
    typeClassModal?: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS';
}

const useClassModal = create<IUseClassModalStore>((set) => ({
    isOpen: false,
    actionPanelStatus: 'PANEL',
    onChangePanelStatus: (panelStatus) => set({ actionPanelStatus: panelStatus }),
    onOpen: (typeClassModal, classId) => set({ isOpen: true, classId, typeClassModal }),
    onClose: () => set({ isOpen: false, actionPanelStatus: 'PANEL'},),
}));

export default useClassModal;