import { create, } from "zustand";

interface IUseSubjectModalStore {
    isOpen: boolean;
    subjectId?: number;
    onOpen: (typeSubjectModal: 'ACTION_SUBJECT' | 'CREATE_SUBJECT', subjectId?: number) => void;
    onClose: () => void;
    typeSubjectModal?: 'ACTION_SUBJECT' | 'CREATE_SUBJECT';
    actionPanelStatus: 'EDIT' | 'PANEL';
    onChangePanelStatus: (panelStatus: 'EDIT' | 'PANEL', subjectId?: number) => void;
    onChangeTypeSubjectModal: (typeSubjectModal: 'ACTION_SUBJECT' | 'CREATE_SUBJECT') => void;
}

const useSubjectModal = create<IUseSubjectModalStore>((set) => ({
    isOpen: false,
    actionPanelStatus: 'PANEL',
    onChangePanelStatus: (panelStatus, subjectId) => set({ actionPanelStatus: panelStatus, subjectId}),
    onOpen: (typeSubjectModal, subjectId) => set({ isOpen: true, subjectId, typeSubjectModal }),
    onClose: () => set({ isOpen: false, subjectId: undefined, actionPanelStatus: 'PANEL' },),
    onChangeTypeSubjectModal: (typeSubjectModal) => set({ typeSubjectModal }),
}));

export default useSubjectModal;