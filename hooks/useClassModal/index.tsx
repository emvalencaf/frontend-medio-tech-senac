import { create, } from "zustand";

interface IUseClassModalStore {
    isOpen: boolean;
    actionPanelStatus: 'EDIT' | 'PANEL' | 'ASSOCIATE_CLASS' | 'ADD_STUDENT' | "REMOVE_STUDENT";
    classId?: number;
    teachingAssignmentId?: number;
    onChangePanelStatus: (panelStatus: 'EDIT' | 'PANEL' | 'ASSOCIATE_CLASS' | 'ADD_STUDENT' | "REMOVE_STUDENT", teachingAssignmentId?: number) => void;
    onOpen: (typeClassModal: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS', classId?: number) => void;
    onClose: () => void;
    typeClassModal?: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS';
    onChangeTypeClassModal: (typeClassModal: 'VIEW_CLASS_SUBJECTS' | 'ACTION_CLASS' | 'CREATE_CLASS') => void;

}

const useClassModal = create<IUseClassModalStore>((set) => ({
    isOpen: false,
    actionPanelStatus: 'PANEL',
    onChangePanelStatus: (panelStatus, teachingAssignmentId) => set({ actionPanelStatus: panelStatus, teachingAssignmentId: teachingAssignmentId}),
    onOpen: (typeClassModal, classId) => set({ isOpen: true, classId, typeClassModal }),
    onClose: () => set({ isOpen: false, actionPanelStatus: 'PANEL', classId: undefined, teachingAssignmentId: undefined },),
    onChangeTypeClassModal: (typeClassModal) => set({ typeClassModal }),
}));

export default useClassModal;