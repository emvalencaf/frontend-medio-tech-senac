import { create, } from "zustand";

interface IuseAnnouncementModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAnnouncementModal = create<IuseAnnouncementModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true, }),
    onClose: () => set({ isOpen: false, },),
}));

export default useAnnouncementModal;