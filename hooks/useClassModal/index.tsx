import { create, } from "zustand";

interface IuseClassModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useClassModal = create<IuseClassModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true, }),
    onClose: () => set({ isOpen: false, },),
}));

export default useClassModal;