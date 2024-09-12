import { create } from "zustand";

interface StateProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditStudentModal = create<StateProp>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditStudentModal;
