import { create, } from "zustand";

interface IuseAnnouncementModalStore {
    isOpen: boolean;
    onOpen: (userId?: number, userType?: string) => void;
    onClose: () => void;
    userId?: number;
    userType?: string;
}

const useAnnouncementModal = create<IuseAnnouncementModalStore>((set) => ({
    isOpen: false,
    onOpen: (userId, userType) => set({ isOpen: true, userId, userType }),
    onClose: () => set({ isOpen: false, },),
}));

export default useAnnouncementModal;